"use client"

import React, { useState } from "react"
import { CreditCard, User, Mail, Phone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import OrderConfirmation from "./OrderConfirmation"

export default function Checkout({ isOpen, onClose, items, total, onComplete, resID, qrID }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialInstructions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderData, setOrderData] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      const newOrderData = {
        orderId: `ORD${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        customerInfo: formData,
        items,
        total,
        resID,
        qrID,
        timestamp: new Date().toISOString(),
        status: "accepted",
        estimatedTime: "20-25 mins",
      }

      setOrderData(newOrderData)
      setShowConfirmation(true)
      setIsSubmitting(false)
    }, 2000)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    onComplete(orderData)
    onClose()
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialInstructions: "",
    })
  }

  const isFormValid = formData.name && formData.email && formData.phone

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-2xl max-h-[90vh] overflow-y-auto border-2"
          style={{
            backgroundColor: 'rgb(15, 18, 15)',
            borderColor: 'rgb(212, 175, 55)'
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-bold" style={{color: 'rgb(212, 175, 55)'}}>
              <CreditCard className="h-6 w-6 mr-2" />
              Checkout
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: 'rgb(212, 175, 55)'}}>Customer Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-2 text-white focus:ring-2 focus:ring-opacity-50"
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.05)',
                      borderColor: 'rgba(212, 175, 55, 0.2)',
                      focusBorderColor: 'rgb(212, 175, 55)',
                      focusRingColor: 'rgb(212, 175, 55)'
                    }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border-2 text-white focus:ring-2 focus:ring-opacity-50"
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.05)',
                      borderColor: 'rgba(212, 175, 55, 0.2)',
                      focusBorderColor: 'rgb(212, 175, 55)',
                      focusRingColor: 'rgb(212, 175, 55)'
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-2 text-white focus:ring-2 focus:ring-opacity-50"
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.05)',
                    borderColor: 'rgba(212, 175, 55, 0.2)',
                    focusBorderColor: 'rgb(212, 175, 55)',
                    focusRingColor: 'rgb(212, 175, 55)'
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions" className="text-gray-300">
                  Special Instructions (Optional)
                </Label>
                <Textarea
                  id="instructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                  className="border-2 text-white focus:ring-2 focus:ring-opacity-50"
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.05)',
                    borderColor: 'rgba(212, 175, 55, 0.2)',
                    focusBorderColor: 'rgb(212, 175, 55)',
                    focusRingColor: 'rgb(212, 175, 55)'
                  }}
                  placeholder="Any special requests or dietary requirements..."
                  rows={3}
                />
              </div>
            </div>

            <Separator style={{backgroundColor: 'rgba(212, 175, 55, 0.3)'}} />

            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{color: 'rgb(212, 175, 55)'}}>Order Summary</h3>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">
                      {item.quantity}x {item.name}
                    </span>
                    <span style={{color: 'rgb(212, 175, 55)'}} className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator style={{backgroundColor: 'rgba(212, 175, 55, 0.3)'}} />

              <div className="flex justify-between items-center text-lg font-semibold">
                <span style={{color: 'rgb(212, 175, 55)'}}>Total</span>
                <span style={{color: 'rgb(212, 175, 55)'}}>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-2 text-white hover:text-black transition-all hover:scale-[1.02]"
                style={{
                  borderColor: 'rgb(212, 175, 55)',
                  backgroundColor: 'transparent',
                  color: 'rgb(212, 175, 55)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgb(212, 175, 55)'
                  e.target.style.color = 'rgb(15, 18, 15)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = 'rgb(212, 175, 55)'
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="flex-1 font-bold py-3 rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  backgroundColor: 'rgb(212, 175, 55)',
                  color: 'rgb(15, 18, 15)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <div 
                      className="animate-spin rounded-full h-4 w-4 border-b-2 mr-2"
                      style={{borderColor: 'rgb(15, 18, 15)'}}
                    ></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {orderData && (
        <OrderConfirmation isOpen={showConfirmation} onClose={handleConfirmationClose} orderData={orderData} />
      )}
    </>
  )
}