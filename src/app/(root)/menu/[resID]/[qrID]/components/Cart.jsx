"use client"

import { useState } from "react"
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Checkout from "./Checkout"

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, resID, qrID }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const handleCheckoutComplete = (orderData) => {
    setIsCheckoutOpen(false)
    onClose()
    // Here you would typically clear the cart and show confirmation
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg" style={{backgroundColor: 'rgb(15, 18, 15)', borderLeft: '2px solid rgb(212, 175, 55)'}}>
          <SheetHeader className="border-b pb-4" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
            <SheetTitle className="flex items-center" style={{color: 'rgb(212, 175, 55)'}}>
              <ShoppingBag className="h-6 w-6 mr-2" />
              Your Order
              <Badge className="ml-2" style={{backgroundColor: 'rgb(212, 175, 55)', color: 'rgb(15, 18, 15)'}}>
                {items.reduce((sum, item) => sum + item.quantity, 0)} items
              </Badge>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingBag className="h-20 w-20 mx-auto mb-4" style={{color: 'rgba(212, 175, 55, 0.6)'}} />
                  <h3 className="text-xl font-semibold mb-2" style={{color: 'rgb(212, 175, 55)'}}>Your cart is empty</h3>
                  <p className="text-gray-400">Add some delicious items to get started!</p>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto py-6 space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-start space-x-4 p-4 rounded-xl border transition-all hover:shadow-lg"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.05)',
                        borderColor: 'rgba(212, 175, 55, 0.2)',
                      }}
                    >
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div 
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{backgroundColor: 'rgb(212, 175, 55)', color: 'rgb(15, 18, 15)'}}
                        >
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-lg mb-1" style={{color: 'rgb(212, 175, 55)'}}>{item.name}</h4>
                            <p className="text-sm text-gray-300 mb-2 line-clamp-2">{item.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold" style={{color: 'rgb(212, 175, 55)'}}>${item.price.toFixed(2)}</span>
                              <span className="text-sm text-gray-400">each</span>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3 bg-black/30 rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-md hover:bg-red-500/20 text-red-400 hover:text-red-300"
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <span 
                              className="w-8 text-center font-bold text-lg"
                              style={{color: 'rgb(212, 175, 55)'}}
                            >
                              {item.quantity}
                            </span>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-md hover:bg-green-500/20 text-green-400 hover:text-green-300"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold" style={{color: 'rgb(212, 175, 55)'}}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-400">total</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div 
                  className="border-t pt-6 space-y-4 rounded-t-xl p-4 -mx-2"
                  style={{
                    borderColor: 'rgba(212, 175, 55, 0.3)',
                    backgroundColor: 'rgba(212, 175, 55, 0.08)'
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-300">Subtotal</span>
                      <span style={{color: 'rgb(212, 175, 55)'}} className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-300">Tax (10%)</span>
                      <span style={{color: 'rgb(212, 175, 55)'}} className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <Separator style={{backgroundColor: 'rgba(212, 175, 55, 0.3)'}} />
                    <div className="flex justify-between text-2xl font-bold">
                      <span style={{color: 'rgb(212, 175, 55)'}}>Total</span>
                      <span style={{color: 'rgb(212, 175, 55)'}}>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full font-bold py-4 text-lg rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: 'rgb(212, 175, 55)',
                      color: 'rgb(15, 18, 15)',
                    }}
                    size="lg"
                  >
                    Proceed to Checkout → ${total.toFixed(2)}
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={items}
        total={total}
        onComplete={handleCheckoutComplete}
        resID={resID}
        qrID={qrID}
      />
    </>
  )
}