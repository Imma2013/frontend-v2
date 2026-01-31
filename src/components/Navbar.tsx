import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User, ChevronDown, LogOut, Heart, LayoutDashboard, Settings, Hexagon, Layers, Box } from 'lucide-react';
import { AiSearchBar } from './AiSearchBar';

interface Props {
  onNavigate: (view: 'home' | 'watchlist' | 'about' | 'terms' | 'grading' | 'shipping' | 'privacy' | 'profile' | 'cart') => void;
  savedCount: number;
  cartCount: number;
  showSearch?: boolean; // Controls sticky search visibility
  onSearch?: (query: string, model: string) => void;
  isSearching?: boolean;
}

export const Navbar: React.FC<Props> = ({ onNavigate, savedCount, cartCount, showSearch = false, onSearch, isSearching = false }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-cryzo-dark text-white sticky top-0 z-50 shadow-lg border-b border-gray-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center gap-6">
            
            {/* NEW LOGO DESIGN: The "Hex-Node" */}
            <div 
              className="flex items-center cursor-pointer group flex-shrink-0"
              onClick={() => onNavigate('home')}
            >
              <div className="relative w-10 h-10 mr-2 flex items-center justify-center">
                 {/* Abstract geometric shape representing a box/chip and global connection */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-lg shadow-blue-500/20"></div>
                 <div className="absolute inset-[3px] bg-cryzo-dark rounded-lg transform rotate-45"></div>
                 <div className="relative z-10">
                    <Box className="w-5 h-5 text-white" strokeWidth={2.5} />
                 </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">
                  CRYZO
                </span>
                <span className="text-[10px] tracking-widest text-blue-500 font-bold uppercase">
                  Wholesale
                </span>
              </div>
            </div>

            {/* CENTRAL SEARCH BAR - Always Visible */}
            <div className="flex-1 max-w-2xl">
               {onSearch && (
                 <AiSearchBar 
                   onSearch={onSearch} 
                   isSearching={isSearching} 
                   variant="navbar" 
                   placeholder="Search products, parts, or inventory..."
                 />
               )}
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center space-x-2 md:space-x-6 flex-shrink-0">
              
              {/* Watchlist */}
              <button 
                onClick={() => onNavigate('watchlist')}
                className="p-2 text-gray-300 hover:text-white relative flex flex-col items-center group"
              >
                 <div className="relative">
                   <Heart className="h-6 w-6 group-hover:text-red-400 transition-colors" />
                   {savedCount > 0 && (
                     <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">
                       {savedCount}
                     </span>
                   )}
                 </div>
              </button>

              {/* Cart */}
              <button 
                onClick={() => onNavigate('cart')}
                className="p-2 text-gray-300 hover:text-white relative flex flex-col items-center group"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 group-hover:text-blue-400 transition-colors" />
                  {cartCount > 0 && (
                     <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full text-[10px] flex items-center justify-center font-bold">
                       {cartCount}
                     </span>
                  )}
                </div>
              </button>

              {/* Dealer Login */}
              <div className="relative" ref={profileRef}>
                {!isLoggedIn ? (
                  <button 
                    onClick={() => onNavigate('profile')} 
                    className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors items-center shadow-md shadow-blue-900/20"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dealer Login
                  </button>
                ) : (
                  <div>
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-3 focus:outline-none bg-gray-800/50 hover:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 transition-all"
                    >
                       <div className="text-right hidden md:block">
                          <p className="text-xs font-bold text-white">Orion</p>
                       </div>
                       <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold border border-white/20">
                         OE
                       </div>
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 animate-fade-in border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                          <p className="text-sm font-bold text-gray-900">Orion Electronics Ltd</p>
                        </div>
                        <button onClick={() => { onNavigate('profile'); setIsProfileOpen(false); }} className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"><LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" /> Dashboard</button>
                        <button onClick={() => { setIsLoggedIn(false); setIsProfileOpen(false); }} className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"><LogOut className="w-4 h-4 mr-3" /> Log Out</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
