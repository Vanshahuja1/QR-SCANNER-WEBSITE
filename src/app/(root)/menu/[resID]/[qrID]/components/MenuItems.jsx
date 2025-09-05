"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const menuData = {
  appetizers: [
    {
      id: "app1",
      name: "Grilled Chicken Breast",
      description: "Tender grilled chicken with herbs and spices",
      price: 12.99,
      image: "/grilled-chicken-breast.png",
    },
    {
      id: "app2",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with parmesan and croutons",
      price: 8.99,
      image: "/caesar-salad.png",
    },
    {
      id: "app3",
      name: "Bruschetta",
      description: "Toasted bread with fresh tomatoes and basil",
      price: 9.99,
      image: "/grilled-chicken-breast.png",
    },
    {
      id: "app4",
      name: "Soup of the Day",
      description: "Chef's special seasonal soup creation",
      price: 7.99,
      image: "/caesar-salad.png",
    },
  ],
  main: [
    {
      id: "main1",
      name: "Beef Steak",
      description: "Premium cut beef steak cooked to perfection",
      price: 24.99,
      image: "/juicy-beef-steak.png",
    },
    {
      id: "main2",
      name: "Pasta Carbonara",
      description: "Classic Italian pasta with pancetta and parmesan",
      price: 22.99,
      image: "/pasta-carbonara.png",
    },
    {
      id: "main3",
      name: "Salmon Fillet",
      description: "Fresh Atlantic salmon with lemon butter sauce",
      price: 26.99,
      image: "/juicy-beef-steak.png",
    },
    {
      id: "main4",
      name: "Vegetarian Risotto",
      description: "Creamy risotto with seasonal vegetables",
      price: 19.99,
      image: "/pasta-carbonara.png",
    },
  ],
  desserts: [
    {
      id: "des1",
      name: "Chocolate Cake",
      description: "Rich dark chocolate cake with berry compote",
      price: 7.99,
      image: "/decadent-chocolate-cake.png",
    },
    {
      id: "des2",
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: 8.99,
      image: "/decadent-chocolate-cake.png",
    },
  ],
  drinks: [
    {
      id: "drink1",
      name: "Fresh Orange Juice",
      description: "Freshly squeezed premium orange juice",
      price: 4.99,
      image: "/glass-of-orange-juice.png",
    },
    {
      id: "drink2",
      name: "Espresso",
      description: "Rich Italian espresso coffee",
      price: 3.99,
      image: "/glass-of-orange-juice.png",
    },
    {
      id: "drink3",
      name: "House Wine",
      description: "Selection of red or white house wines",
      price: 6.99,
      image: "/glass-of-orange-juice.png",
    },
  ],
}

export default function MenuItems({ activeCategory, onAddToCart }) {
  const items = menuData[activeCategory] || []
  const categoryTitles = {
    appetizers: "APPETIZERS",
    main: "MAIN COURSES",
    desserts: "DESSERTS",
    drinks: "DRINKS",
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-2">
          {categoryTitles[activeCategory]}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-600 mx-auto rounded-full"></div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-amber-200/20"
          >
            {/* Image Container */}
            <div className="relative h-48 sm:h-40 lg:h-48 overflow-hidden">
              <img 
                src={item.image || "/placeholder.svg"} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              
              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                ${item.price}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
              <h3 className="text-amber-100 font-semibold text-lg sm:text-xl mb-2 leading-tight">
                {item.name}
              </h3>
              
              <p className="text-slate-300 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              {/* Add to Cart Button */}
              <Button
                onClick={() => onAddToCart(item)}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-16">
          <div className="elegant-text-muted text-lg">
            No items available in this category
          </div>
        </div>
      )}

      {/* Mobile Optimization Info */}
      <div className="mt-8 text-center">
        <p className="elegant-text-muted text-sm">
          Showing {items.length} item{items.length !== 1 ? 's' : ''} in {(categoryTitles[activeCategory] || 'menu').toLowerCase()}
        </p>
      </div>
    </div>
  )
}