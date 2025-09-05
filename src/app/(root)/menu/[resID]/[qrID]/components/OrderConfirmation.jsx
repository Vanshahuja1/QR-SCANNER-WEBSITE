"use client"

import { CheckCircle, Clock, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmation({ isOpen, onClose, orderData }) {
  if (!orderData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card-bg border-accent max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-accent text-luxury" style={{color: 'rgb(212, 175, 55)'}}>Order Confirmed!</h2>
                <p className="text-forest-200 text-sm mt-1">Thank you for your order</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Details */}
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-accent"style={{color: 'rgb(212, 175, 55)'}}>#{orderData.orderId}</div>
            <Badge className="bg-green-500 text-white">
              {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
            </Badge>
          </div>

          {/* Estimated Time */}
          <div className="flex items-center justify-center space-x-2 p-3 border border-accent/30 rounded-lg">
            <Clock className="h-5 w-5 text-orange-300" />
            <span className="text-forest-200">Estimated time: </span>
            <span className="font-semibold text-accent"style={{color: 'rgb(212, 175, 55)'}}>{orderData.estimatedTime}</span>
          </div>

          {/* Customer Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-accent"style={{color: 'rgb(212, 175, 55)'}}>Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent"style={{color: 'rgb(212, 175, 55)'}} />
                <span className="text-forest-200">Table: {orderData.qrID}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" style={{color: 'rgb(212, 175, 55)'}}/>
                <span className="text-forest-200">{orderData.customerInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold" style={{color: 'rgb(212, 175, 55)'}}>Items Ordered</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-800">
                    {item.quantity}x {item.name}
                  </span>
                  <span style={{color: 'rgb(212, 175, 55)'}}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator style={{backgroundColor: 'rgba(212, 175, 55, 0.3)'}} />
            <div className="flex justify-between items-center font-semibold">
              <span style={{color: 'rgb(212, 175, 55)'}}>Total</span>
              <span style={{color: 'rgb(212, 175, 55)'}}>${orderData.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Special Instructions */}
          {orderData.customerInfo.specialInstructions && (
            <div className="space-y-2">
              <h3 className="font-semibold" style={{color: 'rgb(212, 175, 55)'}}>Special Instructions</h3>
              <p 
                className="text-sm text-gray-300 p-2 border rounded"
                style={{
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                  backgroundColor: 'rgba(212, 175, 55, 0.05)'
                }}
              >
                {orderData.customerInfo.specialInstructions}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <p className="text-xs text-center text-gray-400">
              A confirmation email has been sent to {orderData.customerInfo.email}
            </p>

            <Button 
              onClick={onClose} 
              className="w-full font-bold py-3 rounded-lg transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{
                backgroundColor: 'rgb(212, 175, 55)',
                color: 'rgb(15, 18, 15)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(212, 175, 55, 0.9)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgb(212, 175, 55)'
              }}
            >
              Continue Browsing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}