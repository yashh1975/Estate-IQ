import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { LOCATION_MULTIPLIERS } from '../lib/simulation';

const CITIES = Object.keys(LOCATION_MULTIPLIERS);
const AMENITIES = ['Parking', 'Pool', 'Gym', 'Garden', 'Security', 'Lift'];
const FLOORS = ['G', '1', '2', '3', '4+'];
const FURNISHING = ['Unfurnished', 'Semi', 'Furnished'];

export default function InputPanel({ data, onChange, onPredict, isPredicting }) {
  
  const handleAmenityToggle = (amenity) => {
    if (data.amenities.includes(amenity)) {
      onChange({ amenities: data.amenities.filter(a => a !== amenity) });
    } else {
      onChange({ amenities: [...data.amenities, amenity] });
    }
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col gap-6">
      <h2 className="text-2xl font-display font-semibold mb-2 flex items-center gap-2">
        Property Details
      </h2>

      {/* Area */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <label className="text-sm text-text-secondary font-medium">Area (sq ft)</label>
          <span className="font-mono text-accent-primary">{data.area}</span>
        </div>
        <input 
          type="range" 
          min="500" max="10000" step="100"
          value={data.area}
          onChange={(e) => onChange({ area: Number(e.target.value) })}
          className="w-full accent-accent-primary"
        />
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-text-secondary font-medium">Bedrooms</label>
          <div className="flex items-center gap-2 bg-background-secondary p-1 rounded-lg border border-border">
            <button 
              className="px-3 py-1 bg-surface rounded text-text-primary hover:text-accent-primary"
              onClick={() => onChange({ bedrooms: Math.max(1, data.bedrooms - 1) })}
            >-</button>
            <span className="flex-1 text-center font-mono">{data.bedrooms}</span>
            <button 
              className="px-3 py-1 bg-surface rounded text-text-primary hover:text-accent-primary"
              onClick={() => onChange({ bedrooms: Math.min(10, data.bedrooms + 1) })}
            >+</button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-text-secondary font-medium">Bathrooms</label>
          <div className="flex items-center gap-2 bg-background-secondary p-1 rounded-lg border border-border">
            <button 
              className="px-3 py-1 bg-surface rounded text-text-primary hover:text-accent-primary"
              onClick={() => onChange({ bathrooms: Math.max(1, data.bathrooms - 1) })}
            >-</button>
            <span className="flex-1 text-center font-mono">{data.bathrooms}</span>
            <button 
              className="px-3 py-1 bg-surface rounded text-text-primary hover:text-accent-primary"
              onClick={() => onChange({ bathrooms: Math.min(6, data.bathrooms + 1) })}
            >+</button>
          </div>
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-sm text-text-secondary font-medium">Location / City</label>
        <select 
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
          className="w-full bg-background-secondary border border-border rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all appearance-none"
        >
          {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      {/* Age */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <label className="text-sm text-text-secondary font-medium">Property Age (Years)</label>
          <span className="font-mono text-accent-primary">{data.age}</span>
        </div>
        <input 
          type="range" min="0" max="50" step="1"
          value={data.age}
          onChange={(e) => onChange({ age: Number(e.target.value) })}
          className="w-full accent-accent-primary"
        />
      </div>

      {/* Floors */}
      <div className="space-y-2">
        <label className="text-sm text-text-secondary font-medium">Floors</label>
        <div className="flex gap-2 bg-background-secondary p-1 rounded-lg border border-border w-full justify-between">
          {FLOORS.map(f => (
            <button 
              key={f}
              onClick={() => onChange({ floors: f })}
              className={`flex-1 py-1 text-sm rounded transition-all ${data.floors === f ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/50' : 'text-text-secondary hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div className="space-y-2">
        <label className="text-sm text-text-secondary font-medium">Furnishing</label>
        <div className="flex gap-2 bg-background-secondary p-1 rounded-lg border border-border w-full justify-between">
          {FURNISHING.map(f => (
            <button 
              key={f}
              onClick={() => onChange({ furnishing: f })}
              className={`flex-1 py-1 text-sm rounded transition-all ${data.furnishing === f ? 'bg-status-success/20 text-status-success border border-status-success/50' : 'text-text-secondary hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2 flex-grow">
        <label className="text-sm text-text-secondary font-medium">Amenities</label>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map(a => {
            const isActive = data.amenities.includes(a);
            return (
              <button 
                key={a}
                onClick={() => handleAmenityToggle(a)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-all ${isActive ? 'bg-accent-secondary/10 border-accent-secondary text-accent-secondary shadow-[0_0_10px_rgba(79,195,247,0.2)]' : 'border-border text-text-secondary hover:border-text-secondary'}`}
              >
                {a}
              </button>
            )
          })}
        </div>
      </div>

      <button 
        onClick={onPredict}
        disabled={isPredicting}
        className="mt-4 w-full bg-accent-primary text-background-primary py-4 rounded-xl font-bold text-lg hover:bg-accent-primary/90 transition-all flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(245,166,35,0.3)] hover:shadow-[0_0_25px_rgba(245,166,35,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPredicting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Calculating...
          </>
        ) : (
          "Predict Price"
        )}
      </button>

    </div>
  );
}
