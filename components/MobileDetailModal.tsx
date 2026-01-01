
import React from 'react';
import { MobilePhone } from '../types';

interface MobileDetailModalProps {
  phone: MobilePhone | null;
  onClose: () => void;
}

const MobileDetailModal: React.FC<MobileDetailModalProps> = ({ phone, onClose }) => {
  if (!phone) return null;

  const specItems = [
    { icon: 'fas fa-microchip', label: 'Processor', value: phone.specs.processor },
    { icon: 'fas fa-memory', label: 'RAM', value: phone.specs.ram },
    { icon: 'fas fa-hdd', label: 'Storage', value: phone.specs.storage },
    { icon: 'fas fa-mobile-alt', label: 'Display', value: phone.specs.display },
    { icon: 'fas fa-camera', label: 'Camera', value: phone.specs.camera },
    { icon: 'fas fa-battery-full', label: 'Battery', value: phone.specs.battery },
    { icon: 'fas fa-robot', label: 'OS', value: phone.specs.os },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">{phone.name} Specifications</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Col: Image & Key Highlights */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
                <img src={phone.image} alt={phone.name} className="max-h-[400px] object-contain drop-shadow-2xl" />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[120px] p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-[10px] uppercase font-bold text-blue-400 mb-1">Price</p>
                    <p className="text-lg font-bold text-blue-700">{phone.currency} {phone.price.toLocaleString()}</p>
                </div>
                <div className="flex-1 min-w-[120px] p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <p className="text-[10px] uppercase font-bold text-orange-400 mb-1">Release</p>
                    <p className="text-lg font-bold text-orange-700">{phone.releaseDate}</p>
                </div>
              </div>
            </div>

            {/* Right Col: Full Specs */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <i className="fas fa-list-ul text-blue-600"></i>
                Technical Details
              </h3>
              <div className="space-y-1">
                {specItems.map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <i className={`${spec.icon} text-gray-500`}></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase">{spec.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3">
                    <i className="fas fa-shopping-cart"></i>
                    Check Store Availability
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDetailModal;
