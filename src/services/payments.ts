export type StripeSession = { url?: string; id?: string };

export async function createStripeSession(cart: any): Promise<StripeSession> {
  try {
    const res = await fetch('/api/payments/stripe/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });
    if (!res.ok) throw new Error('network');
    const data = await res.json();
    return data as StripeSession;
  } catch (err) {
    // Fallback mock session URL for local dev
    return { url: 'https://checkout.stripe.com/pay/mock_session' };
  }
}

export type WisePayment = { redirectUrl?: string; id?: string };

export async function createWisePayment(amountUsd: number, reference?: string): Promise<WisePayment> {
  try {
    const res = await fetch('/api/payments/wise/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountUsd, reference }),
    });
    if (!res.ok) throw new Error('network');
    const data = await res.json();
    return data as WisePayment;
  } catch (err) {
    // Fallback mock checkout
    return { redirectUrl: 'https://wise.com/mock-pay' };
  }
}

export default { createStripeSession, createWisePayment };
