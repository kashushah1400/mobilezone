
import React, { useState } from 'react';

interface NavbarProps {
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <i className="fas fa-mobile-alt text-xl"></i>
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight hidden sm:block">
            Mobile<span className="text-blue-600">Zone</span>
          </span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for phones (e.g. S24 Ultra, iPhone 15)..."
            className="w-full bg-gray-100 border-none rounded-full py-2 px-6 pl-12 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
            <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
            <i className="fas fa-exchange-alt"></i>
            <span>Compare</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-colors">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
