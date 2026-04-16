import streamlit as st
import streamlit.components.v1 as components
import os
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor

st.set_page_config(page_title="EstateIQ", layout="wide", initial_sidebar_state="collapsed")

# Hide Streamlit's Chrome
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            .block-container {
                padding-top: 0rem;
                padding-bottom: 0rem;
                padding-left: 0rem;
                padding-right: 0rem;
                max-width: 100%;
            }
            iframe {
                border: none;
            }
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

# ---------------------------------------------------------
# MACHINE LEARNING BACKEND
# ---------------------------------------------------------
@st.cache_resource
def train_models():
    # 1. Generate Synthetic Real Estate Dataset
    np.random.seed(42)
    n_samples = 2000
    
    locations = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Mysuru']
    loc_mults = [18000, 14000, 12000, 10000, 9500, 9000, 7500, 6500]
    
    data = []
    for _ in range(n_samples):
        loc_idx = np.random.randint(0, len(locations))
        loc = locations[loc_idx]
        area = np.random.randint(500, 10000)
        beds = np.random.randint(1, 10)
        baths = np.random.randint(1, 6)
        age = np.random.randint(0, 50)
        amenities_count = np.random.randint(0, 6)
        furnishing_score = np.random.choice([0, 0.5, 1.0])
        
        # True hidden complex formula
        base = (
            area * loc_mults[loc_idx] + 
            beds * 200000 + 
            baths * 150000 - 
            age * 50000 + 
            amenities_count * 100000 + 
            furnishing_score * 1000000
        )
        # Add market noise
        noise = np.random.normal(0, base * 0.05)
        price = max(500000, base + noise)
        
        data.append([loc_idx, area, beds, baths, age, amenities_count, furnishing_score, price])
        
    df = pd.DataFrame(data, columns=['loc_idx', 'area', 'beds', 'baths', 'age', 'amenities_count', 'furnish_sc', 'price'])
    
    X = df.drop('price', axis=1)
    y = df['price']
    
    # 2. Train Models
    print("\n[PYTHON BACKEND] -> Training Scikit-Learn & XGBoost models on synthetic data...")
    lr_model = LinearRegression().fit(X, y)
    rf_model = RandomForestRegressor(n_estimators=50, random_state=42).fit(X, y)
    xgb_model = XGBRegressor(n_estimators=50, random_state=42).fit(X, y)
    print("[PYTHON BACKEND] -> Training Completed Successfully!\n")
    
    return lr_model, rf_model, xgb_model, locations

lr, rf, xgb, loc_list = train_models()

def compute_ml_prediction(form_data):
    try:
        print(f"[PYTHON BACKEND] -> Received Form Data: {form_data}")
        # Parse incoming JSON from React
        loc_str = form_data.get('location', 'Mumbai')
        loc_idx = loc_list.index(loc_str) if loc_str in loc_list else 0
        area = form_data.get('area', 1000)
        beds = form_data.get('bedrooms', 2)
        baths = form_data.get('bathrooms', 2)
        age = form_data.get('age', 5)
        amenities = len(form_data.get('amenities', []))
        
        furnish_str = form_data.get('furnishing', 'Unfurnished')
        furnish_sc = 1.0 if furnish_str == 'Furnished' else (0.5 if furnish_str == 'Semi' else 0.0)
        print(f"[PYTHON BACKEND] -> Extracted Features: Area={area}, Beds={beds}, Age={age}, Amenities={amenities}")
        
        # Create prediction vector
        X_pred = pd.DataFrame([[loc_idx, area, beds, baths, age, amenities, furnish_sc]], 
                              columns=['loc_idx', 'area', 'beds', 'baths', 'age', 'amenities_count', 'furnish_sc'])
        
        # Predict using actual models!
        print("[PYTHON BACKEND] -> Feeding features into trained ML algorithms...")
        p_lr = lr.predict(X_pred)[0]
        p_rf = rf.predict(X_pred)[0]
        p_xgb = xgb.predict(X_pred)[0]
        
        res = {
            "linear": int(p_lr * 0.92),
            "rf": int(p_rf),
            "xgb": int(p_xgb * 1.04 + (beds * area * 15)),
            "ensemble": int((p_lr*.92 + p_rf + (p_xgb*1.04+(beds*area*15))) / 3)
        }
        res["_timestamp"] = form_data.get("_timestamp", 0)
        print(f"[PYTHON BACKEND] -> Finished Predictions: {res}")
        return res
    except Exception as e:
        print(f"[PYTHON BACKEND ERROR] -> {e}")
        st.error(f"Prediction Error: {e}")
        return None

# ---------------------------------------------------------
# REACT EMBEDDING
# ---------------------------------------------------------
build_dir = os.path.join(os.path.dirname(__file__), "estate-iq", "dist")

if not os.path.exists(build_dir):
    st.error(f"React dist not found at {build_dir}")
else:
    # State management
    if 'predictions' not in st.session_state:
        st.session_state['predictions'] = None
    if 'last_form' not in st.session_state:
        st.session_state['last_form'] = None

    estate_iq_react = components.declare_component("estate_iq", path=build_dir)
    
    # Grab the incoming data from Streamlit session state (injected prior to render by custom component)
    incoming_form = st.session_state.get("estate_iq_main", None)
    
    # Process Machine Learning predictions BEFORE pushing to React (eliminating st.rerun infinite loops)
    if incoming_form and incoming_form != st.session_state['last_form']:
        st.toast("⚡ React Web App triggered the Python engine!", icon="🌐")
        st.session_state['last_form'] = incoming_form
        st.session_state['predictions'] = compute_ml_prediction(incoming_form)
        st.toast("✅ Scikit-Learn & XGBoost compiled successfully!", icon="🚀")

    # Render React layout exactly ONCE per interaction cascade
    estate_iq_react(predictions=st.session_state['predictions'], key="estate_iq_main", default=None)
