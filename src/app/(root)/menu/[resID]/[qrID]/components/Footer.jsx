import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="card-bg border-t border-accent mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Restaurant Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-accent text-luxury">Restaurant Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-forest-200">123 Food Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-forest-200">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-forest-200">info@restaurant.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-accent text-luxury">Opening Hours</h3>
            <div className="space-y-1 text-sm text-forest-200">
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
            <h3 className="text-lg font-semibold text-accent text-luxury">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-forest-200 hover:text-accent transition-colors">
                About Us
              </a>
              <a href="#" className="block text-forest-200 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-forest-200 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-forest-200 hover:text-accent transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-accent/30 mt-6 pt-6 text-center">
          <p className="text-sm text-forest-300">© 2024 Restaurant Food Order System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}