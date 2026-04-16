import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const formatCurrencyValue = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val}`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 !bg-surface/90 border-border shadow-2xl">
        <p className="text-sm text-text-secondary font-medium mb-1">{payload[0].payload.name}</p>
        <p className="text-xl font-mono font-bold" style={{ color: payload[0].payload.fill }}>
          {formatCurrencyValue(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function PredictionChart({ results }) {
  // Default empty graph shape
  const data = results ? [
    { name: 'Linear Reg.', price: results.linear, fill: '#8A93B2' },
    { name: 'Random Forest', price: results.rf, fill: '#F5A623' },
    { name: 'XGBoost', price: results.xgb, fill: '#4FC3F7' },
    { name: 'Ensemble', price: results.ensemble, fill: '#56CFB2' },
  ] : [
    { name: 'Linear Reg.', price: 0, fill: '#8A93B2' },
    { name: 'Random Forest', price: 0, fill: '#F5A623' },
    { name: 'XGBoost', price: 0, fill: '#4FC3F7' },
    { name: 'Ensemble', price: 0, fill: '#56CFB2' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-panel p-8 rounded-2xl border border-border w-full mb-12"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold mb-1">Model Distribution Analysis</h2>
        <p className="text-sm text-text-secondary">A graphical price comparison across our modeled intelligence layers.</p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F4A" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8A93B2', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              tickFormatter={formatCurrencyValue} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#8A93B2', fontSize: 12 }} 
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#141728' }} />
            <Bar 
              dataKey="price" 
              radius={[6, 6, 0, 0]} 
              isAnimationActive={true}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
