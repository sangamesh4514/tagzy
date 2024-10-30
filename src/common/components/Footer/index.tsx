/* eslint-disable jsx-a11y/anchor-is-valid */
import { Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">TagZy</h3>
            <p className="text-sm text-gray-600">
              Your one-stop marketplace for local services. Find trusted professionals for all your needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/tagzy.in/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-teal-600">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </a>
              <a href="https://twitter.com/_tagzy" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-teal-600">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </a>
              <a href="https://www.youtube.com/@tagzydotin" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-teal-600">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600">
                  Contact Us
                </a>
              </li>
              {/* <li>
                <a href="/careers" className="text-gray-600 hover:text-teal-600">
                  Careers
                </a>
              </li> */}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm">
              {/* <li>
                <a href="/privacyPolicy" className="text-gray-600 hover:text-teal-600">
                  Help Center
                </a>
              </li> */}
              <li>
                <a href="/privacyPolicy" className="text-gray-600 hover:text-teal-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/privacyPolicy" className="text-gray-600 hover:text-teal-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacyPolicy" className="text-gray-600 hover:text-teal-600">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Get the App</h3>
            <div className="flex flex-col space-y-3">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="/assets/appstore.jpeg"
                  alt="Download on the App Store"
                  className="h-10"
                  width = '140px'
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.tagzy.hire_pro" target="_blank" rel="noopener noreferrer">
                <img
                  src="/assets/playStore.jpeg"
                  alt="Get it on Google Play"
                  className="h-10"
                  width = '140px'
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600" style={{whiteSpace: 'nowrap'}}>
            © 2024 by TagZy. All rights reserved.
          </div>
          {/* <div className="flex space-x-6 text-sm text-gray-600">
            <a href="/sitemap" className="hover:text-teal-600">
              Sitemap
            </a>
            <a href="/accessibility" className="hover:text-teal-600">
              Accessibility
            </a>
            <a href="/cookies" className="hover:text-teal-600">
              Cookie Policy
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  )
}