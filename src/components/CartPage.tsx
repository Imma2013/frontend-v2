import React from 'react';
import type { Product } from '../types';
import { Trash2, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle, MessageSquare, Loader2 } from 'lucide-react';

export interface CartItem extends Product {
  quantity: number;
}

interface Props {
  cartItems: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onBack: () => void;
  onCheckout: () => void;
  onItemClick: (item: CartItem) => void; // New Prop
}

export const CartPage: React.FC<Props> = ({ cartItems, onRemove, onUpdateQty, onBack, onCheckout, onItemClick }) => {
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.priceUsd * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleStripeCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const response = await fetch('http://localhost:3001/api/orders/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: window.location.origin,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
           <button onClick={onBack} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
           </button>
           <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({totalItems})</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           
           {/* Left Column: Cart Items */}
           <div className="flex-1 space-y-4">
              {cartItems.length === 0 ? (
                 <div className="bg-white p-12 rounded-xl border border-gray-200 text-center shadow-sm">
                    <p className="text-gray-500 text-lg mb-6">Your cart is currently empty.</p>
                    <button onClick={onBack} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">Start Sourcing</button>
                 </div>
              ) : (
                cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    // Make the container clickable to open terminal
                    onClick={() => onItemClick(item)}
                    className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-6 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                     {/* Image */}
                     <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <img src={item.imageUrl} alt={item.model} className="max-h-20 max-w-full object-contain" />
                     </div>
                     
                     {/* Details */}
                     <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.brand} {item.model}</h3>
                        <p className="text-sm text-gray-500 mb-1">{item.grade} • {item.storage} • {item.origin} Spec</p>
                        <p className="text-xs text-green-600 font-medium">{item.stock} units available in {item.origin} Hub</p>
                     </div>

                     {/* Qty & Price */}
                     <div className="flex flex-col items-center sm:items-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <div className="text-lg font-bold text-gray-900">${(item.priceUsd * item.quantity).toLocaleString()} USD</div>
                        <div className="text-xs text-gray-400">${item.priceUsd} / each</div>
                        
                        <div className="flex items-center border border-gray-300 rounded-lg h-8 mt-1 bg-gray-50">
                           <button 
                             onClick={() => onUpdateQty(item.id, -1)}
                             className="px-3 h-full hover:bg-gray-100 text-gray-600 rounded-l-lg transition-colors disabled:opacity-50"
                             disabled={item.quantity <= 5} // MOQ
                           >
                             -
                           </button>
                           <span className="w-10 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                           <button 
                             onClick={() => onUpdateQty(item.id, 1)}
                             className="px-3 h-full hover:bg-gray-100 text-gray-600 rounded-r-lg transition-colors"
                           >
                             +
                           </button>
                        </div>
                     </div>

                     {/* Delete */}
                     <button 
                       onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                       className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
                ))
              )}
           </div>

           {/* Right Column: Summary */}
           <div className="lg:w-96">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                 <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                 
                 <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                    <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">Requirements Met</h4>
                    <div className="flex items-center text-sm text-blue-700 mb-1">
                       <ShieldCheck className="w-4 h-4 mr-2" />
                       MOQ: {totalItems} / 10 units
                    </div>
                    <div className="flex items-center text-sm text-blue-700">
                       <ShieldCheck className="w-4 h-4 mr-2" />
                       Value: ${subtotal.toLocaleString()} / $2500
                    </div>
                 </div>

                 <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-gray-900">${subtotal.toLocaleString()} USD</span>
                 </div>

                 <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-xl font-extrabold text-gray-900">${subtotal.toLocaleString()} USD</span>
                 </div>

                 {subtotal > 5000 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                       <div className="flex items-start mb-2">
                          <AlertCircle className="w-5 h-5 text-orange-600 mr-2 shrink-0 mt-0.5" />
                          <h4 className="text-sm font-bold text-orange-800 uppercase tracking-tight">Wire Transfer Required</h4>
                       </div>
                       <p className="text-xs text-orange-700 font-medium leading-relaxed mb-3">
                          Orders exceeding $5,000 USD must be settled via bank wire transfer for security and compliance.
                       </p>
                       <div className="flex flex-col gap-2">
                          <a 
                            href="https://wa.me/19404009316" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-3 rounded-md transition-colors"
                          >
                             <MessageSquare className="w-3.5 h-3.5 mr-2" />
                             WhatsApp Support
                          </a>
                          <div className="text-center text-[10px] text-orange-600 font-bold">
                             OR SMS: 9404009316
                          </div>
                       </div>
                    </div>
                 )}

                 <button 
                    onClick={handleStripeCheckout}
                    disabled={isCheckingOut || subtotal > 5000}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-lg shadow-sm transition-all mb-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                 >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                 </button>
                 
                 <button 
                    onClick={() => cartItems.forEach(i => onRemove(i.id))}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-lg transition-colors text-sm"
                 >
                    Clear Cart
                 </button>

                 <div className="mt-6 text-center">
                    <button onClick={onBack} className="text-sm text-blue-600 hover:underline font-medium">Continue Shopping</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
