import React, { useState, useRef, useEffect } from 'react';
import { type Product, ORIGIN_FLAGS, ORIGIN_NAMES } from '../types';
import { X, CheckCircle, Truck, Battery, Cpu, Smartphone, AlertCircle, ShoppingCart, ArrowRight, ChevronLeft, Star, Heart, Share2, Info } from 'lucide-react';
import { AiSearchBar } from './AiSearchBar';

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
  onViewCart: () => void;
  onAiSearch: (query: string, model: string) => void;
}

interface TerminalMessage {
  id: string;
  sender: 'user' | 'system' | 'ai';
  text: string;
}

export const ProductDetailModal: React.FC<Props> = ({ product, onClose, onAddToCart, onViewCart, onAiSearch }) => {
  const [qty, setQty] = useState(5); // Default MOQ
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];

  // Technical Specs Simulation
  const specs = [
    { label: 'Processor', value: 'A-Series Bionic Chip', icon: <Cpu className="w-4 h-4" /> },
    { label: 'SIM Config', value: product.simType || 'Dual SIM', icon: <Smartphone className="w-4 h-4" /> },
    { label: 'Battery', value: product.grade === 'Brand New' ? '100% (New)' : '85%+ Guaranteed', icon: <Battery className="w-4 h-4" /> },
    { label: 'In the box', value: 'Device Only (White Label Box)', icon: <Info className="w-4 h-4" /> },
  ];

  // Terminal Chat State
  const [messages, setMessages] = useState<TerminalMessage[]>([
    { id: '0', sender: 'system', text: `Node connected: ${product.origin}-STOCK-DB` },
    { id: '1', sender: 'ai', text: `Ready to assist with ${product.model}. I can calculate ROI, check shipping times, or add to cart.` }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'system', text: `> Manifest updated: ${qty} units added.` }]);
  };

  const handleAiCommand = (query: string, model: string) => {
    onAiSearch(query, model);
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: query }]);
    setTimeout(() => {
      let response = '';
      const lower = query.toLowerCase();
      if (lower.includes('add') || lower.includes('buy')) {
        onAddToCart(product, qty);
        response = `Success: ${qty} units added to order.`;
      } else if (lower.includes('profit') || lower.includes('margin') || lower.includes('roi')) {
        response = `Based on current market data for ${product.model}, est. ROI is 37% with a net profit of ~$500 per unit in Dubai.`;
      } else {
        response = `I've analyzed your request. I can help with logistics, bulk pricing, or technical verification.`;
      }
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: response }]);
    }, 600);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 md:p-10 bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-6xl bg-white h-full max-h-[90vh] shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row border border-gray-200">
        
        {/* Left Side: Images & Actions */}
        <div className="flex-1 bg-white border-r border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-white sticky top-0 z-10">
            <button onClick={onClose} className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" /> Back to Results
            </button>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 className="w-5 h-5 text-gray-400" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Heart className="w-5 h-5 text-gray-400" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {/* Image Gallery */}
            <div className="relative aspect-[4/3] bg-gray-50 rounded-2xl p-8 flex items-center justify-center border border-gray-100 mb-8 overflow-hidden group">
              <img src={gallery[activeImageIndex]} alt={product.model} className="h-full object-contain group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mb-12 justify-center">
              {gallery.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl border-2 p-1 transition-all ${
                    activeImageIndex === idx ? 'border-blue-500 ring-2 ring-blue-100 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Technical Specifications */}
            <div className="mb-12">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:border-blue-200 group">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-gray-400 group-hover:text-blue-500 transition-colors">
                      {spec.icon}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">{spec.label}</span>
                      <span className="text-sm font-bold text-gray-800 leading-tight">{spec.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Summary */}
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex flex-wrap gap-6 justify-between items-center">
               <div className="flex items-center text-blue-800 text-sm font-bold">
                 <Truck className="w-5 h-5 mr-2 text-blue-500" /> Ships from {ORIGIN_NAMES[product.origin]} via FedEx Priority
               </div>
               <div className="flex items-center text-blue-800 text-sm font-bold">
                 <CheckCircle className="w-5 h-5 mr-2 text-blue-500" /> Secure B2B Transaction (Escrow Available)
               </div>
               <div className="flex items-center text-blue-800 text-sm font-bold">
                 <Info className="w-5 h-5 mr-2 text-blue-500" /> Customs Clearance Support Included
               </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Panel & AI */}
        <div className="w-full md:w-[400px] bg-white flex flex-col shrink-0">
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
               <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">{product.brand}</span>
               <span className="text-xs font-mono text-gray-400">ID: {product.id.substring(0,6)}</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{product.model} - {product.storage} - {product.color}</h2>
            
            <div className="flex items-center space-x-2 mb-6">
               <div className="flex text-yellow-400">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
               </div>
               <span className="text-sm font-bold text-gray-500">4.9 (Verified Batch)</span>
               <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-black border border-green-100 flex items-center">
                 <CheckCircle className="w-3 h-3 mr-1" /> In Stock at {ORIGIN_NAMES[product.origin]} Hub
               </span>
            </div>

            <div className="flex items-baseline space-x-2 mb-8 border-b border-gray-100 pb-8">
               <span className="text-4xl font-black text-gray-900">${product.priceUsd}</span>
               <span className="text-sm text-gray-500 font-bold">/ unit</span>
               <span className="text-[10px] text-gray-400 block mt-1 ml-auto">Bulk pricing available for orders &gt; 100 units</span>
            </div>

            <div className="space-y-6 mb-8">
               <div>
                 <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-3">Cosmetic Grade</h4>
                 <div className="grid grid-cols-4 gap-2">
                    {['Brand New', 'Refurb A', 'Refurb B', 'Refurb C'].map(g => (
                       <button key={g} className={`py-2 text-[10px] font-bold rounded-lg border-2 transition-all ${product.grade === g ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-100 text-gray-400'}`}>
                         {g === 'Brand New' ? 'Brand New' : g.split(' ')[1]}
                       </button>
                    ))}
                 </div>
               </div>

               <div>
                 <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-3">Storage Capacity</h4>
                 <div className="grid grid-cols-4 gap-2">
                    {['128GB', '256GB', '512GB', '1TB'].map(s => (
                       <button key={s} className={`py-2 text-[10px] font-bold rounded-lg border-2 transition-all ${product.storage === s ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-100 text-gray-400'}`}>
                         {s}
                       </button>
                    ))}
                 </div>
               </div>
            </div>

            {/* Order Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
               <h4 className="text-sm font-black text-gray-900 mb-4 tracking-tight">Order Summary</h4>
               <div className="space-y-3 mb-6">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500 font-medium">Price per unit</span>
                   <span className="font-bold text-gray-900">${product.priceUsd}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500 font-medium">Quantity</span>
                   <span className="font-bold text-gray-900">{qty}</span>
                 </div>
                 <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                   <span className="text-base font-black text-gray-900">Total</span>
                   <span className="text-2xl font-black text-gray-900">${(product.priceUsd * qty).toLocaleString()}</span>
                 </div>
               </div>

               <div className="flex items-center space-x-3 mb-4">
                 <div className="flex-1 flex items-center justify-between bg-white border border-gray-200 rounded-xl h-12 px-4 shadow-sm">
                   <button onClick={() => setQty(q => Math.max(5, q - 1))} className="text-gray-400 hover:text-blue-500 font-bold text-xl transition-colors">−</button>
                   <span className="font-black text-gray-900">{qty}</span>
                   <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-gray-400 hover:text-blue-500 font-bold text-xl transition-colors">+</button>
                 </div>
               </div>

               <button 
                 onClick={handleAdd}
                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black h-14 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm mb-3"
               >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Order
               </button>
            </div>

          </div>

          {/* AI Terminal Section */}
          <div className="p-4 bg-gray-900 border-t border-gray-800">
             <div className="h-32 overflow-y-auto mb-4 custom-scrollbar-dark p-2 font-mono text-[10px] space-y-2">
                {messages.map(m => (
                  <div key={m.id} className={`${m.sender === 'user' ? 'text-blue-400 text-right' : m.sender === 'ai' ? 'text-green-400' : 'text-gray-500 italic'}`}>
                    <span className="opacity-50">{m.sender === 'user' ? '> ' : m.sender === 'ai' ? 'AI: ' : '# '}</span>
                    {m.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
             </div>
             <AiSearchBar 
               onSearch={handleAiCommand} 
               isSearching={false} 
               variant="terminal" 
               placeholder="Ask Copilot for analysis..." 
             />
          </div>
        </div>

        {/* Close Button Mobile */}
        <button onClick={onClose} className="absolute top-4 right-4 md:hidden bg-white/80 p-2 rounded-full shadow-lg backdrop-blur-md">
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
