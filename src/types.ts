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
export type Origin = 'HK' | 'JP' | 'US' | 'EU' | 'AU' | 'CA';

export const ORIGIN_FLAGS: Record<Origin, string> = {
  HK: 'hk',
  JP: 'jp',
  US: 'us',
  EU: 'eu',
  AU: 'au',
  CA: 'ca'
};

export const ORIGIN_NAMES: Record<Origin, string> = {
  HK: 'Hong Kong',
  JP: 'Japan',
  US: 'USA',
  EU: 'Europe',
  AU: 'Australia',
  CA: 'Canada'
};
