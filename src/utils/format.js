export function formatPrice(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatKm(value) {
  return `${value.toLocaleString("en-IN")} km`;
}

export function formatPriceInput(value) {
  return Number(value).toLocaleString("en-IN");
}
