import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, ShoppingBag, Heart, Clock, LogOut, Shield, CreditCard } from 'lucide-react';
import type { User } from 'firebase/auth';

interface Props {
  onBack: () => void;
  user: User | null;
  onLogout?: () => void;
}

export const ProfileDashboard: React.FC<Props> = ({ onBack, user, onLogout }) => {
  // Extract user info
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest';
  const email = user?.email || 'Not signed in';
  const photoURL = user?.photoURL;
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white">My Account</h1>
              <p className="text-sm text-gray-500">Manage your profile</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Profile Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            {photoURL ? (
              <img
                src={photoURL}
                alt={displayName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-500/30"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-2xl font-black text-white border-2 border-cyan-500/30">
                {initials}
              </div>
            )}

            <div className="flex-1">
              <h2 className="text-xl font-black text-white">{displayName}</h2>
              <p className="text-gray-400 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {email}
              </p>
              {user && (
                <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-bold text-cyan-400">
                  <Shield className="w-3 h-3" />
                  Verified Account
                </span>
              )}
            </div>

            {user && onLogout && (
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 font-semibold transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <ShoppingBag className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">0</p>
            <p className="text-xs text-gray-500">Orders</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">0</p>
            <p className="text-xs text-gray-500">Watchlist</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">-</p>
            <p className="text-xs text-gray-500">Member Since</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <CreditCard className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">$0</p>
            <p className="text-xs text-gray-500">Total Spent</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="font-bold text-white mb-4">Contact Cryzo</h3>
          <div className="space-y-3">
            <a href="mailto:sales@cryzo.co.in" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
              <Mail className="w-5 h-5" />
              sales@cryzo.co.in
            </a>
            <a href="tel:+19404009316" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
              <Phone className="w-5 h-5" />
              +1 940-400-9316
            </a>
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin className="w-5 h-5" />
              Worldwide Shipping via DHL/FedEx
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-2xl p-6">
            <h4 className="font-bold text-cyan-400 mb-2">Minimum Order</h4>
            <p className="text-gray-400 text-sm">10 units or $2,500 minimum order value for wholesale pricing.</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-6">
            <h4 className="font-bold text-emerald-400 mb-2">Payment Methods</h4>
            <p className="text-gray-400 text-sm">Secure checkout via Stripe (cards) or Wire Transfer for large orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
