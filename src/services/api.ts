// Cryzo API Service - Connects frontend to backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface SearchResponse {
  success: boolean;
  query: string;
  model: 'Flash' | 'Pro' | 'fallback' | 'none';
  intent?: 'search' | 'compare' | 'recommend' | 'question' | 'greeting' | 'other';
  message?: string;
  suggestion?: string;
  products: Product[];
  filters?: SearchFilters;
  processingTime?: number;
  error?: string;
  fallback?: boolean;
}

export interface SearchFilters {
  brand?: string | null;
  model?: string | null;
  grade?: string | null;
  storage?: string | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  origin?: string | null;
}

export interface Product {
  _id: string;
  id?: string;
  brand: string;
  model: string;
  storage: string;
  grade: string;
  color?: string;
  retailPrice?: number;
  priceUsd?: number;
  quantity?: number;
  stock?: number;
  phoneOrigin?: string;
  origin?: string;
  inStock?: boolean;
  sku?: string;
  modelNumber?: string;
  simType?: string;
  imageUrl?: string;
}

// AI-Powered Search (uses Gemini)
export const aiSearch = async (
  query: string,
  image?: string | null
): Promise<SearchResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        image: image || undefined,
      }),
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('AI Search Error:', error);

    // Return error response
    return {
      success: false,
      query,
      model: 'fallback',
      message: 'Failed to connect to server. Please try again.',
      products: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Quick Search (no AI, just filters)
export const quickSearch = async (filters: SearchFilters): Promise<{ products: Product[]; total: number }> => {
  try {
    const params = new URLSearchParams();
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.model) params.append('model', filters.model);
    if (filters.grade) params.append('grade', filters.grade);
    if (filters.storage) params.append('storage', filters.storage);
    if (filters.origin) params.append('origin', filters.origin);
    if (filters.minPrice) params.append('minPrice', String(filters.minPrice));
    if (filters.maxPrice) params.append('maxPrice', String(filters.maxPrice));

    const response = await fetch(`${API_BASE_URL}/search/quick?${params}`);

    if (!response.ok) {
      throw new Error(`Quick search failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Quick Search Error:', error);
    return { products: [], total: 0 };
  }
};

// Get all products
export const getProducts = async (): Promise<{ products: Product[]; total: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get Products Error:', error);
    return { products: [], total: 0 };
  }
};

// Get single product
export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get Product Error:', error);
    return null;
  }
};

// Get contact info
export const getContactInfo = async (): Promise<{ email: string; phone: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`);

    if (!response.ok) {
      throw new Error(`Failed to fetch contact info: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get Contact Error:', error);
    return { email: 'sales@cryzo.co.in', phone: '+1 940-400-9316' };
  }
};

// Helper to convert backend product to frontend format
export const normalizeProduct = (product: Product): Product => {
  return {
    ...product,
    id: product._id || product.id || '',
    priceUsd: product.retailPrice || product.priceUsd || 0,
    stock: product.quantity || product.stock || 0,
    origin: product.phoneOrigin || product.origin || 'US',
    imageUrl: product.imageUrl || '',
  };
};

// Stripe Checkout
export const createCheckout = async (
  items: { brand: string; model: string; grade: string; storage: string; origin: string; priceUsd: number; quantity: number }[],
  customerEmail?: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, customerEmail }),
    });

    if (!response.ok) {
      throw new Error('Checkout failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Checkout Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Checkout failed' };
  }
};

// Chat with AI
export const chatWithAI = async (message: string): Promise<{ success: boolean; response: string; intent?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    return await response.json();
  } catch (error) {
    return { success: false, response: 'Connection error. Please try again.' };
  }
};

export default {
  aiSearch,
  quickSearch,
  getProducts,
  getProduct,
  getContactInfo,
  normalizeProduct,
  createCheckout,
  chatWithAI,
};
