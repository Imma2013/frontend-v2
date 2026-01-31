// FILE: src/services/dataService.ts
import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    modelNumber: 'A3106',
    grade: 'Brand New',
    storage: '256GB',
    color: 'Titanium Black',
    priceUsd: 1150,
    stock: 200,
    origin: 'JP',
    imageUrl: '', // No images
    simType: 'Physical + eSIM'
  },
  {
    id: 'p2',
    brand: 'Apple',
    model: 'iPhone 14 Pro',
    modelNumber: 'A2890',
    grade: 'Refurb A',
    storage: '128GB',
    color: 'Deep Purple',
    priceUsd: 890,
    stock: 45,
    origin: 'HK',
    imageUrl: '', // No images
    simType: 'Dual SIM'
  },
  {
    id: 'p3',
    brand: 'Apple',
    model: 'iPhone 13',
    modelNumber: 'A2633',
    grade: 'Refurb B',
    storage: '128GB',
    color: 'Midnight',
    priceUsd: 420,
    stock: 120,
    origin: 'US',
    imageUrl: '', // No images
    simType: 'eSIM Only'
  },
  {
    id: 'p4',
    brand: 'Apple',
    model: 'iPhone 15',
    modelNumber: 'A3090',
    grade: 'Brand New',
    storage: '128GB',
    color: 'Blue',
    priceUsd: 780,
    stock: 85,
    origin: 'EU',
    imageUrl: '', // No images
    simType: 'Physical + eSIM'
  },
  {
    id: 'p5',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    modelNumber: 'SM-S928B',
    grade: 'Brand New',
    storage: '512GB',
    color: 'Titanium Gray',
    priceUsd: 1080,
    stock: 60,
    origin: 'HK',
    imageUrl: '', // No images
    simType: 'Dual SIM'
  },
  {
    id: 'p6',
    brand: 'Apple',
    model: 'iPhone 12 Pro',
    modelNumber: 'A2407',
    grade: 'Refurb C',
    storage: '256GB',
    color: 'Pacific Blue',
    priceUsd: 380,
    stock: 30,
    origin: 'AU',
    imageUrl: '', // No images
    simType: 'Physical + eSIM'
  },
  {
    id: 'p7',
    brand: 'Apple',
    model: 'iPhone 14 Plus',
    modelNumber: 'A2886',
    grade: 'Refurb A',
    storage: '128GB',
    color: 'Starlight',
    priceUsd: 650,
    stock: 55,
    origin: 'CA',
    imageUrl: '', // No images
    simType: 'Physical + eSIM'
  },
  {
    id: 'p8',
    brand: 'Apple',
    model: 'iPhone 11',
    modelNumber: 'A2221',
    grade: 'Refurb B',
    storage: '64GB',
    color: 'Black',
    priceUsd: 250,
    stock: 150,
    origin: 'US',
    imageUrl: '', // No images
    simType: 'eSIM Only'
  }
];

export const enhanceProductWithImage = (product: Product): Product => {
  return product;
};
