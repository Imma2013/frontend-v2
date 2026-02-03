import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  X,
  Zap,
  Globe,
  Shield,
  Package,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
  ArrowUpRight,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  Cpu,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Play,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';
import type { User as FirebaseUser } from 'firebase/auth';

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product, qty: number) => void;
  savedIds: string[];
  onToggleSaved: (id: string) => void;
  isSearching: boolean;
  onSearch: (query: string) => void;
  aiMessage?: string | null;
  aiSuggestion?: string | null;
  lastModel?: string | null;
  onResetSearch?: () => void;
  user?: FirebaseUser | null;
  onLogout?: () => void;
  onNavigate?: (view: string) => void;
  cartCount?: number;
}

// Floating orb decoration
const FloatingOrb: React.FC<{
  size: string;
  color: string;
  position: string;
  delay?: number;
}> = ({ size, color, position, delay = 0 }) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full blur-3xl opacity-20 ${position} pointer-events-none`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

// Animated counter for stats
const AnimatedCounter: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({
  target, suffix = '', prefix = ''
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Quick action chips
const QuickChip: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <motion.button
    onClick={onClick}
    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-full text-xs font-medium text-gray-400 hover:text-cyan-300 transition-all"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {label}
  </motion.button>
);

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onProductClick,
  onAddToCart,
  savedIds,
  onToggleSaved,
  isSearching,
  onSearch,
  aiMessage,
  aiSuggestion,
  lastModel,
  onResetSearch,
  user,
  onLogout,
  onNavigate,
  cartCount = 0
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onResetSearch?.();
  };

  const quickSearches = [
    "iPhone 15 Pro Max Grade A",
    "Samsung S24 Ultra bulk",
    "Compare iPhone 14 vs 15",
    "Best value refurb phones",
    "Show all Japan stock"
  ];

  const stats = [
    { value: 10000, suffix: '+', label: 'Units Available', icon: Package },
    { value: 98, suffix: '%', label: 'Grade Accuracy', icon: Shield },
    { value: 6, suffix: '', label: 'Global Hubs', icon: Globe },
  ];

  // Supplier showcase videos (muted autoplay)
  const supplierVideos = [
    { id: 'v1', src: '/videos/supplier-1.mp4', label: 'Stock Verification' },
    { id: 'v2', src: '/videos/supplier-2.mp4', label: 'Quality Check' },
    { id: 'v3', src: '/videos/supplier-3.mp4', label: 'Warehouse Tour' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Iconic Crystal C */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate?.('home')}>
              <div className="w-9 h-9 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-xl transform rotate-45 shadow-lg shadow-cyan-500/25" />
                <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg transform rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cyan-400 font-black text-base">C</span>
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-tight">CRYZO</span>
                <span className="text-[8px] tracking-[0.2em] text-cyan-400 font-bold uppercase">Wholesale</span>
              </div>
            </div>

            {/* Nav Actions */}
            <div className="flex items-center gap-2">
              {/* Watchlist */}
              <button
                onClick={() => onNavigate?.('watchlist')}
                className="relative p-2.5 text-gray-400 hover:text-white transition-colors"
              >
                <Heart className="w-5 h-5" />
                {savedIds.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-cyan-500 rounded-full text-[10px] font-bold flex items-center justify-center text-gray-950">
                    {savedIds.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => onNavigate?.('cart')}
                className="relative p-2.5 text-gray-400 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-cyan-500 rounded-full text-[10px] font-bold flex items-center justify-center text-gray-950">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {user ? (
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
                  <button
                    onClick={() => onNavigate?.('profile')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-[10px] font-bold text-gray-950">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-300 max-w-[100px] truncate">
                      {user.displayName || user.email?.split('@')[0]}
                    </span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onNavigate?.('signup')}
                  className="ml-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-950 font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <User className="w-4 h-4 sm:hidden" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Noise texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb size="w-[500px] h-[500px]" color="bg-cyan-600" position="top-[-150px] left-[-100px]" delay={0} />
      <FloatingOrb size="w-[400px] h-[400px]" color="bg-violet-600" position="top-[10%] right-[-100px]" delay={2} />
      <FloatingOrb size="w-[300px] h-[300px]" color="bg-amber-500" position="top-[60%] left-[5%]" delay={4} />

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-8 pb-12 px-4 sm:px-6"
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Logo & Badge */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Iconic Crystal C Logo */}
            <div className="w-14 h-14 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-2xl transform rotate-45 shadow-xl shadow-cyan-500/30" />
              <div className="absolute inset-[3px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl transform rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-cyan-400 font-black text-2xl">C</span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-3xl font-black tracking-tight">CRYZO</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em]">Wholesale</span>
                <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-400 text-[9px] font-bold rounded">AI-POWERED</span>
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Source Phones{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
              At Scale
            </span>
          </motion.h1>

          <motion.p
            className="text-base text-gray-400 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Search our global inventory with AI. Get instant quotes on verified wholesale lots.
          </motion.p>

          {/* AI Search Bar - THE MOAT */}
          <motion.div
            className="relative max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSearch} className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 group-focus-within:opacity-60 transition-opacity duration-500" />

              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <div className="flex items-center p-2">
                  {/* AI Icon */}
                  <div className="pl-4 pr-3">
                    {isSearching ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                    ) : (
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask anything... 'Show iPhone 15 Pro Max from Japan'"
                    className="flex-1 h-12 bg-transparent border-none outline-none text-white placeholder-gray-500 font-medium text-base"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSearch();
                      }
                    }}
                  />

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pr-2">
                    {/* Model indicator */}
                    {lastModel && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
                          lastModel === 'Pro'
                            ? 'bg-violet-500/20 text-violet-400'
                            : lastModel === 'Flash'
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-white/5 text-gray-400'
                        }`}
                      >
                        <Cpu className="w-3 h-3" />
                        {lastModel}
                      </motion.span>
                    )}

                    {/* Search button */}
                    <button
                      type="submit"
                      disabled={!searchQuery.trim() || isSearching}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        searchQuery.trim() && !isSearching
                          ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-gray-950 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50'
                          : 'bg-white/5 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>

          {/* AI Response Message */}
          <AnimatePresence>
            {aiMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto mb-6"
              >
                <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300">{aiMessage}</p>
                    {aiSuggestion && (
                      <p className="text-xs text-gray-500 mt-1">💡 {aiSuggestion}</p>
                    )}
                  </div>
                  <button
                    onClick={handleClearSearch}
                    className="p-1 text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick search chips */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-xs text-gray-500 mr-1">Try:</span>
            {quickSearches.slice(0, 3).map((query, i) => (
              <QuickChip
                key={i}
                label={query}
                onClick={() => {
                  setSearchQuery(query);
                  onSearch(query);
                }}
              />
            ))}
          </motion.div>

          {/* Mini stats row */}
          <motion.div
            className="flex items-center justify-center gap-8 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400">
                <stat.icon className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs hidden sm:inline">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </motion.section>

      {/* Product Marketplace Section */}
      <section className="relative px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pt-8 border-t border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Live Inventory</h2>
              <p className="text-sm text-gray-500">{products.length} products from verified suppliers</p>
            </div>

            {/* View toggle */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onClick={() => onProductClick(product)}
                  onQuickAdd={(qty) => onAddToCart(product, qty)}
                  isSaved={savedIds.includes(product.id)}
                  onToggleSaved={onToggleSaved}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Load more */}
          {products.length >= 8 && (
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-xl text-sm font-semibold text-gray-300 hover:text-cyan-300 transition-all flex items-center gap-2">
                Load More Products
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Quality Verified Video Section */}
          <motion.div
            className="mt-20 pt-12 border-t border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Verified Source</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Quality Verified</h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">Direct footage from our global suppliers. Every unit inspected before shipping.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supplierVideos.map((video, i) => (
                <motion.div
                  key={video.id}
                  className="relative rounded-2xl overflow-hidden bg-gray-900/50 border border-white/5 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <video
                    src={video.src}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full aspect-[9/16] object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent pointer-events-none" />
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-sm font-semibold text-white">{video.label}</span>
                  </div>
                  {/* Muted indicator */}
                  <div className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-lg">
                    <VolumeX className="w-4 h-4 text-white/70" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
