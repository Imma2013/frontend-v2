import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Product, ORIGIN_FLAGS, ORIGIN_NAMES, type Grade } from '../types';
import {
  Signal,
  ShieldCheck,
  Package,
  Plus,
  Minus,
  Heart,
  Bookmark,
  ArrowUpRight,
  Cpu
} from 'lucide-react';

interface Props {
  product: Product;
  isSaved?: boolean;
  onToggleSaved?: (id: string) => void;
  onClick?: () => void;
  onQuickAdd?: (qty: number) => void;
}

const ALL_STORAGE_OPTIONS = ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];
const ALL_GRADE_OPTIONS: Grade[] = ['Brand New', 'A2', 'A1', 'B1', 'B1 (Low Batt)', 'B2', 'Refurb A', 'Refurb B', 'Refurb C'];
const ALL_COLOR_OPTIONS = ['Black', 'White', 'Blue', 'Purple', 'Gold', 'Silver', 'Green', 'Red', 'Pink', 'Space Gray'];

// Grade color mapping
const gradeColors: Record<Grade, { bg: string; text: string; border: string }> = {
  'Brand New': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'Refurb A': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  'Refurb B': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Refurb C': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  'Refurb D': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
};

// Origin flag mapping
const originFlags: Record<string, string> = {
  US: '🇺🇸',
  JP: '🇯🇵',
  HK: '🇭🇰',
  EU: '🇪🇺',
  AU: '🇦🇺',
  CA: '🇨🇦',
};

export const ProductCard: React.FC<Props> = ({
  product,
  isSaved = false,
  onToggleSaved,
  onClick,
  onQuickAdd
}) => {
  const variations = product.variations || [];

  // Get available options from variations
  const availableStorages = [...new Set(variations.map(v => v.storage))];
  const availableGrades = [...new Set(variations.map(v => v.grade))];
  const availableColors = [...new Set(variations.map(v => v.color))];

  const [qty, setQty] = useState(5);
  const [selectedStorage, setSelectedStorage] = useState(product.storage);
  const [selectedGrade, setSelectedGrade] = useState<string>(variations[0]?.grade || product.grade);
  const [selectedColor, setSelectedColor] = useState(variations[0]?.color || product.color || 'Black');
  const [currentPrice, setCurrentPrice] = useState(product.priceUsd);
  const [currentStock, setCurrentStock] = useState(product.stock);
  const [isHovered, setIsHovered] = useState(false);

  // Find matching variation and update price/stock
  useEffect(() => {
    if (variations.length > 0) {
      const match = variations.find(v =>
        v.storage === selectedStorage &&
        v.grade === selectedGrade &&
        v.color === selectedColor
      ) || variations.find(v =>
        v.storage === selectedStorage && v.color === selectedColor
      ) || variations.find(v =>
        v.color === selectedColor
      ) || variations[0];

      if (match) {
        setCurrentPrice(match.price);
        setCurrentStock(match.stock);
      }
    }
  }, [selectedStorage, selectedGrade, selectedColor, variations]);

  // Get stock for a specific option
  const getStockForOption = (type: 'storage' | 'grade' | 'color', value: string) => {
    const matching = variations.filter(v => v[type] === value);
    return matching.reduce((sum, v) => sum + (v.stock || 0), 0);
  };

  const lotTotal = currentPrice * qty;
  const gradeStyle = gradeColors[selectedGrade] || gradeColors['Refurb A'];

  return (
    <motion.div
      className="relative bg-gray-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="relative p-4 border-b border-white/5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Brand icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-0.5">
                {product.brand}
              </span>
              <h3 className="text-sm font-bold text-white leading-tight">{product.model}</h3>
            </div>
          </div>

          {/* Origin & Save */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
              <span className="text-sm">{originFlags[product.origin] || '🌍'}</span>
              <span className="text-[10px] font-bold text-gray-400">{product.origin}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSaved?.(product.id);
              }}
              className={`p-2 rounded-lg transition-all ${
                isSaved
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'bg-white/5 text-gray-500 hover:text-cyan-400 hover:bg-white/10'
              }`}
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${gradeStyle.bg} ${gradeStyle.text} ${gradeStyle.border}`}>
            <ShieldCheck className="w-3 h-3" />
            {selectedGrade}
          </span>
          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${
            currentStock > 0
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              : 'text-red-400 bg-red-500/10 border-red-500/20'
          }`}>
            <Signal className="w-3 h-3" />
            {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
        {/* Variant selectors - Shows only available options with stock */}
        <div className="grid grid-cols-3 gap-3">
          {/* Storage */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Storage</label>
            <select
              value={selectedStorage}
              onChange={(e) => setSelectedStorage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-lg px-2 py-2 focus:outline-none focus:border-cyan-500/50 cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em', paddingRight: '2rem' }}
            >
              {(availableStorages.length > 0 ? availableStorages : [product.storage]).map((s) => {
                const stock = getStockForOption('storage', s);
                return (
                  <option key={s} value={s} className="bg-gray-900">
                    {s} {stock > 0 ? `(${stock})` : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Grade */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-lg px-2 py-2 focus:outline-none focus:border-cyan-500/50 cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em', paddingRight: '2rem' }}
            >
              {(availableGrades.length > 0 ? availableGrades : [product.grade]).map((g) => (
                <option key={g} value={g} className="bg-gray-900">{g}</option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-lg px-2 py-2 focus:outline-none focus:border-cyan-500/50 cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em', paddingRight: '2rem' }}
            >
              {(availableColors.length > 0 ? availableColors : [product.color || 'Black']).map((c) => {
                const stock = getStockForOption('color', c);
                return (
                  <option key={c} value={c} className="bg-gray-900">
                    {c} {stock > 0 ? `(${stock})` : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-end justify-between pt-3 border-t border-white/5">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Unit Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">${currentPrice}</span>
              <span className="text-xs text-gray-500">USD</span>
            </div>
          </div>

          {/* Quantity control */}
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1 text-right">Quantity</span>
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setQty(Math.max(5, qty - 1))}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold text-white">{qty}</span>
              <button
                onClick={() => setQty(Math.min(currentStock, qty + 1))}
                disabled={currentStock === 0}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lot total */}
        <div className="flex items-center justify-between py-2 px-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
          <span className="text-xs font-semibold text-gray-400">Lot Total ({qty} units)</span>
          <span className="text-lg font-black text-cyan-400">${lotTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 p-4 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          View Details
          <ArrowUpRight className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd?.(qty);
          }}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-gray-950 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30"
        >
          <Package className="w-4 h-4" />
          Add to Order
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
