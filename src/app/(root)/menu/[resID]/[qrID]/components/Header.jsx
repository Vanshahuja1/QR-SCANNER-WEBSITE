"use client"

import { ShoppingCart } from "lucide-react"

export default function Header({ cartItemsCount, onCartClick, restaurantName = "Yumster" }) {
  return (
    <header 
      className="sticky top-0 z-40 border-b-2" 
      style={{ 
        backgroundColor: 'rgba(15, 18, 15, 0.95)', 
        backdropFilter: 'blur(10px)', 
        borderColor: '#E7B2A4' 
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Restaurant Name */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl font-bold" 
              style={{ backgroundColor: '#E7B2A4', color: 'rgb(15, 18, 15)' }}
            >
              {restaurantName[0] /* First letter as logo */}
            </div>
            <h1 
              className="text-2xl font-bold" 
              style={{ color: '#E7B2A4' }}
            >
              {restaurantName}
            </h1>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: '#E7B2A4' }}
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 rounded bg-[#E7B2A4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
