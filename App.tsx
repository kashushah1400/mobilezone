
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileCard from './components/MobileCard';
import MobileDetailModal from './components/MobileDetailModal';
import { MOCK_MOBILES } from './constants';
import { MobilePhone, ViewMode } from './types';
import { searchMobileWithAI } from './geminiService';

const App: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhone, setSelectedPhone] = useState<MobilePhone | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResults, setAiResults] = useState<{
    text: string;
    groundingSources: any[];
    phones?: MobilePhone[];
  } | null>(null);

  // Filter local mobiles
  const filteredMobiles = useMemo(() => {
    return MOCK_MOBILES.filter(mobile => {
      const matchesBrand = selectedBrand ? mobile.brand === selectedBrand : true;
      const matchesSearch = searchTerm 
        ? mobile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mobile.brand.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesBrand && matchesSearch;
    });
  }, [selectedBrand, searchTerm]);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setAiResults(null);
    if (term.length > 2) {
      setAiLoading(true);
      const results = await searchMobileWithAI(term);
      setAiResults({
        text: results.text,
        groundingSources: results.groundingSources,
        phones: results.structuredData
      });
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <Navbar onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar 
          onBrandSelect={setSelectedBrand} 
          selectedBrand={selectedBrand} 
        />

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          {/* Header Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {searchTerm ? `Results for "${searchTerm}"` : selectedBrand ? `${selectedBrand} Mobiles` : 'Latest Mobile Prices in Pakistan'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Showing {filteredMobiles.length + (aiResults?.phones?.length || 0)} models found</p>
            </div>
            
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setViewMode(ViewMode.GRID)}
                    className={`p-2 rounded ${viewMode === ViewMode.GRID ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <i className="fas fa-th-large"></i>
                </button>
                <button 
                    onClick={() => setViewMode(ViewMode.LIST)}
                    className={`p-2 rounded ${viewMode === ViewMode.LIST ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <i className="fas fa-list"></i>
                </button>
            </div>
          </div>

          {/* AI Insights Section */}
          {(aiLoading || aiResults) && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-100 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-2 mb-4">
                <i className="fas fa-sparkles text-yellow-300"></i>
                <h2 className="text-lg font-bold">AI Market Insights</h2>
              </div>
              
              {aiLoading ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <p className="text-blue-100 font-medium">Scanning latest prices and trends...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="leading-relaxed opacity-90">{aiResults?.text}</p>
                  
                  {aiResults?.groundingSources && aiResults.groundingSources.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">Sources</p>
                        <div className="flex flex-wrap gap-2">
                           {aiResults.groundingSources.map((source, idx) => (
                             <a 
                                key={idx} 
                                href={source.web?.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors flex items-center gap-1"
                             >
                                <i className="fas fa-external-link-alt text-[8px]"></i>
                                {source.web?.title || 'Source'}
                             </a>
                           ))}
                        </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* AI Extra Listings */}
          {aiResults?.phones && aiResults.phones.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <i className="fas fa-bolt text-yellow-500"></i>
                Found via Live AI Search
              </h3>
              <div className={`grid gap-6 ${viewMode === ViewMode.GRID ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {aiResults.phones.map(phone => (
                  <MobileCard 
                    key={phone.id} 
                    phone={phone} 
                    onViewDetails={setSelectedPhone} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Local Listings */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <i className="fas fa-database text-blue-500"></i>
                Featured Catalogue
            </h3>
            {filteredMobiles.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === ViewMode.GRID ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredMobiles.map(phone => (
                    <MobileCard 
                        key={phone.id} 
                        phone={phone} 
                        onViewDetails={setSelectedPhone} 
                    />
                    ))}
                </div>
            ) : !aiLoading && !aiResults?.phones?.length && (
                <div className="bg-white rounded-xl p-20 text-center space-y-4 border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                        <i className="fas fa-search text-2xl text-gray-300"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">No phones found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                    </div>
                    <button 
                        onClick={() => { setSelectedBrand(null); setSearchTerm(''); setAiResults(null); }}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Reset all filters
                    </button>
                </div>
            )}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      <MobileDetailModal 
        phone={selectedPhone} 
        onClose={() => setSelectedPhone(null)} 
      />

      {/* Footer (Simplified) */}
      <footer className="mt-auto bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div className="col-span-1 md:col-span-2 space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                            <i className="fas fa-mobile-alt text-xl"></i>
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Mobile<span className="text-blue-500">Zone</span>
                        </span>
                    </div>
                    <p className="text-gray-400 max-w-sm">
                        The ultimate destination for mobile phone prices and specifications in Pakistan. Powered by AI to give you the most accurate and up-to-date market information.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-gray-100 uppercase text-xs tracking-widest">Company</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors">Advertise</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-gray-100 uppercase text-xs tracking-widest">Support</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-blue-500 transition-colors">FAQs</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors">Buying Guide</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors">Compare Tool</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors">Mobile News</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} MobileZone Pakistan. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
