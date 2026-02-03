// FILE: src/types.ts
export interface ProductVariation {
  storage: string;
  grade: string;
  color: string;
  price: number;
  stock: number;
  origin: string;
}

export interface Product {
  id: string;
  brand: 'Apple' | 'Samsung';
  model: string;
  modelNumber?: string;
  grade: string;
  storage: string;
  color: string;
  priceUsd: number;
  stock: number;
  origin: string;
  simType?: 'Dual SIM' | 'Physical + eSIM' | 'eSIM Only';
  imageUrl?: string;
  gallery?: string[];
  batteryHealth?: number;
  variations?: ProductVariation[];
}

export type Grade = 'Brand New' | 'A2' | 'A1' | 'B1' | 'B2' | 'Refurb A' | 'Refurb B' | 'Refurb C';
export type Origin = 'US' | 'JP' | 'HK' | 'EU' | 'AU' | 'CA' | 'CN' | 'SG' | 'KR' | 'UAE';

export const ORIGIN_FLAGS: Record<string, string> = {
  US: '🇺🇸',
  JP: '🇯🇵',
  HK: '🇭🇰',
  EU: '🇪🇺',
  AU: '🇦🇺',
  CA: '🇨🇦',
  CN: '🇨🇳',
  SG: '🇸🇬',
  KR: '🇰🇷',
  UAE: '🇦🇪'
};

export const ORIGIN_NAMES: Record<string, string> = {
  US: 'USA',
  JP: 'Japan',
  HK: 'Hong Kong',
  EU: 'Europe',
  AU: 'Australia',
  CA: 'Canada',
  CN: 'China',
  SG: 'Singapore',
  KR: 'Korea',
  UAE: 'UAE'
};

export interface Country {
  code: string;
  name: string;
  currency: string;
  langCode: string;
}

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'USA', currency: 'USD', langCode: 'en' }
];

export interface CartItem extends Product {
  quantity: number;
}
