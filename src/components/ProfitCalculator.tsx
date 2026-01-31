import React, { useState } from 'react';
import { markets } from '../services/dataService';
import { Calculator, ArrowRight } from 'lucide-react';

interface Props {
  price: number;
}

export const ProfitCalculator: React.FC<Props> = ({ price }) => {
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);
  const market = markets[selectedRegionIndex];

  const deliveredCost = price + market.shippingCostUsd;
  const estimatedResale = Math.round(price * market.avgResaleMultiplier);
  const profit = estimatedResale - deliveredCost;
  const margin = Math.round((profit / deliveredCost) * 100);

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200 mt-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-black text-gray-800 flex items-center uppercase tracking-wide">
          <Calculator className="w-5 h-5 mr-2 text-green-600" /> 
          Profit Simulator
        </h4>
        <select 
          className="text-xs border-green-300 rounded-lg border px-3 py-2 bg-white text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setSelectedRegionIndex(Number(e.target.value))}
          value={selectedRegionIndex}
        >
          {markets.map((m, idx) => (
            <option key={m.region} value={idx}>{m.region}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
        <div className="bg-white rounded-lg p-2.5 border border-green-100">
          <p className="text-gray-500 font-medium">Unit Cost</p>
          <p className="font-mono font-bold text-gray-900 text-sm">${price}</p>
        </div>
        <div className="bg-white rounded-lg p-2.5 border border-green-100">
          <p className="text-gray-500 font-medium">Shipping (Est)</p>
          <p className="font-mono font-bold text-gray-900 text-sm">+${market.shippingCostUsd}</p>
        </div>
      </div>
      
      <div className="pt-4 border-t-2 border-green-200">
        <div className="flex justify-between items-end gap-3">
          <div>
            <p className="text-gray-600 text-xs font-semibold mb-1">Net Profit / Unit</p>
            <p className="text-3xl font-black text-green-600">${profit}</p>
          </div>
          <div className="text-right">
             <div className="inline-flex items-center gap-2">
               <div className="bg-green-600 text-white px-3 py-2 rounded-lg font-black text-sm flex items-center">
                 <span className="text-lg">📈</span>
                 {margin}% ROI
               </div>
             </div>
          </div>
        </div>
        <p className="text-[10px] text-gray-500 mt-3 italic">
          *Estimate includes {market.shippingCostUsd > 0 ? 'shipping' : 'local'} to {market.region}. Resale: {market.currency} at {market.avgResaleMultiplier}x markup.
        </p>
      </div>
    </div>
  );
};
