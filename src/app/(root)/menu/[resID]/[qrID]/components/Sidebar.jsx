"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "appetizers", name: "Appetizers" },
  { id: "main", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
  { id: "specials", name: "Specials" },
]

export default function Sidebar({ activeCategory, onCategoryChange, isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 
        content-panel m-6 p-6
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <h2 className="luxury-title text-xl">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="bronze-accent hover:bronze-bg">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategoryChange(category.id)
                onClose()
              }}
              className={`
                w-full text-left p-4 rounded-lg transition-all font-medium
                ${
                  activeCategory === category.id
                    ? "bronze-bg text-forest-dark"
                    : "elegant-text hover:bronze-bg hover:text-forest-dark"
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}