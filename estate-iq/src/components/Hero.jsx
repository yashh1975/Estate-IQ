import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden flex flex-col items-center text-center px-4">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-accent-primary/5 via-background-primary to-status-success/5 animate-gradient-x opacity-70 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 bg-surface/50 p-4 rounded-full border border-accent-primary/20 animate-float"
        >
          <Home className="w-12 h-12 text-accent-primary" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          Predict. <span className="text-accent-primary">Price.</span> Profit.
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl font-light mb-8"
        >
          AI-powered real estate valuation at your fingertips. Discover the true value of your property using advanced machine learning models.
        </motion.p>
        
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="px-8 py-3 bg-accent-primary text-background-primary font-semibold rounded-full hover:bg-accent-primary/90 transition-all shadow-[0_0_20px_rgba(245,166,35,0.4)] hover:shadow-[0_0_30px_rgba(245,166,35,0.6)]"
          onClick={() => document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get Your Estimate
        </motion.button>
      </div>

      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Home className="w-6 h-6 text-accent-primary" />
        <span className="font-display font-bold text-xl tracking-wide">EstateIQ</span>
      </div>
    </section>
  );
}
