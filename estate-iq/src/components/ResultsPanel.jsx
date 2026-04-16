import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Trees, Zap } from 'lucide-react';
import { formatCurrency } from '../lib/simulation';

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState("₹0");

  useEffect(() => {
    if (value === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay("₹0");
      return;
    }
    
    let start = 0;
    const end = value;
    const duration = 1000;
    const incrementTime = 20;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        clearInterval(timer);
        setDisplay(formatCurrency(end));
      } else {
        setDisplay(formatCurrency(Math.floor(start)));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{display}</span>;
}

export default function ResultsPanel({ results, isPredicting }) {
  
  if (!results && !isPredicting) {
    return (
      <div className="h-full flex items-center justify-center border-2 border-dashed border-border rounded-2xl p-8 text-center text-text-secondary bg-surface/10">
        <div>
          <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-display text-white mb-2">Ready to Value</h3>
          <p>Fill out the details on the left and click Predict Price to see the ML estimated values.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* XGBoost */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-surface rounded-lg">
                <Zap className="w-6 h-6 text-accent-secondary" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-status-success/20 text-status-success rounded border border-status-success/30">
                High Confidence
              </span>
            </div>
            <h3 className="text-text-secondary font-medium">XGBoost</h3>
            <p className="text-xs text-text-secondary mb-4 mt-1">Highest Accuracy</p>
          </div>
          <div className="text-3xl font-mono font-bold text-accent-secondary">
             {isPredicting ? '...' : <AnimatedCounter value={results?.xgb || 0} />}
          </div>
        </motion.div>

        {/* Random Forest (Recommended) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 flex flex-col justify-between border-accent-primary shadow-[0_0_20px_rgba(245,166,35,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-accent-primary text-background-primary text-[10px] font-bold px-3 py-1 rounded-bl-lg">
            RECOMMENDED
          </div>
          <div>
            <div className="flex items-start mb-4">
              <div className="p-3 bg-accent-primary/20 rounded-lg">
                <Trees className="w-6 h-6 text-accent-primary" />
              </div>
            </div>
            <h3 className="text-text-secondary font-medium">Random Forest</h3>
            <p className="text-xs text-text-secondary mb-4 mt-1">Most Balanced</p>
          </div>
          <div className="text-4xl font-mono font-bold text-accent-primary drop-shadow-[0_0_10px_rgba(245,166,35,0.8)]">
            {isPredicting ? '...' : <AnimatedCounter value={results?.rf || 0} />}
          </div>
        </motion.div>

        {/* Linear Regression */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 flex flex-col justify-between md:col-span-2 lg:col-span-1"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-surface rounded-lg">
                <TrendingUp className="w-6 h-6 text-text-primary" />
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-accent-primary/20 text-accent-primary rounded border border-accent-primary/30">
                Medium Confidence
              </span>
            </div>
            <h3 className="text-text-secondary font-medium">Linear Regression</h3>
            <p className="text-xs text-text-secondary mb-4 mt-1">Simple & Fast Baseline</p>
          </div>
          <div className="text-3xl font-mono font-bold text-white">
            {isPredicting ? '...' : <AnimatedCounter value={results?.linear || 0} />}
          </div>
          <div className="mt-4 w-full bg-background-secondary h-1.5 rounded-full overflow-hidden">
             <div className="bg-text-secondary h-full rounded-full" style={{ width: '65%' }}></div>
          </div>
        </motion.div>
      </div>

      {/* Ensemble Average */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="glass-card p-8 bg-gradient-to-br from-surface to-background-secondary mt-auto"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-display font-semibold mb-1">Ensemble Recommended Market Value</h2>
          <p className="text-sm text-text-secondary">Combined output prioritizing optimal models</p>
        </div>
        
        <div className="flex justify-center text-5xl font-mono font-bold text-status-success mb-6 drop-shadow-[0_0_15px_rgba(86,207,178,0.5)]">
          {isPredicting ? '...' : <AnimatedCounter value={results?.ensemble || 0} />}
        </div>
        
        {!isPredicting && results && (
          <div className="px-8">
            <div className="flex justify-between text-xs text-text-secondary mb-2">
              <span>{formatCurrency(results.ensemble * 0.95)}</span>
              <span>Predicted Range (±5%)</span>
              <span>{formatCurrency(results.ensemble * 1.05)}</span>
            </div>
            <div className="w-full bg-background-primary h-2 rounded-full overflow-hidden relative">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '40%', x: '75%' }} 
                 transition={{ duration: 1, delay: 1 }}
                 className="absolute top-0 bottom-0 bg-gradient-to-r from-status-success/30 via-status-success to-status-success/30 rounded-full"
               ></motion.div>
            </div>
          </div>
        )}
      </motion.div>

    </div>
  );
}
