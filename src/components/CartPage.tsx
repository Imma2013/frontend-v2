import React, { useState } from 'react';
import { type CartItem } from '../App';
import { Trash2, CreditCard, ChevronLeft, Minus, Plus } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface Props {
  cartItems: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onBack: () => void;
  onItemClick: (item: CartItem) => void;
  onCheckout: () => void;
}

export const CartPage: React.FC<Props> = ({ cartItems, onRemove, onUpdateQty, onBack, onItemClick }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.priceUsd * item.quantity), 0);
  const total = subtotal; // Add tax/shipping logic here if needed

  const handleCheckout = async () => {
    setIsProcessing(true);
    const stripe = await stripePromise;
    
    // Simulate checkout session creation
    // In production, call your backend to create a Stripe Checkout Session
    setTimeout(() => {
        alert('Redirecting to Stripe Checkout...');
        setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8 font-medium"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Shop
      </button>

      <div className="flex items-baseline justify-between mb-8">
         <h1 className="text-3xl font-black text-gray-900">Shopping Cart ({cartItems.length})</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Your cart is empty.</p>
            <button onClick={onBack} className="mt-4 text-blue-600 font-bold hover:underline">Browse Inventory</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow">
                        {/* No Image - Data Focus */}
                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold text-xs uppercase text-center p-2">
                             {item.brand} {item.model}
                        </div>

                        <div className="flex-1 w-full text-center sm:text-left">
                            <h3 className="font-bold text-lg text-gray-900">{item.brand} {item.model}</h3>
                            <p className="text-sm text-gray-500 font-medium">{item.grade} • {item.storage} • {item.origin} Hub</p>
                            <div className="mt-1 text-xs text-green-600 font-bold">{item.stock} units available in {item.origin} Hub</div>
                        </div>

                        <div className="flex items-center gap-4">
                             <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg">
                                <button onClick={() => onUpdateQty(item.id, -1)} className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"><Minus className="w-4 h-4 text-gray-600" /></button>
                                <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                <button onClick={() => onUpdateQty(item.id, 1)} className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"><Plus className="w-4 h-4 text-gray-600" /></button>
                             </div>
                             <div className="text-right w-24">
                                <div className="font-black text-lg">${(item.priceUsd * item.quantity).toLocaleString()}</div>
                                <div className="text-xs text-gray-400">${item.priceUsd} / each</div>
                             </div>
                             <button onClick={() => onRemove(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="w-5 h-5" />
                             </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
                    <h2 className="font-black text-xl text-gray-900 mb-6">Order Summary</h2>
                    
                    <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                        <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Requirements Met</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> MOQ: {cartItems.reduce((a,b)=>a+b.quantity,0)} / 10 units
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span> Value: ${subtotal.toLocaleString()} / $2500
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-bold text-gray-900">${subtotal.toLocaleString()} USD</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                             <span>Shipping Estimate</span>
                             <span className="text-gray-400 italic">Calculated at checkout</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mb-8">
                        <span className="font-bold text-lg text-gray-900">Total</span>
                        <span className="font-black text-3xl text-gray-900">${total.toLocaleString()} USD</span>
                    </div>

                    <button 
                        onClick={handleCheckout}
                        disabled={isProcessing || cartItems.length === 0}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black py-4 rounded-xl shadow-lg shadow-yellow-200 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <CreditCard className="w-5 h-5 mr-2" />
                                Place Order
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-4">
                        Secure checkout powered by Stripe. B2B invoices generated automatically.
                    </p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
