// FILE: src/services/dataService.ts
import type { Product } from '../types';

export const products: Product[] = [
  // =====================
  // iPhone 16 Series
  // =====================
  {
    id: 'ip16-pro-256',
    brand: 'Apple',
    model: 'iPhone 16 Pro',
    modelNumber: 'A3293',
    grade: 'Brand New',
    storage: '256GB',
    color: 'Desert',
    priceUsd: 945,
    stock: 140,
    origin: 'CN',
    imageUrl: '',
    simType: 'Dual SIM',
    variations: [
      { storage: '256GB', grade: 'Brand New', color: 'Desert', price: 945, stock: 60, origin: 'CN' },
      { storage: '256GB', grade: 'Brand New', color: 'Black', price: 945, stock: 40, origin: 'CN' },
      { storage: '256GB', grade: 'Brand New', color: 'Natural', price: 945, stock: 40, origin: 'CN' },
    ]
  },

  // =====================
  // iPhone 15 Pro Series
  // =====================
  {
    id: 'ip15-pro-128',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    modelNumber: 'A3101',
    grade: 'Brand New',
    storage: '128GB',
    color: 'White',
    priceUsd: 634,
    stock: 370,
    origin: 'CA',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Canada Spec - $576 * 1.1 = $634
      { storage: '128GB', grade: 'Brand New', color: 'White', price: 634, stock: 20, origin: 'CA' },
      { storage: '128GB', grade: 'Brand New', color: 'Natural', price: 634, stock: 20, origin: 'CA' },
      // Europe Spec - $576 * 1.1 = $634
      { storage: '128GB', grade: 'Brand New', color: 'White', price: 634, stock: 40, origin: 'EU' },
      { storage: '128GB', grade: 'Brand New', color: 'Natural', price: 634, stock: 40, origin: 'EU' },
      // China Spec - $577 * 1.1 = $635
      { storage: '128GB', grade: 'Brand New', color: 'White', price: 635, stock: 30, origin: 'CN' },
      // Singapore Spec - $628 * 1.1 = $691
      { storage: '128GB', grade: 'Brand New', color: 'White', price: 691, stock: 60, origin: 'SG' },
      { storage: '128GB', grade: 'Brand New', color: 'Natural', price: 691, stock: 60, origin: 'SG' },
      { storage: '128GB', grade: 'Brand New', color: 'Black', price: 691, stock: 40, origin: 'SG' },
      { storage: '128GB', grade: 'Brand New', color: 'Blue', price: 691, stock: 40, origin: 'SG' },
      // Korea Spec - $628 * 1.1 = $691
      { storage: '128GB', grade: 'Brand New', color: 'Black', price: 691, stock: 20, origin: 'KR' },
    ]
  },
  {
    id: 'ip15-pro-256',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    modelNumber: 'A3101',
    grade: 'Brand New',
    storage: '256GB',
    color: 'Black',
    priceUsd: 669,
    stock: 400,
    origin: 'CA',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Canada Spec - $608 * 1.1 = $669
      { storage: '256GB', grade: 'Brand New', color: 'Black', price: 669, stock: 60, origin: 'CA' },
      { storage: '256GB', grade: 'Brand New', color: 'Natural', price: 669, stock: 60, origin: 'CA' },
      { storage: '256GB', grade: 'Brand New', color: 'Blue', price: 669, stock: 60, origin: 'CA' },
      { storage: '256GB', grade: 'Brand New', color: 'White', price: 669, stock: 20, origin: 'CA' },
      // Japan Spec - $668 * 1.1 = $735
      { storage: '256GB', grade: 'Brand New', color: 'Black', price: 735, stock: 20, origin: 'JP' },
      { storage: '256GB', grade: 'Brand New', color: 'White', price: 735, stock: 20, origin: 'JP' },
      { storage: '256GB', grade: 'Brand New', color: 'Natural', price: 735, stock: 20, origin: 'JP' },
      { storage: '256GB', grade: 'Brand New', color: 'Blue', price: 735, stock: 20, origin: 'JP' },
      // Korea Spec - $668 * 1.1 = $735
      { storage: '256GB', grade: 'Brand New', color: 'White', price: 735, stock: 40, origin: 'KR' },
      { storage: '256GB', grade: 'Brand New', color: 'Natural', price: 735, stock: 40, origin: 'KR' },
      { storage: '256GB', grade: 'Brand New', color: 'Black', price: 735, stock: 20, origin: 'KR' },
      { storage: '256GB', grade: 'Brand New', color: 'Blue', price: 735, stock: 20, origin: 'KR' },
      // Singapore Spec - $668 * 1.1 = $735
      { storage: '256GB', grade: 'Brand New', color: 'Black', price: 735, stock: 40, origin: 'SG' },
      { storage: '256GB', grade: 'Brand New', color: 'Natural', price: 735, stock: 20, origin: 'SG' },
      { storage: '256GB', grade: 'Brand New', color: 'Blue', price: 735, stock: 20, origin: 'SG' },
    ]
  },
  {
    id: 'ip15-pro-512',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    modelNumber: 'A3101',
    grade: 'Brand New',
    storage: '512GB',
    color: 'Blue',
    priceUsd: 734,
    stock: 180,
    origin: 'CA',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Canada Spec - $667 * 1.1 = $734
      { storage: '512GB', grade: 'Brand New', color: 'Blue', price: 734, stock: 20, origin: 'CA' },
      // Europe Spec - $667 * 1.1 = $734
      { storage: '512GB', grade: 'Brand New', color: 'White', price: 734, stock: 40, origin: 'EU' },
      { storage: '512GB', grade: 'Brand New', color: 'Natural', price: 734, stock: 20, origin: 'EU' },
      // Japan Spec - $699 * 1.1 = $769
      { storage: '512GB', grade: 'Brand New', color: 'Black', price: 769, stock: 40, origin: 'JP' },
      { storage: '512GB', grade: 'Brand New', color: 'White', price: 769, stock: 20, origin: 'JP' },
      { storage: '512GB', grade: 'Brand New', color: 'Natural', price: 769, stock: 20, origin: 'JP' },
      // Singapore Spec - $809 * 1.1 = $890
      { storage: '512GB', grade: 'Brand New', color: 'Blue', price: 890, stock: 20, origin: 'SG' },
    ]
  },
  {
    id: 'ip15-pro-1tb',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    modelNumber: 'A3101',
    grade: 'Brand New',
    storage: '1TB',
    color: 'White',
    priceUsd: 755,
    stock: 79,
    origin: 'EU',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Europe Spec - $686 * 1.1 = $755
      { storage: '1TB', grade: 'Brand New', color: 'White', price: 755, stock: 20, origin: 'EU' },
      { storage: '1TB', grade: 'Brand New', color: 'Natural', price: 755, stock: 19, origin: 'EU' },
      // Canada Spec - $686 * 1.1 = $755
      { storage: '1TB', grade: 'Brand New', color: 'Natural', price: 755, stock: 20, origin: 'CA' },
      { storage: '1TB', grade: 'Brand New', color: 'Blue', price: 755, stock: 20, origin: 'CA' },
    ]
  },

  // =====================
  // iPhone 15 Pro Max Series
  // =====================
  {
    id: 'ip15-promax-256',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    modelNumber: 'A3106',
    grade: 'Brand New',
    storage: '256GB',
    color: 'Blue',
    priceUsd: 773,
    stock: 18,
    origin: 'EU',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Europe Spec - $703 * 1.1 = $773
      { storage: '256GB', grade: 'Brand New', color: 'Blue', price: 773, stock: 18, origin: 'EU' },
    ]
  },
  {
    id: 'ip15-promax-512',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    modelNumber: 'A3106',
    grade: 'Brand New',
    storage: '512GB',
    color: 'Blue',
    priceUsd: 916,
    stock: 20,
    origin: 'EU',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Europe Spec (Pro Max) - $833 * 1.1 = $916
      { storage: '512GB', grade: 'Brand New', color: 'Blue', price: 916, stock: 20, origin: 'EU' },
    ]
  },

  // =====================
  // iPhone 14 Series
  // =====================
  {
    id: 'ip14-256',
    brand: 'Apple',
    model: 'iPhone 14',
    modelNumber: 'A2884',
    grade: 'Brand New',
    storage: '256GB',
    color: 'Starlight',
    priceUsd: 443,
    stock: 50,
    origin: 'CN',
    imageUrl: '',
    simType: 'Dual SIM',
    variations: [
      // China Spec - $403 * 1.1 = $443
      { storage: '256GB', grade: 'Brand New', color: 'Starlight', price: 443, stock: 33, origin: 'CN' },
      { storage: '256GB', grade: 'Brand New', color: 'Purple', price: 443, stock: 6, origin: 'CN' },
      { storage: '256GB', grade: 'Brand New', color: 'Midnight', price: 443, stock: 5, origin: 'CN' },
      { storage: '256GB', grade: 'Brand New', color: 'Blue', price: 443, stock: 3, origin: 'CN' },
      { storage: '256GB', grade: 'Brand New', color: 'Red', price: 443, stock: 2, origin: 'CN' },
      { storage: '256GB', grade: 'Brand New', color: 'Yellow', price: 443, stock: 1, origin: 'CN' },
    ]
  },
  {
    id: 'ip14-plus-128',
    brand: 'Apple',
    model: 'iPhone 14 Plus',
    modelNumber: 'A2886',
    grade: 'Brand New',
    storage: '128GB',
    color: 'Midnight',
    priceUsd: 402,
    stock: 51,
    origin: 'CN',
    imageUrl: '',
    simType: 'Dual SIM',
    variations: [
      // China Spec - $365 * 1.1 = $402
      { storage: '128GB', grade: 'Brand New', color: 'Midnight', price: 402, stock: 18, origin: 'CN' },
      { storage: '128GB', grade: 'Brand New', color: 'Blue', price: 402, stock: 13, origin: 'CN' },
      { storage: '128GB', grade: 'Brand New', color: 'Starlight', price: 402, stock: 8, origin: 'CN' },
      { storage: '128GB', grade: 'Brand New', color: 'Purple', price: 402, stock: 6, origin: 'CN' },
      { storage: '128GB', grade: 'Brand New', color: 'Red', price: 402, stock: 3, origin: 'CN' },
      { storage: '128GB', grade: 'Brand New', color: 'Yellow', price: 402, stock: 3, origin: 'CN' },
    ]
  },
  {
    id: 'ip14-plus-512',
    brand: 'Apple',
    model: 'iPhone 14 Plus',
    modelNumber: 'A2886',
    grade: 'Brand New',
    storage: '512GB',
    color: 'Midnight',
    priceUsd: 439,
    stock: 110,
    origin: 'EU',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Europe Spec - $399 * 1.1 = $439
      { storage: '512GB', grade: 'Brand New', color: 'Midnight', price: 439, stock: 20, origin: 'EU' },
      { storage: '512GB', grade: 'Brand New', color: 'Purple', price: 439, stock: 20, origin: 'EU' },
      { storage: '512GB', grade: 'Brand New', color: 'Yellow', price: 439, stock: 20, origin: 'EU' },
      // UAE Spec - $399 * 1.1 = $439
      { storage: '512GB', grade: 'Brand New', color: 'Purple', price: 439, stock: 20, origin: 'UAE' },
      { storage: '512GB', grade: 'Brand New', color: 'Red', price: 439, stock: 20, origin: 'UAE' },
      { storage: '512GB', grade: 'Brand New', color: 'Midnight', price: 439, stock: 10, origin: 'UAE' },
    ]
  },

  // =====================
  // iPhone 14 Pro Max Series
  // =====================
  {
    id: 'ip14-promax-256',
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    modelNumber: 'A2894',
    grade: 'Brand New',
    storage: '256GB',
    color: 'Purple',
    priceUsd: 639,
    stock: 584,
    origin: 'JP',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Japan Spec - $581 * 1.1 = $639
      { storage: '256GB', grade: 'Brand New', color: 'Purple', price: 639, stock: 97, origin: 'JP' },
      { storage: '256GB', grade: 'Brand New', color: 'Black', price: 639, stock: 62, origin: 'JP' },
      { storage: '256GB', grade: 'Brand New', color: 'Gold', price: 639, stock: 56, origin: 'JP' },
      { storage: '256GB', grade: 'Brand New', color: 'Silver', price: 639, stock: 32, origin: 'JP' },
      // Europe Spec - $581 * 1.1 = $639
      { storage: '256GB', grade: 'Brand New', color: 'Black', price: 639, stock: 140, origin: 'EU' },
      { storage: '256GB', grade: 'Brand New', color: 'Purple', price: 639, stock: 97, origin: 'EU' },
      { storage: '256GB', grade: 'Brand New', color: 'Gold', price: 639, stock: 80, origin: 'EU' },
      { storage: '256GB', grade: 'Brand New', color: 'Silver', price: 639, stock: 20, origin: 'EU' },
    ]
  },
  {
    id: 'ip14-promax-512',
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    modelNumber: 'A2894',
    grade: 'Brand New',
    storage: '512GB',
    color: 'Black',
    priceUsd: 682,
    stock: 204,
    origin: 'EU',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Europe Spec - $620 * 1.1 = $682
      { storage: '512GB', grade: 'Brand New', color: 'Black', price: 682, stock: 40, origin: 'EU' },
      { storage: '512GB', grade: 'Brand New', color: 'Silver', price: 682, stock: 40, origin: 'EU' },
      { storage: '512GB', grade: 'Brand New', color: 'Gold', price: 682, stock: 20, origin: 'EU' },
      // Japan Spec - $620 * 1.1 = $682
      { storage: '512GB', grade: 'Brand New', color: 'Purple', price: 682, stock: 36, origin: 'JP' },
      { storage: '512GB', grade: 'Brand New', color: 'Black', price: 682, stock: 24, origin: 'JP' },
      { storage: '512GB', grade: 'Brand New', color: 'Gold', price: 682, stock: 13, origin: 'JP' },
      { storage: '512GB', grade: 'Brand New', color: 'Silver', price: 682, stock: 11, origin: 'JP' },
      // Canada Spec - $620 * 1.1 = $682
      { storage: '512GB', grade: 'Brand New', color: 'Purple', price: 682, stock: 20, origin: 'CA' },
    ]
  },
  {
    id: 'ip14-promax-1tb',
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    modelNumber: 'A2894',
    grade: 'Brand New',
    storage: '1TB',
    color: 'Purple',
    priceUsd: 716,
    stock: 185,
    origin: 'JP',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // Japan Spec - $651 * 1.1 = $716
      { storage: '1TB', grade: 'Brand New', color: 'Purple', price: 716, stock: 28, origin: 'JP' },
      { storage: '1TB', grade: 'Brand New', color: 'Gold', price: 716, stock: 14, origin: 'JP' },
      { storage: '1TB', grade: 'Brand New', color: 'Black', price: 716, stock: 11, origin: 'JP' },
      { storage: '1TB', grade: 'Brand New', color: 'Silver', price: 716, stock: 10, origin: 'JP' },
      // Europe Spec - $651 * 1.1 = $716
      { storage: '1TB', grade: 'Brand New', color: 'Black', price: 716, stock: 20, origin: 'EU' },
      { storage: '1TB', grade: 'Brand New', color: 'Gold', price: 716, stock: 20, origin: 'EU' },
      { storage: '1TB', grade: 'Brand New', color: 'Purple', price: 716, stock: 20, origin: 'EU' },
      // Singapore Spec - $651 * 1.1 = $716
      { storage: '1TB', grade: 'Brand New', color: 'Black', price: 716, stock: 44, origin: 'SG' },
      { storage: '1TB', grade: 'Brand New', color: 'Purple', price: 716, stock: 14, origin: 'SG' },
      { storage: '1TB', grade: 'Brand New', color: 'Gold', price: 716, stock: 5, origin: 'SG' },
      { storage: '1TB', grade: 'Brand New', color: 'Silver', price: 716, stock: 3, origin: 'SG' },
      // Canada Spec - $651 * 1.1 = $716
      { storage: '1TB', grade: 'Brand New', color: 'Black', price: 716, stock: 20, origin: 'CA' },
    ]
  },

  // =====================
  // iPhone 13 Pro Max Series
  // =====================
  {
    id: 'ip13-promax-128',
    brand: 'Apple',
    model: 'iPhone 13 Pro Max',
    modelNumber: 'A2643',
    grade: 'Brand New',
    storage: '128GB',
    color: 'Graphite',
    priceUsd: 466,
    stock: 1000,
    origin: 'US',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // USA Spec (1SIM + eSIM) - $424 * 1.1 = $466
      { storage: '128GB', grade: 'Brand New', color: 'Graphite', price: 466, stock: 200, origin: 'US' },
      { storage: '128GB', grade: 'Brand New', color: 'Silver', price: 466, stock: 200, origin: 'US' },
      { storage: '128GB', grade: 'Brand New', color: 'Gold', price: 466, stock: 200, origin: 'US' },
      { storage: '128GB', grade: 'Brand New', color: 'Blue', price: 466, stock: 200, origin: 'US' },
      { storage: '128GB', grade: 'Brand New', color: 'Green', price: 466, stock: 200, origin: 'US' },
    ]
  },
  {
    id: 'ip13-promax-256',
    brand: 'Apple',
    model: 'iPhone 13 Pro Max',
    modelNumber: 'A2643',
    grade: 'Brand New',
    storage: '256GB',
    color: 'Graphite',
    priceUsd: 495,
    stock: 1000,
    origin: 'US',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // USA Spec (1SIM + eSIM) - $450 * 1.1 = $495
      { storage: '256GB', grade: 'Brand New', color: 'Graphite', price: 495, stock: 200, origin: 'US' },
      { storage: '256GB', grade: 'Brand New', color: 'Silver', price: 495, stock: 200, origin: 'US' },
      { storage: '256GB', grade: 'Brand New', color: 'Gold', price: 495, stock: 200, origin: 'US' },
      { storage: '256GB', grade: 'Brand New', color: 'Blue', price: 495, stock: 200, origin: 'US' },
      { storage: '256GB', grade: 'Brand New', color: 'Green', price: 495, stock: 200, origin: 'US' },
    ]
  },
  {
    id: 'ip13-promax-512',
    brand: 'Apple',
    model: 'iPhone 13 Pro Max',
    modelNumber: 'A2643',
    grade: 'Brand New',
    storage: '512GB',
    color: 'Graphite',
    priceUsd: 537,
    stock: 1000,
    origin: 'US',
    imageUrl: '',
    simType: 'Physical + eSIM',
    variations: [
      // USA Spec (1SIM + eSIM) - $488 * 1.1 = $537
      { storage: '512GB', grade: 'Brand New', color: 'Graphite', price: 537, stock: 200, origin: 'US' },
      { storage: '512GB', grade: 'Brand New', color: 'Silver', price: 537, stock: 200, origin: 'US' },
      { storage: '512GB', grade: 'Brand New', color: 'Gold', price: 537, stock: 200, origin: 'US' },
      { storage: '512GB', grade: 'Brand New', color: 'Blue', price: 537, stock: 200, origin: 'US' },
      { storage: '512GB', grade: 'Brand New', color: 'Green', price: 537, stock: 200, origin: 'US' },
    ]
  },

  // =====================
  // Legacy Products (existing)
  // =====================
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
    imageUrl: '',
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
    imageUrl: '',
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
    imageUrl: '',
    simType: 'eSIM Only'
  }
];

export const enhanceProductWithImage = (product: Product): Product => {
  return product;
};
