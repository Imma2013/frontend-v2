// FILE: src/App.tsx
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { Watchlist } from './components/Watchlist';
import { LegalPages } from './components/LegalPages';
import { ProfileDashboard } from './components/ProfileDashboard';
import { ContactPage } from './components/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartPage } from './components/CartPage';
import { FullScreenSignup } from './components/ui/full-screen-signup';
import { ChatWidget } from './components/ChatWidget';
import { products as initialMockData } from './services/dataService';
import { LanguageProvider } from './contexts/LanguageContext';
import type { Product, CartItem } from './types';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isSearching, setIsSearching] = useState(false);
  
  // STATE: Master list vs Filtered list
  const [allProducts, setAllProducts] = useState<Product[]>(initialMockData);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(initialMockData);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);


  const handleSearch = (q: string) => {
    if (!q) {
        setDisplayedProducts(allProducts);
        return;
    }
    const lowerQuery = q.toLowerCase();
    const terms = lowerQuery.split(' ').filter(t => t.length > 1);
    
    // Search against the LIVE allProducts
    const filtered = allProducts.filter(p => {
      const searchString = `${p.brand} ${p.model} ${p.grade} ${p.origin} ${p.storage}`.toLowerCase();
      return terms.some(term => searchString.includes(term));
    });
    setDisplayedProducts(filtered);
    setCurrentView('home');
  };

  const handleAiSearch = async (query: string, model: string) => {
    setIsSearching(true);
    setAiResponse(null);
    setCurrentView('home');
    
    console.log(`Using AI model: ${model}`);

    setTimeout(() => {
        handleSearch(query);
        setAiResponse(`Found ${displayedProducts.length} results for "${query}"`);
        setIsSearching(false);
    }, 800);
  };

  const addToCart = (product: Product, qty = 5) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing 
        ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i) 
        : [...prev, { ...product, quantity: qty }];
    });
  };

  const updateCartQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  };

  const toggleSaved = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const renderContent = () => {
    if (currentView === 'signup') return <FullScreenSignup />;
    if (currentView === 'cart') return <CartPage cartItems={cartItems} onRemove={(id)=>updateCartQty(id, -100)} onUpdateQty={updateCartQty} onBack={()=>setCurrentView('home')} onItemClick={(item) => setSelectedProduct(item)} onCheckout={() => alert('Checkout not implemented yet')} />;
    if (currentView === 'profile') return <ProfileDashboard onNavigateHome={()=>setCurrentView('home')} onUpdateGlobalInventory={() => {}} />;
    if (currentView === 'watchlist') return <Watchlist savedProducts={allProducts.filter(p=>savedIds.includes(p.id))} onToggleSaved={toggleSaved} onBack={()=>setCurrentView('home')} />;
    if (currentView === 'contact') return <ContactPage onBack={()=>setCurrentView('home')} />;
    if (['about','terms','privacy','shipping', 'grading'].includes(currentView)) return <LegalPages view={currentView as any} onBack={()=>setCurrentView('home')} />;
    
    return (
      <>
        <Hero onSearch={handleAiSearch} isSearching={isSearching} />
        <div className="max-w-7xl mx-auto px-4 py-8">
            {aiResponse && <div className="bg-blue-50 p-4 rounded-xl text-blue-800 mb-6 flex items-center"><Sparkles className="w-5 h-5 mr-2"/>{aiResponse}</div>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map(p => (
                <ProductCard key={p.id} product={p} onClick={()=>setSelectedProduct(p)} onQuickAdd={(qty)=>addToCart(p, qty)} isSaved={savedIds.includes(p.id)} onToggleSaved={toggleSaved} />
            ))}
            </div>
        </div>
      </>
    );
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {currentView !== 'profile' && currentView !== 'signup' && <Navbar onNavigate={setCurrentView} cartCount={cartItems.reduce((a,b)=>a+b.quantity,0)} savedCount={savedIds.length} onSearch={handleAiSearch} isSearching={isSearching} />}
        {renderContent()}
        {currentView !== 'profile' && currentView !== 'signup' && <Footer onNavigate={setCurrentView} />}
        {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={()=>setSelectedProduct(null)} onAddToCart={addToCart} onViewCart={()=>{setSelectedProduct(null); setCurrentView('cart');}} onAiSearch={handleAiSearch}/>}
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
};

export default App;
