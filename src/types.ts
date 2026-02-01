// FILE: src/types.ts
export interface Product {
  id: string;
  brand: 'Apple' | 'Samsung';
  model: string;
  modelNumber: string;
  grade: Grade;
  storage: string;
  color: string;
  priceUsd: number;
  stock: number;
  origin: Origin;
  simType?: 'Dual SIM' | 'Physical + eSIM' | 'eSIM Only';
  imageUrl: string;
  gallery?: string[];
  batteryHealth?: number;
}

export type Grade = 'Brand New' | 'Refurb A' | 'Refurb B' | 'Refurb C' | 'Refurb D';
export type Origin = 'US';

export const ORIGIN_FLAGS: Record<Origin, string> = {
  US: 'us'
};

export const ORIGIN_NAMES: Record<Origin, string> = {
  US: 'USA'
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
