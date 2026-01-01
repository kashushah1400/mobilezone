
import React from 'react';
import { MobilePhone } from '../types';

interface MobileCardProps {
  phone: MobilePhone;
  onViewDetails: (phone: MobilePhone) => void;
}

const MobileCard: React.FC<MobileCardProps> = ({ phone, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all group flex flex-col">
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer" onClick={() => onViewDetails(phone)}>
        <img
          src={phone.image}
          alt={phone.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {phone.isTrending && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest shadow-sm">
            Trending
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs font-medium text-blue-600 uppercase">{phone.brand}</span>
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onViewDetails(phone)}>
            {phone.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fas fa-star text-[10px] ${i < Math.floor(phone.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
            ></i>
          ))}
          <span className="text-xs text-gray-400 font-medium ml-1">{phone.rating}</span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium text-gray-600">{phone.currency}</span>
            <span className="text-lg font-bold text-gray-900">{phone.price.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={() => onViewDetails(phone)}
            className="w-full mt-3 py-2 bg-gray-50 group-hover:bg-blue-600 text-gray-700 group-hover:text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            Details
            <i className="fas fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileCard;
