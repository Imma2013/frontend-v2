import React, { useState } from 'react';
import { type Product } from '../types';
import { X, CheckCircle, Truck, Battery, Cpu, Smartphone, ShoppingCart, Star, Heart, Package, ChevronLeft } from 'lucide-react';

// Get product image based on model name
const getProductImage = (model: string): string => {
  const lowerModel = model.toLowerCase();

  // iPads
  if (lowerModel.includes('ipad')) {
    return '/images/ipad.jpg';
  }

  // iPhone 15/16 Pro models
  if ((lowerModel.includes('15') || lowerModel.includes('16')) && lowerModel.includes('pro')) {
    return '/images/iphone-pro.jpg';
  }

  // iPhone 14 Pro models
  if (lowerModel.includes('14') && lowerModel.includes('pro')) {
    return '/images/iphone-14-pro.jpg';
  }

  // iPhone 14 (non-Pro)
  if (lowerModel.includes('14')) {
    return '/images/iphone-14.jpg';
  }

  // iPhone 13 models
  if (lowerModel.includes('13')) {
    return '/images/iphone-13.jpg';
  }

  // Default fallback
  return '/images/iphone-pro.jpg';
};

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
  onViewCart: () => void;
  onAiSearch?: (query: string, model: string) => void;
  isSaved?: boolean;
  onToggleSaved?: (id: string) => void;
}

export const ProductDetailModal: React.FC<Props> = ({ product, onClose, onAddToCart, isSaved = false, onToggleSaved }) => {
  const variations = product.variations || [];

  // Get available options from actual variations
  const availableStorages = [...new Set(variations.map(v => v.storage))];
  const availableColors = [...new Set(variations.map(v => v.color))];
  const availableGrades = [...new Set(variations.map(v => v.grade))];

  const [qty, setQty] = useState(1);
  const [selectedStorage, setSelectedStorage] = useState(availableStorages[0] || product.storage);
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || product.color || 'Black');
  const [selectedGrade, setSelectedGrade] = useState(availableGrades[0] || product.grade);

  // Find current variation
  const currentVariation = variations.find(v =>
    v.storage === selectedStorage && v.color === selectedColor
  ) || variations[0];

  const currentPrice = currentVariation?.price || product.priceUsd;
  const currentStock = currentVariation?.stock || product.stock;

  const isIPad = product.model.toLowerCase().includes('ipad');
  const specs = [
    { label: 'Processor', value: 'A-Series Bionic', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Connectivity', value: isIPad ? 'WiFi Only' : 'eSIM Unlocked', icon: <Smartphone className="w-4 h-4" /> },
    { label: 'Battery', value: '85%+ Guaranteed', icon: <Battery className="w-4 h-4" /> },
    { label: 'Packaging', value: 'White Box', icon: <Package className="w-4 h-4" /> },
  ];

  const handleAdd = () => {
    onAddToCart({
      ...product,
      storage: selectedStorage,
      grade: selectedGrade,
      color: selectedColor,
      priceUsd: currentPrice,
      stock: currentStock,
    }, qty);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center items-center p-4 md:p-10 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-gray-950 max-h-[90vh] shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Detail Side */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-white/5 bg-gray-950 sticky top-0 z-10">
            <button onClick={onClose} className="flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" /> Back to Inventory
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleSaved?.(product.id)}
                className={`p-2 rounded-xl transition-colors ${isSaved ? 'bg-pink-500/20 text-pink-400' : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}
              >
                <Heart className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative h-56 md:h-72 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <img
              src={getProductImage(product.model)}
              alt={product.model}
              className="w-full h-full object-contain p-4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {/* Title */}
            <div className="mb-8">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-widest block mb-2">{product.brand}</span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">{product.model}</h2>
              <div className="flex items-center gap-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm font-medium text-gray-500">Verified Quality</span>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="space-y-6 mb-8">
              {/* Storage */}
              {availableStorages.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Storage</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableStorages.map(s => {
                      const stockForStorage = variations.filter(v => v.storage === s).reduce((sum, v) => sum + v.stock, 0);
                      return (
                        <button
                          key={s}
                          onClick={() => setSelectedStorage(s)}
                          className={`px-5 py-2.5 rounded-xl border-2 font-bold transition-all ${
                            selectedStorage === s
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                              : 'border-white/10 hover:border-white/20 text-gray-400'
                          }`}
                        >
                          {s}
                          <span className="ml-2 text-xs opacity-60">({stockForStorage})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color */}
              {availableColors.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map(c => {
                      const stockForColor = variations.filter(v => v.color === c && v.storage === selectedStorage).reduce((sum, v) => sum + v.stock, 0);
                      return (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-5 py-2.5 rounded-xl border-2 font-bold transition-all ${
                            selectedColor === c
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                              : 'border-white/10 hover:border-white/20 text-gray-400'
                          }`}
                        >
                          {c}
                          <span className="ml-2 text-xs opacity-60">({stockForColor})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grade */}
              {availableGrades.length > 0 && (
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Grade</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableGrades.map(g => (
                      <button
                        key={g}
                        onClick={() => setSelectedGrade(g)}
                        className={`px-5 py-2.5 rounded-xl border-2 font-bold transition-all ${
                          selectedGrade === g
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                            : 'border-white/10 hover:border-white/20 text-gray-400'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center mr-3 text-cyan-400">
                    {spec.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">{spec.label}</span>
                    <span className="text-sm font-bold text-white">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Info */}
            <div className="p-5 bg-cyan-500/5 rounded-2xl border border-cyan-500/10 space-y-3">
              <div className="flex items-center text-cyan-400 text-sm font-medium">
                <Truck className="w-5 h-5 mr-3" />
                Worldwide shipping: 3-6 business days via DHL/FedEx
              </div>
              <div className="flex items-center text-cyan-400 text-sm font-medium">
                <CheckCircle className="w-5 h-5 mr-3" />
                Secure payment via Stripe
              </div>
            </div>
          </div>
        </div>

        {/* Order Side */}
        <div className="w-full md:w-[380px] bg-white/5 border-l border-white/5 flex flex-col">
          <div className="p-6 flex-1">
            <h4 className="text-sm font-black text-white mb-6 uppercase tracking-widest">Order Configuration</h4>

            <div className="bg-gray-900 rounded-2xl p-6 border border-white/10 space-y-5">
              {/* Selected Specs */}
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Selected</span>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-white">{selectedStorage} | {selectedGrade} | {selectedColor}</span>
                  <span className={`text-xs font-bold ${currentStock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currentStock > 0 ? `${currentStock} In Stock` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Unit Price</span>
                    <span className="text-3xl font-black text-white">${currentPrice}</span>
                  </div>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-9 h-9 flex items-center justify-center font-bold text-lg text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-black text-white">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(currentStock, qty + 1))}
                      className="w-9 h-9 flex items-center justify-center font-bold text-lg text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm font-bold text-gray-400">Total Amount</span>
                  <span className="text-2xl font-black text-cyan-400">${(currentPrice * qty).toLocaleString()}</span>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={currentStock === 0}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 disabled:from-gray-600 disabled:to-gray-700 text-gray-950 disabled:text-gray-400 font-black py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {currentStock > 0 ? 'Add to Order' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
