// FILE: src/services/dataService.ts
// ONLY contains new products not yet in backend database
// Once you run addNewProducts.js on backend, these can be removed
import type { Product } from '../types';

export const products: Product[] = [
  // iPhone 17
  {
    id: 'ip17-256',
    brand: 'Apple',
    model: 'iPhone 17',
    modelNumber: 'A3401',
    grade: 'Like New',
    storage: '256GB',
    color: 'Black',
    priceUsd: 835,
    stock: 110,
    origin: 'US',
    imageUrl: '',
    simType: 'eSIM Only',
    variations: [
      { storage: '256GB', grade: 'Like New', color: 'Black', stock: 29, price: 835, origin: 'US' },
      { storage: '256GB', grade: 'Like New', color: 'Lavender', stock: 21, price: 835, origin: 'US' },
      { storage: '256GB', grade: 'Like New', color: 'Mist Blue', stock: 42, price: 835, origin: 'US' },
      { storage: '256GB', grade: 'Like New', color: 'Sage', stock: 7, price: 835, origin: 'US' },
      { storage: '256GB', grade: 'Like New', color: 'White', stock: 11, price: 835, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'Black', stock: 4, price: 922, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'Lavender', stock: 1, price: 922, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'Mist Blue', stock: 1, price: 922, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'Sage', stock: 1, price: 922, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'White', stock: 2, price: 922, origin: 'US' },
    ]
  },

  // iPhone 16 Pro Max
  {
    id: 'ip16-promax-256',
    brand: 'Apple',
    model: 'iPhone 16 Pro Max',
    modelNumber: 'A3295',
    grade: 'Like New',
    storage: '256GB',
    color: 'Black Titanium',
    priceUsd: 889,
    stock: 253,
    origin: 'US',
    imageUrl: '',
    simType: 'eSIM Only',
    variations: [
      { storage: '256GB', grade: 'Like New', color: 'Black Titanium', stock: 50, price: 889, origin: 'US' },
      { storage: '256GB', grade: 'Like New', color: 'Desert Titanium', stock: 60, price: 889, origin: 'US' },
      { storage: '256GB', grade: 'Like New', color: 'Natural Titanium', stock: 32, price: 889, origin: 'US' },
      { storage: '256GB', grade: 'Like New', color: 'White Titanium', stock: 18, price: 889, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'Black Titanium', stock: 74, price: 1032, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'Desert Titanium', stock: 12, price: 1032, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'Natural Titanium', stock: 6, price: 1032, origin: 'US' },
      { storage: '512GB', grade: 'Like New', color: 'White Titanium', stock: 2, price: 1032, origin: 'US' },
      { storage: '1TB', grade: 'Like New', color: 'Black Titanium', stock: 16, price: 1100, origin: 'US' },
      { storage: '1TB', grade: 'Like New', color: 'Desert Titanium', stock: 1, price: 1100, origin: 'US' },
      { storage: '256GB', grade: 'Good', color: 'Black Titanium', stock: 34, price: 853, origin: 'US' },
      { storage: '256GB', grade: 'Good', color: 'Desert Titanium', stock: 42, price: 853, origin: 'US' },
      { storage: '256GB', grade: 'Good', color: 'Natural Titanium', stock: 17, price: 853, origin: 'US' },
      { storage: '512GB', grade: 'Good', color: 'Black Titanium', stock: 20, price: 991, origin: 'US' },
      { storage: '512GB', grade: 'Good', color: 'Desert Titanium', stock: 8, price: 991, origin: 'US' },
      { storage: '512GB', grade: 'Good', color: 'Natural Titanium', stock: 1, price: 991, origin: 'US' },
      { storage: '512GB', grade: 'Good', color: 'White Titanium', stock: 4, price: 991, origin: 'US' },
      { storage: '1TB', grade: 'Good', color: 'Black Titanium', stock: 26, price: 1057, origin: 'US' },
      { storage: '1TB', grade: 'Good', color: 'White Titanium', stock: 11, price: 1057, origin: 'US' },
    ]
  },

  // iPhone 16e
  {
    id: 'ip16e-128',
    brand: 'Apple',
    model: 'iPhone 16e',
    modelNumber: 'A3297',
    grade: 'Like New',
    storage: '128GB',
    color: 'Black',
    priceUsd: 394,
    stock: 15,
    origin: 'US',
    imageUrl: '',
    simType: 'eSIM Only',
    variations: [
      { storage: '128GB', grade: 'Like New', color: 'Black', stock: 8, price: 394, origin: 'US' },
      { storage: '128GB', grade: 'Like New', color: 'White', stock: 7, price: 394, origin: 'US' },
    ]
  },
];

export const enhanceProductWithImage = (product: Product): Product => {
  return product;
};
