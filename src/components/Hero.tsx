import React from 'react';
import { AiSearchBar } from './AiSearchBar';

interface Props {
  onSearch: (query: string, model: string) => void;
  isSearching: boolean;
  hidden?: boolean;
}

export const Hero: React.FC<Props> = ({ onSearch, isSearching, hidden = false }) => {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-cryzo-dark text-white overflow-hidden pb-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
        
        {/* Badge - AI-Powered Sourcing */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/40 border border-blue-500/50 mb-8 mx-auto backdrop-blur-md shadow-lg animate-fade-in">
          <div className="w-2.5 h-2.5 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-semibold text-blue-100">AI-Powered Sourcing</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight max-w-5xl mx-auto">
          Global Inventory,<br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
            One Search
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Access verified wholesale lots directly from USA Hub. Source phones in bulk with transparent pricing and instant logistics.
        </p>

        {/* AI Search Bar */}
        <div className={`mb-8 transition-opacity duration-300 ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <AiSearchBar onSearch={onSearch} isSearching={isSearching} variant="hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
