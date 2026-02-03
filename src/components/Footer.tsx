import React, { useState } from 'react';
import { ChevronRight, Shield, Sparkles, CheckCircle, X, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

// Modal component for footer pages
const FooterModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl max-h-[80vh] bg-gray-950 rounded-2xl border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-black text-white">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] text-gray-300 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<'about' | 'privacy' | 'grading' | null>(null);

  return (
    <>
      <footer className="bg-gray-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4 cursor-pointer" onClick={() => onNavigate?.('home')}>
                <div className="w-9 h-9 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-xl transform rotate-45 shadow-lg shadow-cyan-500/25" />
                  <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg transform rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-cyan-400 font-black text-base">C</span>
                  </div>
                </div>
                <span className="text-lg font-black tracking-tight text-white">CRYZO</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Premium refurbished iPhones and iPads. AI-powered search to find exactly what you need.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setActiveModal('about')}
                    className="text-sm text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    About Cryzo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('grading')}
                    className="text-sm text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    Quality Guide
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="text-sm text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    Privacy & Terms
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Get in Touch</h4>
              <p className="text-sm text-gray-500 mb-3">
                Have questions? Use our AI chatbot or email us directly.
              </p>
              <a
                href="mailto:sales@cryzo.co.in"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                sales@cryzo.co.in
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} Cryzo. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secure Payments
              </span>
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      <FooterModal isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} title="About Cryzo">
        <p className="text-base leading-relaxed">
          Cryzo is a premium marketplace for refurbished iPhones and iPads. We connect you with quality devices at competitive prices.
        </p>
        <p className="leading-relaxed">
          All our devices are sourced from verified suppliers who are part of the GSM Exchange network of trusted dealers. Every device goes through quality checks before being listed.
        </p>
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mt-4">
          <h4 className="font-bold text-cyan-400 mb-2">Why Cryzo?</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>AI-powered search to find exactly what you need</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Verified suppliers with quality guarantees</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Fast worldwide shipping via DHL/FedEx</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Secure checkout with Stripe</span>
            </li>
          </ul>
        </div>
      </FooterModal>

      {/* Quality Guide Modal */}
      <FooterModal isOpen={activeModal === 'grading'} onClose={() => setActiveModal(null)} title="Quality Guide">
        <p className="mb-6">
          We use a simple 3-tier condition system so you know exactly what you're getting:
        </p>

        <div className="space-y-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded">Brand New</span>
            </div>
            <p className="text-sm">
              Factory sealed, never opened. Includes all original accessories and full manufacturer warranty. Perfect condition.
            </p>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded">Like New</span>
            </div>
            <p className="text-sm">
              Excellent condition with minimal to no signs of use. May have been opened but shows no visible wear. Fully functional with 85%+ battery health.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded">Good</span>
            </div>
            <p className="text-sm">
              Shows normal signs of use such as light scratches on the screen or body. Fully functional with all features working. Great value option.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400">
            <strong className="text-white">Connectivity:</strong> All iPhones support eSIM. iPads are WiFi-only models.
          </p>
        </div>
      </FooterModal>

      {/* Privacy Modal */}
      <FooterModal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title="Privacy & Terms">
        <h3 className="text-lg font-bold text-white mb-3">Privacy Policy</h3>
        <p className="mb-4">
          We respect your privacy and are committed to protecting your personal data. Here's what we collect and why:
        </p>
        <ul className="space-y-2 text-sm mb-6">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span><strong>Email address:</strong> Used for order confirmations and account management</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span><strong>Payment information:</strong> Processed securely through Stripe - we never store your card details</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span><strong>Shipping address:</strong> Required to deliver your order</span>
          </li>
        </ul>

        <h3 className="text-lg font-bold text-white mb-3">Terms of Service</h3>
        <p className="mb-4">
          By using Cryzo, you agree to the following:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span>All sales are final. Please review your order carefully before checkout.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span>Product images are representative. Actual device may vary slightly in appearance.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span>Shipping times are estimates and may vary based on destination.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span>For any issues with your order, contact us at sales@cryzo.co.in</span>
          </li>
        </ul>
      </FooterModal>
    </>
  );
};

export default Footer;
