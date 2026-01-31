import React, { useState } from 'react';
import { createStripeSession } from '../services/payments';

type Props = {
  cart: any;
  label?: string;
  className?: string;
};

export default function StripeButton({ cart, label = 'Pay with Stripe', className = '' }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const session = await createStripeSession(cart);
      if (session?.url) {
        window.location.href = session.url;
      } else {
        alert('Could not create Stripe session.');
      }
    } catch (err) {
      console.error(err);
      alert('Payment failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={`inline-flex items-center px-3 py-2 rounded bg-sky-600 text-white text-sm ${className}`}
    >
      {loading ? 'Starting...' : label}
    </button>
  );
}
