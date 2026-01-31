import React, { useState, useEffect } from 'react';
import { type Product, ORIGIN_FLAGS, ORIGIN_NAMES, type Grade } from '../types';
import { ShoppingCart, Signal, ShieldCheck, Box, Package, Cpu, ArrowRight } from 'lucide-react';

interface Props {
  product: Product;
  isSaved?: boolean;
  onToggleSaved?: (id: string) => void;
  onClick?: () => void;
  onQuickAdd?: (qty: number) => void;
}

const STORAGE_OPTIONS = ['128GB', '256GB', '512GB', '1TB'];
const GRADE_OPTIONS: Grade[] = ['Brand New', 'Refurb A', 'Refurb B', 'Refurb C', 'Refurb D'];

export const ProductCard: React.FC<Props> = ({ product, onClick, onQuickAdd }) => {
  const [qty, setQty] = useState(5);
  const [selectedStorage, setSelectedStorage] = useState(product.storage);
  const [selectedGrade, setSelectedGrade] = useState<Grade>(product.grade);
  const [currentPrice, setCurrentPrice] = useState(product.priceUsd);

  // Simple price simulation based on storage/grade
  useEffect(() => {
    let modifier = 0;
    if (selectedStorage === '256GB') modifier += 50;
    if (selectedStorage === '512GB') modifier += 120;
    if (selectedStorage === '1TB') modifier += 250;

    if (selectedGrade === 'Brand New') modifier += 100;
    if (selectedGrade === 'Refurb B') modifier -= 40;
    if (selectedGrade === 'Refurb C') modifier -= 80;
    
    setCurrentPrice(product.priceUsd + modifier);
  }, [selectedStorage, selectedGrade, product.priceUsd]);

  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
      onClick={onClick}
    >
      {/* Header Info */}
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-start">
        <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
                <Box className="w-4 h-4" />
            </div>
            <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block leading-none mb-1">
                    {product.brand}
                </span>
                <h3 className="text-sm font-bold text-gray-900 leading-none">{product.model}</h3>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1 bg-white border border-gray-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700">
                <img src={`https://flagcdn.com/w20/us.png`} alt="US" className="w-3 h-auto" />
                <span>US HUB</span>
            </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col space-y-4">
        {/* Verification Badges */}
        <div className="flex flex-wrap gap-2">
            <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                <Signal className="w-3 h-3 mr-1" /> Active Stock
            </span>
            <span className="flex items-center text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                <ShieldCheck className="w-3 h-3 mr-1" /> Inspected
            </span>
        </div>

        {/* Technical Data Grid */}
        <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Capacity</label>
                <select 
                    value={selectedStorage}
                    onChange={(e) => setSelectedStorage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-xs font-bold rounded p-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                    {STORAGE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Grade</label>
                <select 
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value as Grade)}
                    className="w-full bg-gray-50 border border-gray-200 text-xs font-bold rounded p-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                    {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
            </div>
        </div>

        {/* Pricing Section */}
        <div className="pt-2 mt-auto border-t border-gray-100">
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Unit Cost</span>
                    <div className="flex items-baseline space-x-1">
                        <span className="text-2xl font-black text-gray-900">${currentPrice}</span>
                        <span className="text-[10px] font-bold text-gray-400">USD</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">Lot Quantity</span>
                    <div className="flex items-center bg-gray-100 rounded-lg p-1" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setQty(Math.max(5, qty - 1))} className="w-6 h-6 flex items-center justify-center hover:text-blue-600 transition-colors">
                            <span className="font-bold text-lg">−</span>
                        </button>
                        <span className="w-8 text-center text-xs font-black text-gray-900">{qty}</span>
                        <button onClick={() => setQty(Math.min(lotStock(product.stock), qty + 1))} className="w-6 h-6 flex items-center justify-center hover:text-blue-600 transition-colors">
                            <span className="font-bold text-lg">+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={(e) => {
            e.stopPropagation();
            onQuickAdd?.(qty);
        }}
        className="w-full bg-gray-900 text-white font-bold py-3 text-xs uppercase tracking-widest flex items-center justify-center space-x-2 group-hover:bg-blue-600 transition-colors"
      >
        <Package className="w-4 h-4" />
        <span>Add to Order</span>
      </button>
    </div>
  );
};

const lotStock = (stock: number) => stock > 0 ? stock : 0;

export default ProductCard;
