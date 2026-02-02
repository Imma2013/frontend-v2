import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Heart, ArrowLeft, Package } from 'lucide-react';

interface Props {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onToggleSaved: (id: string) => void;
  onBack: () => void;
}

export const Watchlist: React.FC<Props> = ({ products, onProductClick, onToggleSaved, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white">Watchlist</h1>
              <p className="text-sm text-gray-500">{products.length} saved items</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
              <Heart className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 mb-6">Save items to track availability and prices</p>
            <button
              onClick={onBack}
              className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 px-6 py-2.5 rounded-xl font-bold transition-colors"
            >
              Browse Inventory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick?.(product)}
                isSaved={true}
                onToggleSaved={onToggleSaved}
                onQuickAdd={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
