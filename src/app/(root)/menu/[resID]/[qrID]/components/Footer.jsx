import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t-2 mt-12" style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', borderColor: 'rgb(212, 175, 55)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Restaurant Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold" style={{ color: 'rgb(212, 175, 55)' }}>Restaurant Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" style={{ color: 'rgb(212, 175, 55)' }} />
                <span className="text-gray-300">123 Food Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" style={{ color: 'rgb(212, 175, 55)' }} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" style={{ color: 'rgb(212, 175, 55)' }} />
                <span className="text-gray-300">info@restaurant.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold" style={{ color: 'rgb(212, 175, 55)' }}>Opening Hours</h3>
            <div className="space-y-1 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Thursday</span>
                <span>11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday - Saturday</span>
                <span>11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold" style={{ color: 'rgb(212, 175, 55)' }}>Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">
                About Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 text-center" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}>
          <p className="text-sm text-gray-400">© 2024 Yamster Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}