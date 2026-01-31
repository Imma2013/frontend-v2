import React, { useState } from 'react';
import { createWisePayment } from '../services/payments';

type Props = {
  amountUsd: number;
  reference?: string;
  label?: string;
  className?: string;
};

export default function WiseButton({ amountUsd, reference = '', label = 'Pay with Wise', className = '' }: Props) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      const res = await createWisePayment(amountUsd, reference);
      if (res?.redirectUrl) {
        window.location.href = res.redirectUrl;
      } else {
        alert('Could not create Wise payment.');
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
      onClick={handlePay}
      disabled={loading}
      className={`inline-flex items-center px-3 py-2 rounded bg-emerald-600 text-white text-sm ${className}`}
    >
      {loading ? 'Starting...' : label}
    </button>
  );
}
