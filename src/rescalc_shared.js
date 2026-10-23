import * as calc from "./calculator.js";

export function restockShareCount() {
  const count = bag => Object.keys(bag).filter(n => (bag[n] || 0) > 0).length;
  const fruits = Object.keys(calc.BASE_STOCK_FRUITS).filter(n => (calc.BASE_STOCK_FRUITS[n] || 0) > 0 && !(calc.BASE_FRUITS[n] && calc.BASE_FRUITS[n].moonOnly)).length;
  return Math.max(1, count(calc.BASE_STOCK_CROPS) + fruits + count(calc.BASE_STOCK_GREENHOUSE) + count(calc.BASE_STOCK_FLOWERS));
}

export function toolRestockShareCount() {
  return Math.max(1, Object.keys(calc.BASE_STOCK_TOOLS).filter(n => (calc.BASE_STOCK_TOOLS[n] || 0) > 0).length);
}
