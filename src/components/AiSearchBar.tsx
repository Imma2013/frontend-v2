import React, { useState, useRef } from 'react';
import { Sparkles, Send, Paperclip, X, Zap } from 'lucide-react';

interface Props {
  onSearch: (query: string, model: string) => void;
  isSearching: boolean;
  variant?: 'hero' | 'navbar' | 'terminal';
  placeholder?: string;
}

const selectModel = (userQuery: string): string => {
  // Simple search = Flash
  if (userQuery.includes("show") || userQuery.includes("find")) {
    return "google/gemini-2.0-flash-thinking-exp:free";
  }
  
  // Complex question = Pro
  if (userQuery.includes("compare") || userQuery.includes("best") || userQuery.includes("recommend")) {
    return "google/gemini-2.5-pro-exp-03-25:free";
  }
  
  // Default to Flash for speed
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
          {imagePreview && (
            <div className="p-3 border-b border-gray-100 dark:border-gray-800">
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
            </div>
          )}

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
    </div>
  );
};

export default AiSearchBar;