import React from 'react';
import { motion } from 'framer-motion';

export default function ModelComparisonTable() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-semibold mb-4">Algorithm Comparison</h2>
        <p className="text-text-secondary max-w-xl mx-auto">Understanding the strengths of the three simulated ML models under the hood.</p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full overflow-x-auto rounded-2xl border border-border glass-panel"
      >
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-surface/80 border-b border-border text-sm text-text-secondary uppercase tracking-wider">
              <th className="p-6 font-semibold">Feature</th>
              <th className="p-6 font-semibold">Linear Regression</th>
              <th className="p-6 font-semibold text-accent-primary">Random Forest</th>
              <th className="p-6 font-semibold">XGBoost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 text-sm">
            <tr className="hover:bg-surface/30 transition-colors">
              <td className="p-6 font-medium text-text-primary">Speed</td>
              <td className="p-6">⚡⚡⚡</td>
              <td className="p-6">⚡⚡</td>
              <td className="p-6">⚡</td>
            </tr>
            <tr className="hover:bg-surface/30 transition-colors">
              <td className="p-6 font-medium text-text-primary">Accuracy</td>
              <td className="p-6">Medium</td>
              <td className="p-6 text-accent-primary font-bold">High</td>
              <td className="p-6 font-bold">Highest</td>
            </tr>
            <tr className="hover:bg-surface/30 transition-colors">
              <td className="p-6 font-medium text-text-primary">Handles Non-linearity</td>
              <td className="p-6">❌</td>
              <td className="p-6 text-status-success">✅</td>
              <td className="p-6 text-status-success">✅</td>
            </tr>
            <tr className="hover:bg-surface/30 transition-colors">
              <td className="p-6 font-medium text-text-primary">Overfitting Risk</td>
              <td className="p-6 text-status-success">Low</td>
              <td className="p-6 text-status-success">Low</td>
              <td className="p-6 text-accent-primary">Medium</td>
            </tr>
            <tr className="hover:bg-surface/30 transition-colors">
              <td className="p-6 font-medium text-text-primary">Best For</td>
              <td className="p-6">Fast Baselines</td>
              <td className="p-6">Balanced Use</td>
              <td className="p-6">Competitions</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
