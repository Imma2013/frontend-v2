import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, LayoutDashboard, Box, LogOut, Heart, User } from 'lucide-react';
import { AiSearchBar } from './AiSearchBar';

interface Props {
  onNavigate: (view: 'home' | 'watchlist' | 'about' | 'terms' | 'grading' | 'shipping' | 'privacy' | 'profile' | 'cart') => void;
  savedCount: number;
  cartCount: number;
  onSearch: (query: string, model: string) => void;
  isSearching: boolean;
}

export const Navbar: React.FC<Props> = ({ onNavigate, savedCount, cartCount, onSearch, isSearching }) => {
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
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg border-b border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center gap-6">
          
          <div 
            className="flex items-center cursor-pointer group flex-shrink-0"
            onClick={() => onNavigate('home')}
          >
            <div className="relative w-10 h-10 mr-2 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
               <div className="absolute inset-[3px] bg-gray-900 rounded-lg transform rotate-45"></div>
               <div className="relative z-10">
                  <Box className="w-5 h-5 text-white" strokeWidth={2.5} />
               </div>
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-xl font-black tracking-tighter text-white">CRYZO</span>
              <span className="text-[9px] tracking-widest text-blue-500 font-bold uppercase">Wholesale</span>
            </div>
          </div>

          <div className="flex-1 max-w-xl">
             <AiSearchBar 
               onSearch={onSearch} 
               isSearching={isSearching} 
               variant="navbar" 
               placeholder="Search inventory..."
             />
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <button 
              onClick={() => onNavigate('watchlist')}
              className="p-2 text-gray-400 hover:text-white relative"
            >
               <Heart className="h-5 w-5" />
               {savedCount > 0 && (
                 <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-blue-600 rounded-full text-[8px] flex items-center justify-center font-bold">
                   {savedCount}
                 </span>
               )}
            </button>

            <button 
              onClick={() => onNavigate('cart')}
              className="p-2 text-gray-400 hover:text-white relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                 <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-blue-600 rounded-full text-[8px] flex items-center justify-center font-bold">
                   {cartCount}
                 </span>
              )}
            </button>

            <div className="relative border-l border-gray-800 pl-4 ml-2" ref={profileRef}>
              {!isLoggedIn ? (
                <button 
                  onClick={() => onNavigate('signup')} 
                  className="flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-900/20"
                >
                  <User className="w-4 h-4 mr-1.5" />
                  Login
                </button>
              ) : (
                <div>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                     <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-black border border-white/10">
                       OE
                     </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 overflow-hidden">
                      <button onClick={() => { onNavigate('profile'); setIsProfileOpen(false); }} className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"><LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" /> Dashboard</button>
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
  );
};

export default Navbar;
