// src/components/Footer.tsx
'use client'

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-purple-600 mb-6">
              Mu3lnen
            </h3>
            <p className="text-gray-500 dark:text-black-400">
              Kuwait&apos;s Leading Digital Marketing Agency, delivering exceptional results through innovative strategies.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Services</h4>
            <ul className="space-y-4">
              <li className="hover:text-purple-600 transition-colors duration-200">SEO Services</li>
              <li className="hover:text-purple-600 transition-colors duration-200">Social Media Marketing</li>
              <li className="hover:text-purple-600 transition-colors duration-200">Paid Advertising</li>
              <li className="hover:text-purple-600 transition-colors duration-200">Content Marketing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Contact</h4>
            <ul className="space-y-4">
              <li>Kuwait City, Kuwait</li>
              <li>info@Mu3lnen.com</li>
              <li>+965 XXXX XXXX</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-black-400 hover:text-purple-600 transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-black-400 hover:text-purple-600 transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-black-400 hover:text-purple-600 transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-black-400 hover:text-purple-600 transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 dark:text-black-400">
          <p>&copy; {new Date().getFullYear()} Mu3lnen Digital Marketing Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}