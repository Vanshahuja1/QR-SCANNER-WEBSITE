"use client"

import React, { useState, Fragment } from "react"
import { Plus, Minus } from "lucide-react"

const menuData = [
  { id: "app1", name: "Grilled Chicken Breast", description: "Tender grilled chicken with herbs and spices", price: 12.99, image: "https://plus.unsplash.com/premium_photo-1661419883163-bb4df1c10109?w=600&auto=format&fit=crop&q=60", category: "Appetizers" },
  { id: "app2", name: "Caesar Salad", description: "Fresh romaine lettuce with parmesan and croutons", price: 8.99, image: "https://images.unsplash.com/photo-1669283714145-f97867f6c238?w=600&auto=format&fit=crop&q=60", category: "Appetizers" },
  { id: "main1", name: "Beef Steak", description: "Premium cut beef steak cooked to perfection", price: 24.99, image: "https://plus.unsplash.com/premium_photo-1669261882102-8f51c8b113c9?q=80&w=687&auto=format&fit=crop&q=60", category: "Main Courses" },
  { id: "des1", name: "Chocolate Cake", description: "Rich dark chocolate cake with berry compote", price: 7.99, image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=1000&auto=format&fit=crop&q=60", category: "Desserts" },
  { id: "app3", name: "Chicken Wings", description: "Spicy and crispy chicken wings", price: 10.99, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=1000&auto=format&fit=crop&q=60", category: "Appetizers" },
  { id: "main2", name: "Grilled Salmon", description: "Salmon fillet grilled to perfection", price: 18.99, image: "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?w=1000&auto=format&fit=crop&q=60", category: "Main Courses" },
  { id: "des2", name: "Cheesecake", description: "Creamy cheesecake with a graham cracker crust", price: 5.99, image: "https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?w=1000&auto=format&fit=crop&q=60", category: "Desserts" },
  { id: "drink2", name: "Iced Coffee", description: "Chilled coffee with a hint of vanilla", price: 3.99, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1000&auto=format&fit=crop&q=60", category: "Drinks" },
]

const categories = ["All", "Appetizers", "Main Courses", "Desserts", "Drinks"]

function MobileMenuItem({ item, quantity, onQuantityChange }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="py-0.5 block md:hidden cursor-pointer">
      <div 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="flex items-center gap-2 bg-[#510400] rounded-lg p-2 border border-[#B76E79]"
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-1/5 h-16 object-cover rounded-md flex-shrink-0" 
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white leading-tight">{item.name}</h3>
          <p className="text-xs text-[#E7B2A4] font-bold">${item.price.toFixed(2)}</p>
        </div>
        {quantity > 0 ? (
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); onQuantityChange(item, quantity - 1) }} 
              className="p-1 rounded bg-[#E7B2A4] text-white"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm text-white w-5 text-center">{quantity}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); onQuantityChange(item, quantity + 1) }} 
              className="p-1 rounded bg-[#E7B2A4] text-white"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button 
            onClick={(e) => { e.stopPropagation(); onQuantityChange(item, 1) }} 
            className="p-1 rounded-full bg-[#E7B2A4] text-white flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {isExpanded && (
        <p className="text-xs text-gray-200 mt-1 ml-1">{item.description}</p>
      )}
    </div>
  )
}


function DesktopMenuItem({ item, quantity, onQuantityChange }) {
  return (
    <div className="py-0.5 hidden md:flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border bg-[#510400] border-[#B76E79] cursor-pointer">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-2 text-[#E7B2A4]">{item.name}</h3>
        <p className="text-gray-200 text-sm mb-4 flex-1">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#E7B2A4]">${item.price.toFixed(2)}</span>
          {quantity > 0 ? (
            <div className="flex items-center gap-1">
              <button onClick={() => onQuantityChange(item, quantity - 1)} className="p-1 rounded bg-[#E7B2A4] text-white">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-bold">{quantity}</span>
              <button onClick={() => onQuantityChange(item, quantity + 1)} className="p-1 rounded bg-[#E7B2A4] text-white">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => onQuantityChange(item, 1)} className="p-2 rounded-full bg-[#E7B2A4] text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MenuItems({ activeCategory, onCategoryChange, cart, onQuantityChange }) {
  const filteredItems = activeCategory === "All" 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory)

  return (
    <div className="px-2 py-4">
      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-2 py-1 rounded-full transition text-xs md:text-sm md:px-3 md:py-2 font-semibold ${
              activeCategory === cat ? "bg-[#E7B2A4] text-white" : "border border-[#E7B2A4] text-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile Items */}
      <div className="space-y-1">
        {filteredItems.map((item, index) => (
          <div key={item.id || index}>
            {item.id && (
              <MobileMenuItem
                item={item}
                quantity={cart[item.id] || 0}
                onQuantityChange={onQuantityChange}
              />
            )}

            {activeCategory === "All" && index === Math.floor(filteredItems.length / 2) && (
              <div className="w-full my-4">
                <img
                  src="/Advertisment.jpg"
                  alt="Advertisement"
                  className="w-full h-15 md:h-40 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Items */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => {
          if (
            activeCategory === "All" &&
            index === Math.floor(filteredItems.length / 2)
          ) {
            return (
              <React.Fragment key={`ad-${index}`}>
                <DesktopMenuItem
                  item={item}
                  quantity={cart[item.id] || 0}
                  onQuantityChange={onQuantityChange}
                />
              </React.Fragment>
            )
          }

          return (
            <DesktopMenuItem
              key={item.id || index}
              item={item}
              quantity={cart[item.id] || 0}
              onQuantityChange={onQuantityChange}
            />
          )
        })}
      </div>
    </div>
  )
}
