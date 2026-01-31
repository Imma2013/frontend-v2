import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Plus, FileSpreadsheet, Image as ImageIcon, X, FileText, Mic } from 'lucide-react';

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

interface Props {
  onSearch: (query: string, model: string) => void;
  isSearching: boolean;
  variant?: 'hero' | 'navbar' | 'terminal';
  placeholder?: string;
}

interface UploadedFile {
  name: string;
  type: 'image' | 'excel' | 'file';
}

export const AiSearchBar: React.FC<Props> = ({ onSearch, isSearching, variant = 'hero', placeholder }) => {
  const [query, setQuery] = useState('');
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isListening, setIsListening] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() || uploadedFiles.length > 0) {
      const selectedModel = selectModel(query);
      onSearch(query, selectedModel);
      if (variant === 'terminal') setQuery(''); // Clear after send in chat mode
    }
  };

  const handleFileUpload = (type: 'image' | 'excel' | 'file', name: string) => {
    setUploadedFiles([...uploadedFiles, { name, type }]);
    setShowUploadMenu(false);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setQuery(variant === 'terminal' ? "Calculate shipping to Riyadh" : "Show me iPhone 14 Pro Max prices in Dubai");
        setIsListening(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUploadMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Variant Styles
  const containerClasses = {
    hero: "w-full max-w-3xl mx-auto z-40 relative",
    navbar: "w-full max-w-xl mx-auto z-40 relative scale-95",
    terminal: "w-full z-40 relative",
  } as const;

  const inputClasses = {
    hero: "flex-1 h-10 text-base border-none outline-none text-gray-700 placeholder-gray-400 bg-transparent font-medium min-w-[200px]",
    navbar: "flex-1 h-8 text-sm border-none outline-none text-gray-700 placeholder-gray-400 bg-transparent font-medium min-w-[150px]",
    terminal: "flex-1 h-10 text-sm border-none outline-none text-gray-700 placeholder-gray-500 bg-transparent font-mono min-w-[150px]",
  } as const;

  // Menu Direction Logic
  const menuPositionClass = variant === 'terminal' 
    ? "bottom-full mb-3" // Open UP for terminal
    : "top-12";          // Open DOWN for Hero/Navbar

  return (
    <div className={containerClasses[variant]}>
      <form onSubmit={handleSubmit} className="relative group">
        {variant === 'hero' && (
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        )}
        
        <div className={`relative bg-white shadow-xl overflow-visible flex flex-col transition-all ${
           variant === 'navbar' ? 'rounded-lg border border-gray-200' : 'rounded-2xl border border-gray-200'
        }`}>
          
          <div className={`flex items-center ${variant === 'navbar' ? 'p-1.5' : 'p-2.5'}`}>
             <div className="pl-2 pr-2 text-blue-500">
               {isSearching ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Sparkles className="w-5 h-5" />}
             </div>
             
             {/* Search Input Area */}
             <div className="flex-1 flex items-center flex-wrap gap-2">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-lg border border-gray-200 animate-fade-in select-none">
                    {file.type === 'excel' && <FileSpreadsheet className="w-3 h-3 mr-1.5 text-green-600" />}
                    {file.type === 'image' && <ImageIcon className="w-3 h-3 mr-1.5 text-blue-600" />}
                    {file.type === 'file' && <FileText className="w-3 h-3 mr-1.5 text-orange-600" />}
                    <span className="truncate max-w-[80px]">{file.name}</span>
                    <button type="button" onClick={() => removeFile(idx)} className="ml-1.5 text-gray-400 hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                <input
                  type="text" 
                  value={isListening ? "Listening..." : query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder || (uploadedFiles.length > 0 ? "Ask AI about this file..." : "Find iPhone 14 Pro Max...")}
                  className={`${inputClasses[variant]} ${isListening ? 'animate-pulse text-blue-600' : ''}`}
                />
             </div>

             <div className="flex items-center space-x-1 pl-2 border-l border-gray-100">
                {/* Voice Button */}
                <button 
                   type="button"
                   onClick={toggleVoice}
                   className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                   <Mic className={variant === 'navbar' ? 'w-4 h-4' : 'w-5 h-5'} />
                </button>

                {/* Plus / Upload Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button 
                    type="button"
                    onClick={() => setShowUploadMenu(!showUploadMenu)}
                    className={`p-2 rounded-full transition-colors ${showUploadMenu ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                  >
                    <Plus className={`${variant === 'navbar' ? 'w-4 h-4' : 'w-5 h-5'} transition-transform ${showUploadMenu ? 'rotate-45' : ''}`} />
                  </button>

                  {showUploadMenu && (
                    <div className={`absolute right-0 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-1 z-50 animate-fade-in ${menuPositionClass}`}>
                       <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                         Add Context
                       </p>
                       <button type="button" onClick={() => handleFileUpload('excel', 'Wholesale.xlsx')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-sm text-gray-700 transition-colors">
                          <FileSpreadsheet className="w-4 h-4 mr-3 text-green-600" /> Excel Sheet
                       </button>
                       <button type="button" onClick={() => handleFileUpload('image', 'Screen.png')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-sm text-gray-700 transition-colors">
                          <ImageIcon className="w-4 h-4 mr-3 text-blue-600" /> Image
                       </button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={(!query.trim() && uploadedFiles.length === 0) || isSearching}
                  className={`rounded-xl p-2 ml-1 transition-all duration-200 flex items-center justify-center
                    ${(query.trim() || uploadedFiles.length > 0) && !isSearching ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                >
                  <ArrowRight className={variant === 'navbar' ? 'w-4 h-4' : 'w-5 h-5'} />
                </button>
             </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AiSearchBar;
