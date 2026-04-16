import React from 'react';
import { motion } from 'framer-motion';
import { FormInput, BrainCircuit, IndianRupee } from 'lucide-react';

const STEPS = [
  {
    icon: <FormInput className="w-8 h-8 text-accent-secondary" />,
    title: "1. Enter Details",
    desc: "Fill in the smart form with the property's area, location, and key amenities."
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-accent-primary" />,
    title: "2. AI Models Analyze",
    desc: "Three distinct machine learning algorithms simultaneously process your data points."
  },
  {
    icon: <IndianRupee className="w-8 h-8 text-status-success" />,
    title: "3. Get Instant Valuation",
    desc: "Receive an accurate, simulated price estimate in seconds, backed by an ensemble approach."
  }
];

export default function HowItWorks() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-semibold mb-4">How It Works</h2>
        <p className="text-text-secondary max-w-xl mx-auto">Our mock ML system uses carefully calibrated logic to simulate real-world valuation models.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STEPS.map((step, idx) => (
          <motion.div 
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="glass-card p-8 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6 shadow-xl border border-border">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
