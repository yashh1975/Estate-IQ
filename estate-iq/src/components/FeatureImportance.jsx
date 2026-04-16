import React from 'react';
import { motion } from 'framer-motion';

const FEATURES = [
  { name: 'Area', importance: 95, color: '#F5A623', type: 'High' },
  { name: 'Location', importance: 85, color: '#F5A623', type: 'High' },
  { name: 'Bedrooms', importance: 65, color: '#56CFB2', type: 'Medium' },
  { name: 'Amenities', importance: 45, color: '#56CFB2', type: 'Medium' },
  { name: 'Age', importance: 25, color: '#8A93B2', type: 'Low' },
];

export default function FeatureImportance() {
  return (
    <div className="glass-panel p-8 rounded-2xl auto-mx border border-border">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold mb-2">Model Feature Importance</h2>
        <p className="text-text-secondary">Which property attributes drive the final valuation the most?</p>
      </div>

      <div className="space-y-6">
        {FEATURES.map((feature, index) => (
          <div key={feature.name} className="flex flex-col gap-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{feature.name}</span>
              <span style={{ color: feature.color }}>{feature.type} Impact</span>
            </div>
            <div className="w-full bg-background-secondary h-4 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${feature.importance}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                className="h-full rounded-full shadow-[0_0_10px_currentColor]"
                style={{ backgroundColor: feature.color, color: feature.color }}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
