"use client"

import { CreditCard, User, Mail, Phone, CheckCircle, X } from "lucide-react"

export default function Checkout({ 
  isOpen, 
  onClose, 
  items, 
  total, 
  onComplete,
  formData,
  setFormData 
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const orderData = {
      orderId: `ORD${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      customerInfo: formData,
      items,
      total,
      timestamp: new Date().toISOString(),
      status: "accepted",
      estimatedTime: "20-25 mins"
    }

    onComplete(orderData)
  }

  const isFormValid = formData.name && formData.email && formData.phone

  return (
    <>
      {/* Checkout Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
          <div className="relative rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2" style={{ backgroundColor: 'rgb(15, 18, 15)', borderColor: 'rgb(212, 175, 55)' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center" style={{ color: 'rgb(212, 175, 55)' }}>
                  <CreditCard className="h-6 w-6 mr-2" />
                  Checkout
                </h2>
                <button onClick={onClose} style={{ color: 'rgb(212, 175, 55)' }}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: 'rgb(212, 175, 55)' }}>Customer Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="h-4 w-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border-2 text-white"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border-2 text-white"
                        style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border-2 text-white"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border-2 text-white"
                      style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)' }}
                      placeholder="Any special requests or dietary requirements..."
                    />
                  </div>
                </div>

                <hr style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: 'rgb(212, 175, 55)' }}>Order Summary</h3>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.quantity}x {item.name}</span>
                        <span style={{ color: 'rgb(212, 175, 55)' }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <hr style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />
                  <div className="flex justify-between text-lg font-bold">
                    <span style={{ color: 'rgb(212, 175, 55)' }}>Total</span>
                    <span style={{ color: 'rgb(212, 175, 55)' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-colors"
                    style={{ borderColor: 'rgb(212, 175, 55)', color: 'rgb(212, 175, 55)', backgroundColor: 'transparent' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="flex-1 py-3 px-6 rounded-lg font-bold transition-all hover:scale-[1.02] disabled:opacity-50"
                    style={{ backgroundColor: 'rgb(212, 175, 55)', color: 'rgb(15, 18, 15)' }}
                  >
                    <CheckCircle className="h-4 w-4 inline mr-2" />
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}