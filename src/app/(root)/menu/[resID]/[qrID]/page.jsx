"use client"

import React, { useState } from 'react'
import Header from './components/Header'
import MenuItems from './components/MenuItems' 
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import OrderTracker from './components/OrderTracker'
import Footer from './components/Footer'

export default function Page() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialInstructions: ""
  })

  // Cart Functions
  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id)
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id))
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  // Calculations
  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getTax = () => {
    return getSubtotal() * 0.1
  }

  const getTotal = () => {
    return getSubtotal() + getTax()
  }

  // Checkout Functions
  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  const handleCheckoutComplete = (newOrderData) => {
    setOrderData(newOrderData)
    setShowConfirmation(true)
    setIsCheckoutOpen(false)
    
    // Reset cart and form
    setTimeout(() => {
      setCartItems([])
      setCheckoutForm({
        name: "",
        email: "",
        phone: "",
        specialInstructions: ""
      })
    }, 1000)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    setOrderData(null)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(15, 18, 15)' }}>
      {/* Header */}
      <Header 
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onTrackOrderClick={() => setIsOrderTrackerOpen(true)}
      />

      {/* Main Content */}
      <main>
       <MenuItems
  activeCategory={activeCategory}
  onCategoryChange={setActiveCategory}
  cart={cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})}
  onQuantityChange={(item, qty) => {
    if (qty === 0) updateQuantity(item.id, 0)
    else addToCart({ ...item, quantity: qty - (cartItems.find(i => i.id === item.id)?.quantity || 0) })
  }}
/>

      </main>

      {/* Footer */}
      <Footer />

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        subtotal={getSubtotal()}
        tax={getTax()}
        total={getTotal()}
      />

      {/* Checkout */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={getTotal()}
        onComplete={handleCheckoutComplete}
        formData={checkoutForm}
        setFormData={setCheckoutForm}
      />

      {/* Order Confirmation */}
      <OrderConfirmation
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        orderData={orderData}
      />

      {/* Order Tracker */}
      <OrderTracker
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />
    </div>
  )
}