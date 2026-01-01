
import React from 'react';
import { BRANDS } from '../constants';
import { Brand } from '../types';

interface SidebarProps {
  onBrandSelect: (brand: string) => void;
  selectedBrand: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onBrandSelect, selectedBrand }) => {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-20">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider">Mobile Brands</h3>
          {selectedBrand && (
            <button 
              onClick={() => onBrandSelect('')}
              className="text-xs text-blue-600 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="p-2">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
            {BRANDS.map((brand) => (
              <button
                key={brand.name}
                onClick={() => onBrandSelect(brand.name)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors group ${
                  selectedBrand === brand.name 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-sm">{brand.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedBrand === brand.name 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                }`}>
                  {brand.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-4 p-4 border-t border-gray-100">
            <h3 className="font-bold text-gray-800 uppercase text-xs tracking-wider mb-3">Price Range</h3>
            <div className="space-y-2">
                {['Below 20k', '20k - 40k', '40k - 80k', '80k - 150k', 'Above 150k'].map(range => (
                    <label key={range} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                        <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                        {range}
                    </label>
                ))}
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
