"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import MenuItems from "./components/MenuItems"
import Cart from "./components/Cart"
import Footer from "./components/Footer"

export default function RestaurantMenuPage({ params }) {
  const [activeCategory, setActiveCategory] = useState("appetizers")
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [resolvedParams, setResolvedParams] = useState(null)

  // Resolve params on component mount
  useEffect(() => {
    const resolveParams = async () => {
      const awaitedParams = await params
      setResolvedParams(awaitedParams)
    }
    resolveParams()
  }, [params])

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  // Show loading state while params are being resolved
  if (!resolvedParams) {
    return (
      <div className="min-h-screen restaurant-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen restaurant-bg">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
        resID={resolvedParams.resID}
        qrID={resolvedParams.qrID}
      />

      <div className="flex min-h-[calc(100vh-80px)]">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 w-full lg:ml-64">
          <div className="p-3 sm:p-4 md:p-6">
            <MenuItems
              activeCategory={activeCategory}
              onAddToCart={addToCart}
              resID={resolvedParams.resID}
              qrID={resolvedParams.qrID}
            />
          </div>
        </main>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        resID={resolvedParams.resID}
        qrID={resolvedParams.qrID}
      />

      <Footer />
    </div>
  )
}