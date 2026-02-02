import React, { useState } from 'react';
import { Trash2, CreditCard, ChevronLeft, Minus, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { createCheckout } from '../services/api';
import type { CartItem } from '../types';

interface Props {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onBack: () => void;
}

export const CartPage: React.FC<Props> = ({ items, onRemove, onUpdateQty, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + (item.priceUsd * item.quantity), 0);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  // Check MOQ requirements
  const meetsMinUnits = totalUnits >= 10;
  const meetsMinValue = subtotal >= 2500;
  const canCheckout = meetsMinUnits && meetsMinValue && items.length > 0;

  const handleCheckout = async () => {
    if (!canCheckout) return;

    setIsProcessing(true);
    setError(null);

    try {
      const checkoutItems = items.map(item => ({
        brand: item.brand,
        model: item.model,
        grade: item.grade,
        storage: item.storage,
        origin: item.origin,
        priceUsd: item.priceUsd,
        quantity: item.quantity,
      }));

      const result = await createCheckout(checkoutItems);

      if (result.success && result.url) {
        // Redirect to Stripe Checkout
        window.location.href = result.url;
      } else {
        setError(result.error || 'Checkout failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8 font-medium"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Shop
        </button>

        <div className="flex items-baseline justify-between mb-8">
          <h1 className="text-3xl font-black text-gray-900">Shopping Cart ({items.length})</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">Your cart is empty.</p>
            <button onClick={onBack} className="mt-4 text-blue-600 font-bold hover:underline">Browse Inventory</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow">
                  <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xs uppercase text-center p-2 border border-gray-200">
                    {item.brand}<br />{item.model}
                  </div>

                  <div className="flex-1 w-full text-center sm:text-left">
                    <h3 className="font-bold text-lg text-gray-900">{item.brand} {item.model}</h3>
                    <p className="text-sm text-gray-500 font-medium">{item.grade} - {item.storage} - {item.origin} Hub</p>
                    <div className="mt-1 text-xs text-green-600 font-bold">{item.stock} units available</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-12 text-center font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="text-right w-28">
                      <div className="font-black text-lg">${(item.priceUsd * item.quantity).toLocaleString()}</div>
                      <div className="text-xs text-gray-400">${item.priceUsd} each</div>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
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

                {/* MOQ Requirements */}
                <div className={`rounded-lg p-4 mb-6 border ${canCheckout ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${canCheckout ? 'text-green-800' : 'text-amber-800'}`}>
                    Minimum Order Requirements
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className={`flex items-center ${meetsMinUnits ? 'text-green-700' : 'text-amber-700'}`}>
                      {meetsMinUnits ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      Units: {totalUnits} / 10 minimum
                    </li>
                    <li className={`flex items-center ${meetsMinValue ? 'text-green-700' : 'text-amber-700'}`}>
                      {meetsMinValue ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      Value: ${subtotal.toLocaleString()} / $2,500 minimum
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalUnits} units)</span>
                    <span className="font-bold text-gray-900">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gray-400 italic">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-6">
                  <span className="font-bold text-lg text-gray-900">Total</span>
                  <span className="font-black text-3xl text-gray-900">${subtotal.toLocaleString()}</span>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={!canCheckout || isProcessing}
                  className={`w-full font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center ${
                    canCheckout && !isProcessing
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-yellow-200'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      {canCheckout ? 'Proceed to Checkout' : 'Meet MOQ to Checkout'}
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
