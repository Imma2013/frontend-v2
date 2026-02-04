// FILE: src/services/dataService.ts
// Products are now in the backend database - this file is kept for fallback only
import type { Product } from '../types';

// Empty array - all products come from backend API now
export const products: Product[] = [];

export const enhanceProductWithImage = (product: Product): Product => {
  return product;
};
