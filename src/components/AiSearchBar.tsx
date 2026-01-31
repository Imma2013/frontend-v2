import React, { useState, useRef } from 'react';
import { Sparkles, Send, Paperclip, X, Globe, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onSearch: (query: string, model: string) => void;
  isSearching: boolean;
  variant?: 'hero' | 'navbar' | 'terminal';
  placeholder?: string;
}

const selectModel = (userQuery: string): string => {
  if (userQuery.includes("compare") || userQuery.includes("best") || userQuery.includes("recommend") || (userQuery.split(' ').length > 8)) {
    return "google/gemini-2.5-pro-exp-03-25:free";
  }
  return "google/gemini-2.0-flash-thinking-exp:free";
};

export const AiSearchBar: React.FC<Props> = ({ onSearch, isSearching, variant = 'hero', placeholder }) => {
  const [query, setQuery] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim() || imagePreview) {
      const model = selectModel(query);
      onSearch(query, model);
      if (variant === 'terminal') {
          setQuery('');
          setImagePreview(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-full transition-all duration-500 ${variant === 'hero' ? 'max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      <form onSubmit={handleSubmit} className="relative group">
        {variant === 'hero' && (
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        )}
        
        <div className={`relative bg-white dark:bg-gray-900 shadow-xl flex flex-col border border-gray-200 dark:border-gray-800 transition-all ${
           variant === 'navbar' ? 'rounded-xl' : 'rounded-2xl'
        }`}>
          
          {/* Image Preview Area */}
          <AnimatePresence>
            {imagePreview && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 border-b border-gray-100 dark:border-gray-800"
              >
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                  <button 
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center p-2">
             <div className="pl-3 pr-2 text-blue-500">
               {isSearching ? <Zap className="w-5 h-5 animate-pulse text-indigo-500" /> : <Sparkles className="w-5 h-5" />}
             </div>
             
             <input
               type="text" 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder={placeholder || "Ask Cryzo about iPhone 16 Pro Max stocks..."}
               className="flex-1 h-10 bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 font-medium text-sm md:text-base"
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   handleSubmit();
                 }
               }}
             />

             <div className="flex items-center space-x-1 pr-1">
                {/* Image Upload */}
                <button 
                   type="button"
                   onClick={() => fileInputRef.current?.click()}
                   className={`p-2 rounded-xl transition-all ${imagePreview ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:text-blue-500 hover:bg-gray-50'}`}
                   title="Upload price list screenshot"
                >
                   <Paperclip className="w-5 h-5" />
                   <input 
                     type="file" 
                     ref={fileInputRef} 
                     onChange={handleFileChange} 
                     accept="image/*" 
                     className="hidden" 
                   />
                </button>

                {/* Send Button */}
                <button 
                  type="submit" 
                  disabled={(!query.trim() && !imagePreview) || isSearching}
                  className={`rounded-xl p-2 transition-all duration-300 flex items-center justify-center
                    ${(query.trim() || imagePreview) && !isSearching 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                >
                  <Send className="w-4 h-4 md:w-5 h-5" />
                </button>
             </div>
          </div>
        </div>
      </form>
      
      {variant === 'hero' && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-60">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2 py-1">Try:</span>
            {['iPhone 15 Pro 256GB', 'Compare iPhone 14 vs 15', 'Best bulk prices'].map(tip => (
                <button 
                    key={tip}
                    type="button"
                    onClick={() => setQuery(tip)}
                    className="text-[10px] md:text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1 rounded-full font-bold transition-all border border-gray-200"
                >
                    {tip}
                </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default AiSearchBar;
