import React, { useState } from 'react';
import { Trash2, CreditCard, ArrowLeft, Minus, Plus, AlertCircle, CheckCircle, ShoppingCart } from 'lucide-react';
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

  const meetsMinUnits = totalUnits >= 3;
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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white">Shopping Cart</h1>
              <p className="text-sm text-gray-500">{items.length} items • {totalUnits} units</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
              <ShoppingCart className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add items to start your wholesale order</p>
            <button
              onClick={onBack}
              className="bg-cyan-500 hover:bg-cyan-400 text-gray-950 px-6 py-2.5 rounded-xl font-bold transition-colors"
            >
              Browse Inventory
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-white/[0.07] transition-colors"
                >
                  {/* Product placeholder */}
                  <div className="w-full sm:w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-gray-500 font-bold text-xs uppercase text-center p-2 border border-white/10">
                    {item.brand}<br />{item.model}
                  </div>

                  <div className="flex-1 w-full text-center sm:text-left">
                    <h3 className="font-bold text-lg text-white">{item.brand} {item.model}</h3>
                    <p className="text-sm text-gray-400 font-medium">{item.grade} • {item.storage} • {item.origin}</p>
                    <div className="mt-1 text-xs text-cyan-400 font-bold">{item.stock} units available</div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity controls */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-2.5 hover:bg-white/10 rounded-l-xl transition-colors text-gray-400 hover:text-white"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-sm text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-2.5 hover:bg-white/10 rounded-r-xl transition-colors text-gray-400 hover:text-white"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right w-28">
                      <div className="font-black text-lg text-white">${(item.priceUsd * item.quantity).toLocaleString()}</div>
                      <div className="text-xs text-gray-500">${item.priceUsd}/unit</div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                <h2 className="font-black text-xl text-white mb-6">Order Summary</h2>

                {/* MOQ Requirements */}
                <div className={`rounded-xl p-4 mb-6 border ${
                  canCheckout
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                    canCheckout ? 'text-green-400' : 'text-amber-400'
                  }`}>
                    Minimum Order Requirements
                  </h4>
                  <ul className="space-y-2">
                    <li className={`flex items-center text-sm ${meetsMinUnits ? 'text-green-400' : 'text-amber-400'}`}>
                      {meetsMinUnits ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      {totalUnits} / 3 units minimum
                    </li>
                    <li className={`flex items-center text-sm ${meetsMinValue ? 'text-green-400' : 'text-amber-400'}`}>
                      {meetsMinValue ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
                      ${subtotal.toLocaleString()} / $2,500 minimum
                    </li>
                  </ul>
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-gray-500 italic">At checkout</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-6">
                  <span className="font-bold text-gray-400">Total</span>
                  <span className="font-black text-3xl text-white">${subtotal.toLocaleString()}</span>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={!canCheckout || isProcessing}
                  className={`w-full font-black py-4 rounded-xl transition-all flex items-center justify-center ${
                    canCheckout && !isProcessing
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-950 hover:shadow-lg hover:shadow-cyan-500/30'
                      : 'bg-white/10 text-gray-500 cursor-not-allowed'
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

                <p className="text-center text-xs text-gray-500 mt-4">
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
