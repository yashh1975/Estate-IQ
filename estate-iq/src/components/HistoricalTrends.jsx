import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Synthetic historical multiplier indices
const HISTORICAL_INDICES = {
  Mumbai: [1.0, 1.05, 1.12, 1.15, 1.25, 1.3, 1.45, 1.6, 1.75, 1.9, 2.2],
  Delhi: [1.0, 1.03, 1.08, 1.12, 1.19, 1.25, 1.35, 1.42, 1.55, 1.7, 1.85],
  Bangalore: [1.0, 1.1, 1.25, 1.35, 1.5, 1.65, 1.85, 2.1, 2.3, 2.6, 2.85],
  Hyderabad: [1.0, 1.08, 1.18, 1.28, 1.4, 1.6, 1.8, 2.05, 2.35, 2.65, 2.95],
  Chennai: [1.0, 1.02, 1.06, 1.1, 1.15, 1.22, 1.28, 1.35, 1.45, 1.5, 1.65],
  Pune: [1.0, 1.04, 1.1, 1.15, 1.25, 1.35, 1.48, 1.6, 1.75, 1.9, 2.15],
  Kolkata: [1.0, 1.02, 1.04, 1.07, 1.1, 1.12, 1.18, 1.22, 1.28, 1.32, 1.4],
  Mysuru: [1.0, 1.05, 1.12, 1.22, 1.35, 1.52, 1.7, 1.85, 2.02, 2.15, 2.35]
};

export default function HistoricalTrends({ location }) {
  const data = useMemo(() => {
    const multipliers = HISTORICAL_INDICES[location] || HISTORICAL_INDICES['Mumbai'];
    const startYear = 2014;
    return multipliers.map((mult, idx) => ({
      year: startYear + idx,
      growth: Math.round((mult - 1) * 100)
    }));
  }, [location]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-panel p-8 rounded-2xl border border-border w-full mb-12 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 font-display text-8xl font-bold italic tracking-tighter mix-blend-overlay">
        {location}
      </div>
      
      <div className="mb-6 relative z-10">
        <h2 className="text-2xl font-display font-semibold mb-1">10-Year Macro Growth</h2>
        <p className="text-sm text-text-secondary">Historical percentage value appreciation for <strong>{location}</strong></p>
      </div>

      <div className="h-[250px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4FC3F7" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#4FC3F7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F4A" vertical={false} />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#8A93B2', fontSize: 12 }} dy={10} />
            <YAxis tickFormatter={(val) => `+${val}%`} axisLine={false} tickLine={false} tick={{ fill: '#8A93B2', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#141728', border: '1px solid #2A2F4A', borderRadius: '8px', color: '#F0F4FF' }}
              itemStyle={{ color: '#4FC3F7', fontWeight: 'bold' }}
              labelStyle={{ color: '#8A93B2', marginBottom: '4px' }}
              formatter={(value) => [`${value}% Total ROI`, "Appreciation"]}
            />
            <Area type="monotone" dataKey="growth" stroke="#4FC3F7" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" isAnimationActive={true} animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
