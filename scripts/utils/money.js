export function formatCurency(params) {
  return (Math.round(params) / 100).toFixed(2);
}
