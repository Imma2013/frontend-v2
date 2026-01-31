import React, { useState, useRef, useEffect } from 'react';
import { type Product, ORIGIN_NAMES } from '../types';
import { X, CheckCircle, Truck, Battery, Cpu, Smartphone, ShoppingCart, ChevronLeft, Star, Heart, Share2, Info, Package } from 'lucide-react';
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

export const ProductDetailModal: React.FC<Props> = ({ product, onClose, onAddToCart, onAiSearch }) => {
  const [qty, setQty] = useState(5);
  const gallery = [product.imageUrl];

  const specs = [
    { label: 'Processor', value: 'A-Series Bionic', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Network', value: 'Unlocked / Global', icon: <Smartphone className="w-4 h-4" /> },
    { label: 'Battery', value: '85%+ Guaranteed', icon: <Battery className="w-4 h-4" /> },
    { label: 'Packaging', value: 'Bulk / White Box', icon: <Package className="w-4 h-4" /> },
  ];

  const [messages, setMessages] = useState<TerminalMessage[]>([
    { id: '0', sender: 'system', text: `Connected to Cryzo Data Hub` },
    { id: '1', sender: 'ai', text: `Analyzing stock for ${product.model}. How can I assist with your wholesale order?` }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'system', text: `Added ${qty} units to order.` }]);
  };

  const handleAiCommand = (query: string, model: string) => {
    onAiSearch(query, model);
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: query }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: "Processing your request with Cryzo AI..." }]);
    }, 600);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 md:p-10 bg-black/70 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="relative w-full max-w-6xl bg-white h-full max-h-[90vh] shadow-2xl rounded-3xl overflow-hidden flex flex-col md:row border border-gray-200">
        
        {/* Detail Side */}
        <div className="flex-1 bg-white border-r border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-gray-50 bg-white sticky top-0 z-10">
            <button onClick={onClose} className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" /> Back to Inventory
            </button>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 className="w-5 h-5 text-gray-400" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Heart className="w-5 h-5 text-gray-400" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="mb-8">
               <span className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">{product.brand}</span>
               <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">{product.model}</h2>
               <div className="flex items-center space-x-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-sm font-bold text-gray-400">Verified Batch #{product.modelNumber}</span>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 text-blue-600">
                      {spec.icon}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">{spec.label}</span>
                      <span className="text-sm font-bold text-gray-800 leading-tight">{spec.value}</span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 space-y-4">
               <div className="flex items-center text-blue-800 text-sm font-bold">
                 <Truck className="w-5 h-5 mr-3 text-blue-500" /> Logistics: USA Hub to Global via FedEx Priority
               </div>
               <div className="flex items-center text-blue-800 text-sm font-bold">
                 <CheckCircle className="w-5 h-5 mr-3 text-blue-500" /> 100% Secure B2B Escrow Transaction
               </div>
            </div>
          </div>
        </div>

        {/* Order Side */}
        <div className="w-full md:w-[400px] bg-gray-50 flex flex-col shrink-0">
          <div className="p-8 flex-1 overflow-y-auto">
            <h4 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest">Order Configuration</h4>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6 mb-6">
                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Selected Specs</span>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-black text-gray-800">{product.storage} | {product.grade}</span>
                        <span className="text-xs font-bold text-green-600">In Stock</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Unit Price</span>
                            <span className="text-3xl font-black text-gray-900">${product.priceUsd}</span>
                        </div>
                        <div className="text-right">
                             <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button onClick={() => setQty(Math.max(5, qty - 1))} className="w-8 h-8 flex items-center justify-center font-bold text-lg hover:text-blue-600 transition-colors">−</button>
                                <span className="w-8 text-center text-sm font-black text-gray-900">{qty}</span>
                                <button onClick={() => setQty(qty + 1)} className="w-8 h-8 flex items-center justify-center font-bold text-lg hover:text-blue-600 transition-colors">+</button>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-gray-500">Total Amount</span>
                        <span className="text-xl font-black text-blue-600">${(product.priceUsd * qty).toLocaleString()}</span>
                    </div>
                    <button 
                        onClick={handleAdd}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Place Order
                    </button>
                </div>
            </div>
          </div>

          {/* AI Terminal */}
          <div className="p-4 bg-gray-900 border-t border-gray-800">
             <div className="h-40 overflow-y-auto mb-4 custom-scrollbar-dark p-2 font-mono text-[10px] space-y-2">
                {messages.map(m => (
                  <div key={m.id} className={`${m.sender === 'user' ? 'text-indigo-400 text-right' : m.sender === 'ai' ? 'text-emerald-400' : 'text-gray-500 italic'}`}>
                    <span className="opacity-50">{m.sender === 'user' ? '> ' : m.sender === 'ai' ? 'Cryzo: ' : '# '}</span>
                    {m.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
             </div>
             <AiSearchBar 
               onSearch={handleAiCommand} 
               isSearching={false} 
               variant="terminal" 
               placeholder="Ask Cryzo for data..." 
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
