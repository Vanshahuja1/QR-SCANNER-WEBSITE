"use client"

import { Plus, Minus, Trash2, ShoppingBag, X } from "lucide-react"

// Cart Item Component
function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-xl border transition-all" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'rgb(212, 175, 55)', color: 'rgb(15, 18, 15)' }}>
          {item.quantity}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-lg mb-1" style={{ color: 'rgb(212, 175, 55)' }}>{item.name}</h4>
            <p className="text-sm text-gray-300 mb-2">{item.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ color: 'rgb(212, 175, 55)' }}>${item.price.toFixed(2)}</span>
              <span className="text-sm text-gray-400">each</span>
            </div>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3 bg-black/30 rounded-lg p-1">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
              className="w-8 h-8 rounded-md hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center justify-center transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="w-8 text-center font-bold text-lg" style={{ color: 'rgb(212, 175, 55)' }}>
              {item.quantity}
            </span>

            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-md hover:bg-green-500/20 text-green-400 hover:text-green-300 flex items-center justify-center transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold" style={{ color: 'rgb(212, 175, 55)' }}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="text-xs text-gray-400">total</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  subtotal,
  tax, 
  total 
}) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Cart Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-lg border-l-2" style={{ backgroundColor: 'rgb(15, 18, 15)', borderColor: 'rgb(212, 175, 55)' }}>
            <div className="flex flex-col h-full">
              <div className="border-b p-6" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center" style={{ color: 'rgb(212, 175, 55)' }}>
                    <ShoppingBag className="h-6 w-6 mr-2" />
                    <h2 className="text-xl font-bold">Your Order</h2>
                    <span className="ml-2 px-2 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'rgb(212, 175, 55)', color: 'rgb(15, 18, 15)' }}>
                      {totalItems} items
                    </span>
                  </div>
                  <button onClick={onClose} className="p-2" style={{ color: 'rgb(212, 175, 55)' }}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <ShoppingBag className="h-20 w-20 mx-auto mb-4" style={{ color: 'rgba(212, 175, 55, 0.6)' }} />
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(212, 175, 55)' }}>Your cart is empty</h3>
                    <p className="text-gray-400">Add some delicious items to get started!</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.map(item => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        onUpdateQuantity={onUpdateQuantity}
                        onRemove={onRemoveItem}
                      />
                    ))}
                  </div>

                  <div className="border-t p-6 space-y-4" style={{ borderColor: 'rgba(212, 175, 55, 0.3)', backgroundColor: 'rgba(212, 175, 55, 0.08)' }}>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Subtotal</span>
                        <span style={{ color: 'rgb(212, 175, 55)' }}>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Tax (10%)</span>
                        <span style={{ color: 'rgb(212, 175, 55)' }}>${tax.toFixed(2)}</span>
                      </div>
                      <hr style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />
                      <div className="flex justify-between text-xl font-bold">
                        <span style={{ color: 'rgb(212, 175, 55)' }}>Total</span>
                        <span style={{ color: 'rgb(212, 175, 55)' }}>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={onCheckout}
                      className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
                      style={{ backgroundColor: 'rgb(212, 175, 55)', color: 'rgb(15, 18, 15)' }}
                    >
                      Proceed to Checkout → ${total.toFixed(2)}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}