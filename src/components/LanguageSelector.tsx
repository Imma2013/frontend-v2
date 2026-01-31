import React from 'react';
import { X, Check } from 'lucide-react';
import { COUNTRIES, type Country } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: Country;
  onSelect: (country: Country) => void;
}

export const LanguageSelector: React.FC<Props> = ({ isOpen, onClose, selectedCountry, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Choose your location</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 bg-gray-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  onSelect(country);
                  onClose();
                }}
                className={`flex items-center p-3 rounded-lg border transition-all ${
                  selectedCountry.code === country.code
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {/* REAL FLAG IMAGE */}
                <img 
                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  className="w-8 h-auto object-cover rounded-sm shadow-sm mr-3 border border-gray-100"
                />
                
                <div className="flex-1 text-left">
                  <div className="text-sm font-bold text-gray-900">{country.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{country.currency}</div>
                </div>
                {selectedCountry.code === country.code && (
                  <Check className="w-4 h-4 text-blue-600 ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm transition-colors"
           >
             Cancel
           </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
