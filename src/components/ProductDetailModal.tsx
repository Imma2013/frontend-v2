import React, { useState } from 'react';
import { type Product } from '../types';
import { X, CheckCircle, Truck, Battery, Cpu, Smartphone, ShoppingCart, Star, Heart, Package, ChevronLeft, Shield } from 'lucide-react';

// Get product image based on model name
const getProductImage = (model: string): string => {
  const lowerModel = model.toLowerCase();
  if (lowerModel.includes('ipad')) return '/images/ipad.jpg';
  if ((lowerModel.includes('15') || lowerModel.includes('16')) && lowerModel.includes('pro')) return '/images/iphone-pro.jpg';
  if (lowerModel.includes('14') && lowerModel.includes('pro')) return '/images/iphone-14-pro.jpg';
  if (lowerModel.includes('14')) return '/images/iphone-14.jpg';
  if (lowerModel.includes('13')) return '/images/iphone-13.jpg';
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
  const availableStorages = [...new Set(variations.map(v => v.storage))];
  const availableColors = [...new Set(variations.map(v => v.color))];
  const availableGrades = [...new Set(variations.map(v => v.grade))];

  const [qty, setQty] = useState(1);
  const [selectedStorage, setSelectedStorage] = useState(availableStorages[0] || product.storage);
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || product.color || 'Black');
  const [selectedGrade, setSelectedGrade] = useState(availableGrades[0] || product.grade);

  const currentVariation = variations.find(v =>
    v.storage === selectedStorage && v.color === selectedColor
  ) || variations[0];

  const currentPrice = currentVariation?.price || product.priceUsd;
  const currentStock = currentVariation?.stock || product.stock;
  const isIPad = product.model.toLowerCase().includes('ipad');

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
      className="fixed inset-0 z-[100] bg-gray-950 md:bg-black/80 md:backdrop-blur-sm md:flex md:justify-center md:items-center md:p-10"
      onClick={onClose}
    >
      {/* Mobile: Full screen scrollable | Desktop: Modal */}
      <div
        className="h-full w-full md:relative md:w-full md:max-w-2xl md:max-h-[90vh] md:rounded-3xl bg-gray-950 md:border md:border-white/10 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur-sm border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSaved?.(product.id)}
              className={`p-2 rounded-xl transition-colors ${isSaved ? 'bg-pink-500/20 text-pink-400' : 'text-gray-500 hover:text-white'}`}
            >
              <Heart className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900">
          <img
            src={getProductImage(product.model)}
            alt={product.model}
            className="w-full h-64 md:h-80 object-contain p-4"
          />
        </div>

        {/* Content */}
        <div className="px-5 py-6 space-y-6">
          {/* Title & Rating */}
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{product.brand}</span>
            <h1 className="text-2xl font-black text-white mt-1">{product.model}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <span className="text-xs text-gray-500">Verified Quality</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${currentStock > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">${currentPrice}</span>
            <span className="text-sm text-gray-500">per unit</span>
          </div>

          {/* Configuration */}
          <div className="space-y-4">
            {/* Storage */}
            {availableStorages.length > 0 && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Storage</label>
                <div className="flex flex-wrap gap-2">
                  {availableStorages.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedStorage(s)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                        selectedStorage === s
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-white/10 text-gray-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color */}
            {availableColors.length > 0 && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                        selectedColor === c
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-white/10 text-gray-400'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Grade */}
            {availableGrades.length > 0 && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Condition</label>
                <div className="flex flex-wrap gap-2">
                  {availableGrades.map(g => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                        selectedGrade === g
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                          : 'border-white/10 text-gray-400'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-400">Quantity</span>
              <div className="flex items-center bg-gray-900 border border-white/10 rounded-xl">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-400 hover:text-cyan-400"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-white">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(currentStock, qty + 1))}
                  className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-400 hover:text-cyan-400"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-sm text-gray-400">Total</span>
              <span className="text-2xl font-black text-cyan-400">${(currentPrice * qty).toLocaleString()}</span>
            </div>

            <button
              onClick={handleAdd}
              disabled={currentStock === 0}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 disabled:from-gray-700 disabled:to-gray-700 text-gray-950 disabled:text-gray-500 font-black py-4 rounded-xl transition-all flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {currentStock > 0 ? 'Add to Order' : 'Out of Stock'}
            </button>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Processor</span>
                <span className="text-xs font-bold text-white">A-Series Bionic</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Smartphone className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Connectivity</span>
                <span className="text-xs font-bold text-white">{isIPad ? 'WiFi Only' : 'eSIM'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Battery className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Battery</span>
                <span className="text-xs font-bold text-white">85%+ Health</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <Package className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Packaging</span>
                <span className="text-xs font-bold text-white">White Box</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3 text-cyan-400">
              <Truck className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Ships worldwide via DHL/FedEx (3-6 days)</span>
            </div>
            <div className="flex items-center gap-3 text-cyan-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Secure checkout via Stripe</span>
            </div>
            <div className="flex items-center gap-3 text-cyan-400">
              <Shield className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Quality guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
