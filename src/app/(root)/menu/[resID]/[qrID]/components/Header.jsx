"use client"

import { useState } from "react"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import OrderTracker from "./OrderTracker"

export default function Header({ cartItemsCount, onCartClick, onMenuClick, resID, qrID }) {
  const [showOrderTracker, setShowOrderTracker] = useState(false)

  return (
    <>
      <header className="content-panel mx-6 mt-6 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Brand */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="lg:hidden"
                style={{color: 'rgb(212, 175, 55)'}}
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              <div className="flex items-center gap-3">
                <img 
                  src="/images/logo.png" 
                  alt="Yamster Logo" 
                  className="w-10 h-10 rounded-lg object-contain"
                />
                <h1 className="text-2xl font-bold tracking-tight" style={{color: 'rgb(212, 175, 55)'}}>
                  Yamster
                </h1>
              </div>
            </div>

            {/* Right side - Track Order and Cart */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowOrderTracker(true)} 
                className="hidden sm:inline-flex font-medium"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'rgb(212, 175, 55)',
                  color: 'rgb(212, 175, 55)'
                }}
              >
                Track Order
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onCartClick}
                className="relative"
                style={{color: 'rgb(212, 175, 55)'}}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <OrderTracker isOpen={showOrderTracker} onClose={() => setShowOrderTracker(false)} />
    </>
  )
}