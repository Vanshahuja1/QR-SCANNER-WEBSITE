"use client";
import React, { useState } from 'react';
import { ShoppingCart, Crown, Utensils, Coffee, Cake, Wine, Star, QrCode, Menu, X } from 'lucide-react';

export default function FoodOrderSystem() {
  const [activeTab, setActiveTab] = useState('appetizers');
  const [cartCount, setCartCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = {
    appetizers: [
      { name: 'Toran Srond Eeling', description: 'Ferned fiber', price: '$12', image: '🍤' },
      { name: 'Artisan Bruschetta', description: 'Heirloom tomatoes & basil', price: '$14', image: '🥖' },
    ],
    mainCourses: [
      { name: 'Toran Srond Eeling', description: 'Ferned fiber', price: '$28', image: '🍖' },
      { name: 'Toran Frond Eeling', description: 'Ferned fiber', price: '$32', image: '🥘' },
      { name: 'Royal Wellington', description: 'Premium beef tenderloin', price: '$45', image: '🥩' },
    ],
    desserts: [
      { name: 'Sengeling', description: 'Unonamed gyloentarion tibue date', price: '$16', image: '🍰' },
      { name: 'Compinge', description: 'Onoamed belletis cond attertoid', price: '$18', image: '🧁' },
    ],
    drinks: [
      { name: 'Conting', description: 'Encamscold ohermationaland qu girrt', price: '$8', image: '🍷' },
      { name: 'Golden Elixir', description: 'Honey-infused botanical blend', price: '$12', image: '🥃' },
    ]
  };

  const sidebarItems = [
    { icon: Crown, label: 'Majorities', active: false },
    { icon: Utensils, label: 'Eigodince', active: false },
    { icon: Coffee, label: 'Cooramatln', active: true },
    { icon: Star, label: 'Frentemte', active: false },
    { icon: Wine, label: 'Retnaetee', active: false },
    { icon: Cake, label: 'Ssenolognt', active: false },
  ];

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-burgundy-100 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-bronze-500 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-bronze-500 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-16 h-16 border-2 border-bronze-500 rounded-full"></div>
      </div>

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <div className="w-64 bg-forest-900/90 backdrop-blur-sm border-r border-bronze-500/30 hidden lg:block">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-bronze-gradient rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-luxury text-lg font-bold">Royal Dining</span>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-luxury transition-all duration-300 ${
                    item.active 
                      ? 'bg-bronze-500/20 text-bronze-400 border-l-4 border-bronze-500' 
                      : 'text-forest-300 hover:text-bronze-400 hover:bg-bronze-500/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-forest-800/80 backdrop-blur-sm border-b border-bronze-500/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  className="lg:hidden text-bronze-500"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-luxury">Food Order System</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="relative bg-bronze-500 hover:bg-bronze-600 text-white p-2 rounded-luxury transition-all duration-300 shadow-bronze">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-burgundy-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>
                <div className="text-bronze-400 font-bold">$10.30</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex gap-8 mt-6">
              {['appetizers', 'scantloor', 'oaderter', 'senetat'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(['appetizers', 'mainCourses', 'desserts', 'drinks'][index])}
                  className={`px-4 py-2 font-medium transition-all duration-300 ${
                    (index === 0 && activeTab === 'appetizers') ||
                    (index === 1 && activeTab === 'mainCourses') ||
                    (index === 2 && activeTab === 'desserts') ||
                    (index === 3 && activeTab === 'drinks')
                      ? 'text-bronze-500 border-b-2 border-bronze-500' 
                      : 'text-forest-300 hover:text-bronze-400'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </header>

          {/* Content Area */}
          <div className="flex-1 flex">
            {/* Menu Section */}
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Appetizers/Main Courses */}
                <div>
                  <h2 className="text-xl font-bold text-bronze-500 mb-6 uppercase tracking-wider">
                    {activeTab === 'appetizers' ? 'Appetizers' : 
                     activeTab === 'mainCourses' ? 'Main Courses' : 
                     activeTab === 'desserts' ? 'Desserts' : 'Drinks'}
                  </h2>
                  <div className="space-y-4">
                    {menuItems[activeTab]?.map((item, index) => (
                      <div 
                        key={index}
                        className="bg-card-gradient rounded-card border border-bronze-500/30 p-4 hover:shadow-luxury transition-all duration-300 cursor-pointer group"
                        onClick={addToCart}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-bronze-500/20 rounded-luxury flex items-center justify-center text-2xl">
                            {item.image}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-bronze-400 font-semibold text-lg group-hover:text-bronze-300 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-forest-300 text-sm mt-1">{item.description}</p>
                            <div className="text-bronze-500 font-bold mt-2">{item.price}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-burgundy-800 border-2 border-bronze-500 rounded-luxury p-8 shadow-luxury">
                    <h3 className="text-bronze-500 font-bold text-xl mb-6 text-center">SCAN MENU</h3>
                    <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-6">
                      <QrCode className="w-32 h-32 text-burgundy-900" />
                    </div>
                    <button className="w-full bg-bronze-gradient hover:shadow-bronze-lg text-white font-semibold py-3 px-6 rounded-luxury transition-all duration-300">
                      SCAN MENU
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="w-80 bg-forest-800/60 backdrop-blur-sm border-l border-bronze-500/30 p-6 hidden xl:block">
              <h3 className="text-bronze-500 font-bold text-lg mb-6">ORDER SUMMARY</h3>
              
              {/* Menu Items */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-bronze-400 font-semibold mb-3">Sengeling</h4>
                  <p className="text-forest-300 text-sm">Unonamed gyloentarion tibue date angeletemes</p>
                  <div className="text-bronze-500 font-bold mt-2">$16</div>
                </div>

                <div>
                  <h4 className="text-bronze-400 font-semibold mb-3">Compinge</h4>
                  <p className="text-forest-300 text-sm">Onoamed belletis cond attertoid angeleteg</p>
                  <div className="text-bronze-500 font-bold mt-2">$18</div>
                </div>

                <div>
                  <h4 className="text-bronze-400 font-semibold mb-3">Conting</h4>
                  <p className="text-forest-300 text-sm">Encamscoid ohermationaland qu girrt angrefettens</p>
                  <div className="text-bronze-500 font-bold mt-2">$12</div>
                </div>
              </div>

              {/* Food Image */}
              <div className="mt-8">
                <div className="w-full h-48 bg-bronze-500/10 rounded-luxury border border-bronze-500/30 flex items-center justify-center">
                  <div className="text-6xl">🍽️</div>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t border-bronze-500/30">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-bronze-500">Total:</span>
                  <span className="text-bronze-400">$46.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-burgundy-900/95 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-luxury text-xl font-bold">Menu</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-bronze-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-4">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-luxury transition-all duration-300 ${
                    item.active 
                      ? 'bg-bronze-500/20 text-bronze-400' 
                      : 'text-forest-300 hover:text-bronze-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}