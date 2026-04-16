export const LOCATION_MULTIPLIERS = {
  Mumbai: 18000,
  Delhi: 14000,
  Bangalore: 12000,
  Hyderabad: 10000,
  Chennai: 9500,
  Pune: 9000,
  Kolkata: 7500,
  Mysuru: 6500,
};


export function formatCurrency(value) {
  if (!value) return "₹0";
  
  // Format to standard Indian Rupee representation (e.g. ₹1.45 Cr or ₹85 L)
  if (value >= 10000000) {
    const cr = (value / 10000000).toFixed(2);
    return `₹${cr} Cr`;
  } else if (value >= 100000) {
    const lakh = (value / 100000).toFixed(2);
    return `₹${lakh} L`;
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}
