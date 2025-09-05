"use client"

import { useState } from "react"
import { Search, Clock, CheckCircle, Truck, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const orderStatuses = {
  accepted: { label: "Accepted", icon: CheckCircle, color: "bg-green-500" },
  processing: { label: "Processing", icon: Clock, color: "bg-yellow-500" },
  cooked: { label: "Cooked", icon: ChefHat, color: "bg-blue-500" },
  delivered: { label: "Delivered", icon: Truck, color: "bg-green-600" },
}

// Mock order data
const mockOrders = {
  ORD001: {
    id: "ORD001",
    status: "processing",
    items: ["Grilled Chicken", "Caesar Salad"],
    total: 24.99,
    estimatedTime: "15-20 mins",
  },
  ORD002: {
    id: "ORD002",
    status: "cooked",
    items: ["Pasta Carbonara", "Garlic Bread"],
    total: 18.5,
    estimatedTime: "5 mins",
  },
}

export default function OrderTracker({ isOpen, onClose }) {
  const [orderId, setOrderId] = useState("")
  const [searchedOrder, setSearchedOrder] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const order = mockOrders[orderId]
      setSearchedOrder(order || null)
      setIsSearching(false)
    }, 1000)
  }

  const renderStatusTimeline = (currentStatus) => {
    const statuses = ["accepted", "processing", "cooked", "delivered"]
    const currentIndex = statuses.indexOf(currentStatus)

    return (
      <div className="flex items-center justify-between mt-6">
        {statuses.map((status, index) => {
          const StatusIcon = orderStatuses[status].icon
          const isActive = index <= currentIndex
          const isCurrent = index === currentIndex

          return (
            <div key={status} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? orderStatuses[status].color : "bg-gray-300"
                } ${isCurrent ? "ring-4 ring-accent" : ""}`}
              >
                <StatusIcon className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xs mt-2 ${isActive ? "text-accent" : "text-gray-500"}`}>
                {orderStatuses[status].label}
              </span>
              {index < statuses.length - 1 && (
                <div className={`h-1 w-full mt-2 ${index < currentIndex ? "bg-accent" : "bg-gray-300"}`} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card-bg border-accent max-w-md">
        <DialogHeader>
          <DialogTitle className="text-accent text-luxury">Track Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter Order ID (e.g., ORD001)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="border-accent bg-burgundy-800 text-forest-200 placeholder:text-forest-300"
            />
            <Button
              onClick={handleSearch}
              disabled={!orderId || isSearching}
              className="bg-accent text-burgundy-900 hover:bg-accent/90"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {isSearching && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
              <p className="text-forest-200 mt-2">Searching for your order...</p>
            </div>
          )}

          {searchedOrder && (
            <div className="border border-accent rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-accent">Order {searchedOrder.id}</h3>
                  <p className="text-sm text-forest-200">Estimated time: {searchedOrder.estimatedTime}</p>
                </div>
                <Badge className="bg-accent text-burgundy-900">
                  {orderStatuses[searchedOrder.status].label}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium text-accent mb-2">Items:</h4>
                <ul className="text-sm text-forest-200 space-y-1">
                  {searchedOrder.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="text-right">
                <span className="text-lg font-semibold text-accent">${searchedOrder.total}</span>
              </div>

              {renderStatusTimeline(searchedOrder.status)}
            </div>
          )}

          {orderId && !searchedOrder && !isSearching && (
            <div className="text-center py-4">
              <p className="text-forest-300">Order not found. Please check your Order ID.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}