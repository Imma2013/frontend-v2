// FILE: src/App.tsx
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from './services/firebase';
import { HomePage } from './components/HomePage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartPage } from './components/CartPage';
import { Watchlist } from './components/Watchlist';
import { ProfileDashboard } from './components/ProfileDashboard';
import { ChatWidget } from './components/ChatWidget';
import { FullScreenSignup } from './components/ui/full-screen-signup';
import { products as mockProducts } from './services/dataService';
import { aiSearch, getProducts, type SearchResponse } from './services/api';
import { LanguageProvider } from './contexts/LanguageContext';
import type { Product, CartItem } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Products state
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  // AI response state
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [lastModel, setLastModel] = useState<string | null>(null);

  // Other state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts();
        if (response.products && response.products.length > 0) {
          const normalized = response.products.map((p: any) => ({
            id: p._id || p.id,
            brand: p.brand || 'Apple',
            model: p.model,
            modelNumber: p.modelNumber || p.sku || '',
            grade: p.grade || 'Refurb A',
            storage: p.storage || '128GB',
            color: p.color || 'Black',
            priceUsd: p.retailPrice || p.priceUsd || 500,
            stock: p.quantity || p.stock || 10,
            origin: p.phoneOrigin || p.origin || 'US',
            imageUrl: p.imageUrl || '',
            simType: p.simType || 'Physical + eSIM',
            variations: p.variations || [],
          }));
          setAllProducts(normalized);
          setDisplayedProducts(normalized);
        } else {
          console.log('Using mock data (backend empty or unavailable)');
          setAllProducts(mockProducts);
          setDisplayedProducts(mockProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products, using mock data:', error);
        setAllProducts(mockProducts);
        setDisplayedProducts(mockProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentView('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // AI Search handler
  const handleAiSearch = async (query: string, image?: string | null) => {
    setIsSearching(true);
    setAiMessage(null);
    setAiSuggestion(null);

    try {
      const response: SearchResponse = await aiSearch(query, image);
      setLastModel(response.model);
      setAiMessage(response.message || null);
      setAiSuggestion(response.suggestion || null);

      if (response.success && response.products && response.products.length > 0) {
        const normalized = response.products.map((p: any) => ({
          id: p._id || p.id,
          brand: p.brand || 'Apple',
          model: p.model,
          modelNumber: p.modelNumber || p.sku || '',
          grade: p.grade || 'Refurb A',
          storage: p.storage || '128GB',
          color: p.color || 'Black',
          priceUsd: p.retailPrice || p.priceUsd || 500,
          stock: p.quantity || p.stock || 10,
          origin: p.phoneOrigin || p.origin || 'US',
          imageUrl: p.imageUrl || '',
          simType: p.simType || 'Physical + eSIM',
          variations: p.variations || [],
        }));
        setDisplayedProducts(normalized);
      } else if (response.success && response.products?.length === 0) {
        setAiMessage(response.message || 'No products found matching your search.');
      } else {
        handleLocalSearch(query);
      }
    } catch (error) {
      console.error('AI Search failed:', error);
      handleLocalSearch(query);
    } finally {
      setIsSearching(false);
    }
  };

  // Local fallback search
  const handleLocalSearch = (query: string) => {
    if (!query) {
      setDisplayedProducts(allProducts);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const terms = lowerQuery.split(' ').filter(t => t.length > 1);

    const filtered = allProducts.filter(p => {
      const searchString = `${p.brand} ${p.model} ${p.grade} ${p.origin} ${p.storage}`.toLowerCase();
      return terms.some(term => searchString.includes(term));
    });

    setDisplayedProducts(filtered.length > 0 ? filtered : allProducts);
    setAiMessage(`Found ${filtered.length} products (local search)`);
    setLastModel('local');
  };

  // Reset search
  const handleResetSearch = () => {
    setDisplayedProducts(allProducts);
    setAiMessage(null);
    setAiSuggestion(null);
    setLastModel(null);
  };

  // Cart handlers
  const addToCart = (product: Product, qty = 5) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing
        ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i)
        : [...prev, { ...product, quantity: qty }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const toggleSaved = (id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Loading state
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Auth page
  if (currentView === 'signup') {
    return (
      <FullScreenSignup
        onSuccess={() => setCurrentView('home')}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-950">
        {currentView === 'home' && (
          <HomePage
            products={displayedProducts}
            onProductClick={setSelectedProduct}
            onAddToCart={addToCart}
            savedIds={savedIds}
            onToggleSaved={toggleSaved}
            isSearching={isSearching}
            onSearch={handleAiSearch}
            aiMessage={aiMessage}
            aiSuggestion={aiSuggestion}
            lastModel={lastModel}
            onResetSearch={handleResetSearch}
            user={user}
            onLogout={handleLogout}
            onNavigate={setCurrentView}
            cartCount={cartItems.length}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            items={cartItems}
            onUpdateQty={updateCartQty}
            onRemove={(id: string) => setCartItems(prev => prev.filter(i => i.id !== id))}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'watchlist' && (
          <Watchlist
            products={allProducts.filter(p => savedIds.includes(p.id))}
            onProductClick={setSelectedProduct}
            onToggleSaved={toggleSaved}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'profile' && (
          <ProfileDashboard
            onBack={() => setCurrentView('home')}
            user={user}
            onLogout={handleLogout}
          />
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            onViewCart={() => {
              setSelectedProduct(null);
              setCurrentView('cart');
            }}
            onAiSearch={handleAiSearch}
          />
        )}

        {/* Chat Widget */}
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
};

export default App;
