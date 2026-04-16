import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Streamlit } from 'streamlit-component-lib';
import Hero from './components/Hero';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import FeatureImportance from './components/FeatureImportance';
import HowItWorks from './components/HowItWorks';
import ModelComparisonTable from './components/ModelComparisonTable';
import Footer from './components/Footer';
import PredictionChart from './components/PredictionChart';
import HistoricalTrends from './components/HistoricalTrends';

function App() {
  const [formData, setFormData] = useState({
    area: 1200,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Mumbai',
    age: 5,
    floors: 'G',
    amenities: ['Security', 'Parking'],
    furnishing: 'Semi',
  });

  const [isPredicting, setIsPredicting] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Listen for Python Backend pushing prediction results down via Streamlit Props
    const handleMessage = (event) => {
      if (event.data.type === "streamlit:render") {
        const props = event.data.args;
        if (props && 'predictions' in props) {
          setResults(props.predictions);
          setIsPredicting(false);
        }
      }
    };
    window.addEventListener("message", handleMessage);

    Streamlit.setComponentReady();
    Streamlit.setFrameHeight();
    const resizeObserver = new ResizeObserver(() => Streamlit.setFrameHeight());
    resizeObserver.observe(document.body);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handlePredict = () => {
    setIsPredicting(true);
    // Add _timestamp so Streamlit ALWAYS detects a mutation, avoiding infinite hang caches!
    Streamlit.setComponentValue({ ...formData, _timestamp: Date.now() });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-pattern">
      <Hero />
      
      <main className="max-w-[1400px] mx-auto px-6 py-12 relative z-10">
        <HowItWorks />
        
        <div id="estimator" className="flex flex-col lg:flex-row gap-8 mb-12 scroll-mt-24">
          <div className="w-full lg:w-[40%]">
            <InputPanel 
              data={formData} 
              onChange={(newData) => setFormData({ ...formData, ...newData })} 
              onPredict={handlePredict}
              isPredicting={isPredicting}
            />
          </div>
          
          <div className="w-full lg:w-[60%]">
            <ResultsPanel results={results} isPredicting={isPredicting} />
          </div>
        </div>

        <PredictionChart results={results} />
        <HistoricalTrends location={formData.location} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <FeatureImportance />
        </motion.div>

        <ModelComparisonTable />
      </main>

      <Footer />
    </div>
  );
}

export default App;
