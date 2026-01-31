import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';

interface Props {
  savedProducts: Product[];
  onToggleSaved: (id: string) => void;
  onBack: () => void;
}

export const Watchlist: React.FC<Props> = ({ savedProducts, onToggleSaved, onBack }) => {
  return (
    <div className="min-h-[60vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
           <button 
             onClick={onBack}
             className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
           >
             <ArrowLeft className="w-6 h-6" />
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-900">Your Watchlist</h1>
             <p className="text-gray-500 mt-1">{savedProducts.length} saved lots</p>
           </div>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
             <Heart className="w-8 h-8 text-gray-300" />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-2">Your watchlist is empty</h3>
           <p className="text-gray-500 mb-6">Start saving lots to track availability and price changes.</p>
           <button 
             onClick={onBack}
             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
           >
             Browse Inventory
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isSaved={true} 
              onToggleSaved={onToggleSaved} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
