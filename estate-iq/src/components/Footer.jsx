import React from 'react';
import { Home } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-surface/30 backdrop-blur-sm py-12 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1 mb-4 md:mb-0">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-accent-primary" />
            <span className="font-display font-bold text-2xl tracking-wide">EstateIQ</span>
          </div>
          <span className="text-xs text-text-secondary font-medium pl-1">Developed by Yash</span>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-text-secondary text-sm">
            Disclaimer: Predictions are simulated for educational purposes only. Do not use for real financial decisions.
          </p>
        </div>
        
        <div className="flex gap-4">
          <span className="text-xs px-3 py-1 bg-surface rounded-full border border-border text-text-secondary">React</span>
          <span className="text-xs px-3 py-1 bg-surface rounded-full border border-border text-text-secondary">ML Simulation</span>
          <span className="text-xs px-3 py-1 bg-surface rounded-full border border-border text-text-secondary">Tailwind-inspired</span>
        </div>
      </div>
    </footer>
  );
}
