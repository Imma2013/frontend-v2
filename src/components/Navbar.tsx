import React from 'react';
import { ShoppingCart, Heart, User } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';

interface Props {
  onNavigate: (view: string) => void;
  savedCount: number;
  cartCount: number;
  user?: FirebaseUser | null;
  onLogout?: () => void;
}

// Iconic Cryzo Logo Component
const CryzoLogo = () => (
  <div className="flex items-center gap-2.5">
    {/* Crystal/Diamond Icon with "C" */}
    <div className="w-10 h-10 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-xl transform rotate-45 shadow-lg shadow-cyan-500/30" />
      <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg transform rotate-45" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-cyan-400 font-black text-lg tracking-tight">C</span>
      </div>
    </div>
    <span className="text-xl font-black tracking-tight text-white">CRYZO</span>
  </div>
);

export const Navbar: React.FC<Props> = ({ onNavigate, savedCount, cartCount, user, onLogout }) => {
  const initials = user?.displayName?.slice(0, 2).toUpperCase() || user?.email?.slice(0, 2).toUpperCase() || 'U';

  return (
    <nav className="bg-gray-950/80 backdrop-blur-xl text-white sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => onNavigate('home')}>
            <CryzoLogo />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Watchlist */}
            <button
              onClick={() => onNavigate('watchlist')}
              className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl relative transition-colors"
            >
              <Heart className="h-5 w-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-cyan-500 rounded-full text-[10px] flex items-center justify-center font-bold text-gray-950">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl relative transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-cyan-500 rounded-full text-[10px] flex items-center justify-center font-bold text-gray-950">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            <div className="ml-2 pl-3 border-l border-white/10">
              {user ? (
                <button
                  onClick={() => onNavigate('profile')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-xs font-black text-white">
                    {initials}
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('signup')}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-gray-950 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
