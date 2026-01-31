import React, { useState, useEffect } from 'react';
import { type Product, ORIGIN_FLAGS, ORIGIN_NAMES, type Grade } from '../types';
import { ShoppingCart, Signal, Star, Plus, Minus, Cpu, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  product: Product;
  isSaved?: boolean;
  onToggleSaved?: (id: string) => void;
  onClick?: () => void; // Open Terminal
  onQuickAdd?: () => void; // Add to Cart directly
}

// Mock variants
const COLORS = ['Deep Purple', 'Space Black', 'Gold', 'Silver'];
const STORAGE = ['128GB', '256GB', '512GB'];
const SIM_TYPES = ['Dual SIM', 'Physical + eSIM', 'eSIM Only'];

export const ProductCard: React.FC<Props> = ({ product, isSaved = false, onToggleSaved, onClick, onQuickAdd }) => {
  const { t } = useLanguage();
  const [qty, setQty] = useState(5); // Default MOQ
  
  // Selection State
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedStorage, setSelectedStorage] = useState(product.storage);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(product.grade);
  const [selectedSim, setSelectedSim] = useState(product.simType);
  const [currentPrice, setCurrentPrice] = useState(product.priceUsd);

  // Update price based on grade/storage logic (Simulation)
  useEffect(() => {
    let priceModifier = 0;
    
    // Grade Logic
    if (selectedGrade === 'Brand New') priceModifier += 100;
    if (selectedGrade === 'Refurb A') priceModifier += 0; // Base
    if (selectedGrade === 'Refurb B') priceModifier -= 40;
    if (selectedGrade === 'Refurb C') priceModifier -= 80;
    if (selectedGrade === 'Refurb D') priceModifier -= 120;

    // Storage Logic
    if (selectedStorage === '256GB') priceModifier += 50;
    if (selectedStorage === '512GB') priceModifier += 110;
    
    // Sim Logic
    if (selectedSim === 'Dual SIM') priceModifier += 20;

    setCurrentPrice(product.priceUsd + priceModifier);
  }, [selectedGrade, selectedStorage, selectedSim]);

  const handleQtyChange = (delta: number) => {
    const newQty = qty + delta;
    if (newQty >= 5 && newQty <= product.stock) {
      setQty(newQty);
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group relative cursor-pointer"
      onClick={onClick}
    >
      
      {/* Watchlist Star */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleSaved?.(product.id);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm border border-gray-100 transition-all hover:scale-110"
      >
        <Star className={`w-5 h-5 ${isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`} />
      </button>

      {/* Origin Badge Only - No Image */}
      <div className="relative p-4 flex items-center justify-between border-b border-gray-100 bg-gray-50">
        <div className="flex items-center space-x-2 bg-white border border-gray-200 shadow-sm rounded-lg px-2.5 py-1.5">
            <img 
              src={`https://flagcdn.com/w20/${ORIGIN_FLAGS[product.origin]}.png`} 
              alt={product.origin} 
              className="w-5 h-auto rounded-[2px]"
            />
            <span className="text-xs font-bold text-gray-800 tracking-tight">
              {ORIGIN_NAMES[product.origin]}
            </span>
        </div>
        <span className="text-[10px] font-mono text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
              {product.modelNumber}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col bg-white">
        
        {/* Header Details */}
        <div className="mb-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.brand} {product.model}</h3>
          </div>
          
          <div className="flex flex-wrap gap-2 text-[10px] text-green-600 font-medium mb-3">
             <span className="flex items-center bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
               <Signal className="w-3 h-3 mr-1" /> Verified Stock
             </span>
          </div>

          {/* Variants */}
          <div className="space-y-2.5 mb-4" onClick={(e) => e.stopPropagation()}>
             {/* Grade Selector */}
             <div className="flex items-center space-x-2">
                 <button
                    onClick={() => setSelectedGrade('Brand New')}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded border transition-colors ${
                      selectedGrade === 'Brand New' 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    New
                  </button>
                  
                  {/* Grade Options */}
                  <div className={`flex-1 grid grid-cols-4 gap-1 ${selectedGrade === 'Brand New' ? 'opacity-40' : ''}`}>
                    {['Refurb A', 'Refurb B', 'Refurb C', 'Refurb D'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGrade(g as Grade)}
                        className={`text-[10px] font-bold py-1.5 rounded border transition-colors ${
                          selectedGrade === g 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                        }`}
                      >
                        {g.replace('Refurb ', '')}
                      </button>
                    ))}
                  </div>
             </div>

             {/* SIM Type Selector */}
             <div className="relative">
                <select 
                  value={selectedSim}
                  onChange={(e) => setSelectedSim(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded px-2 py-1.5 text-gray-700 font-medium focus:ring-1 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                >
                  {SIM_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <Cpu className="w-3 h-3 text-gray-400 absolute right-2 top-2 pointer-events-none" />
             </div>

             <div className="flex gap-2">
                {/* Storage Selector */}
                <select 
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="bg-white border border-gray-200 text-xs rounded px-2 py-1.5 text-gray-700 font-medium focus:ring-1 focus:ring-blue-500 outline-none w-1/2 cursor-pointer"
                >
                  {STORAGE.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Color Selector */}
                <select 
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-white border border-gray-200 text-xs rounded px-2 py-1.5 text-gray-700 font-medium focus:ring-1 focus:ring-blue-500 outline-none w-1/2 cursor-pointer"
                >
                  {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
             </div>
          </div>
        </div>

        {/* Price & Stock */}
        <div className="flex items-end justify-between mb-3 mt-auto border-t border-gray-100 pt-4">
          <div>
            <p className="text-[11px] text-gray-500 uppercase font-semibold tracking-wide mb-1">Wholesale Price</p>
            <span className="text-3xl font-black text-gray-900 tracking-tight">${currentPrice}</span>
          </div>
          <div className="text-right">
             <p className="text-[10px] text-green-600 font-bold mb-1">✓ {product.stock} units available</p>
             <div className="flex items-center bg-white border-2 border-gray-200 rounded-lg h-8 shadow-sm" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={() => handleQtyChange(-1)}
                  className="px-3 h-full hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors font-bold"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-bold text-gray-900">{qty}</span>
                <button 
                  onClick={() => handleQtyChange(1)}
                  className="px-3 h-full hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors font-bold"
                >
                  +
                </button>
             </div>
          </div>
        </div>
        
        <button 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-b-2xl transition-all shadow-sm flex items-center justify-center text-sm group-hover:bg-yellow-500 group-hover:text-gray-900 cursor-pointer"
          onClick={(e) => {
             e.stopPropagation();
             onQuickAdd?.();
          }}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {t('product.add_cart')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
