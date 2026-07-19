"use client";

import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-astrian-cream dark:bg-[#1c1f1d] border-t border-astrian-clay dark:border-white/5 py-16 text-astrian-charcoal dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand / Logo */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-display tracking-tight text-astrian-charcoal dark:text-gray-100">
            <div className="h-8 w-8 rounded-full bg-astrian-sage flex items-center justify-center text-white">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <span>Astrion</span>
          </Link>
          <p className="text-sm text-astrian-charcoal/60 dark:text-gray-400 leading-relaxed font-light max-w-sm">
            A serene sanctuary dedicated to mindful movement, holistic wellness, and community connection. Join us to move, breathe, and transform.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram" className="h-8 w-8 rounded-full border border-astrian-clay dark:border-white/10 flex items-center justify-center text-astrian-charcoal/60 dark:text-gray-400 hover:text-astrian-sage dark:hover:text-astrian-leaf hover:border-astrian-sage dark:hover:border-astrian-leaf transition-all duration-300">
              <svg className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="h-8 w-8 rounded-full border border-astrian-clay dark:border-white/10 flex items-center justify-center text-astrian-charcoal/60 dark:text-gray-400 hover:text-astrian-sage dark:hover:text-astrian-leaf hover:border-astrian-sage dark:hover:border-astrian-leaf transition-all duration-300">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-astrian-sage dark:text-astrian-leaf">Explore</h4>
          <nav className="flex flex-col gap-2.5 text-sm font-medium">
            <Link href="/classes" className="text-astrian-charcoal/70 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">
              Classes
            </Link>
            <Link href="/schedule" className="text-astrian-charcoal/70 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">
              Schedule
            </Link>
            <Link href="/instructors" className="text-astrian-charcoal/70 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">
              Instructors
            </Link>
            <Link href="/gallery" className="text-astrian-charcoal/70 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">
              Gallery
            </Link>
            <Link href="/faq" className="text-astrian-charcoal/70 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="text-astrian-charcoal/70 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-astrian-charcoal/70 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        {/* Studio Info */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-astrian-sage dark:text-astrian-leaf">Contact & Hours</h4>
          <div className="space-y-3 text-sm text-astrian-charcoal/70 dark:text-gray-300 font-light">
            <Link href="/contact?map=1" className="flex items-start gap-2.5 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors cursor-pointer group">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-astrian-sage dark:text-astrian-leaf group-hover:scale-110 transition-transform" />
              <span>120 Serenity Lane, Wellness District, CA 90210</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-astrian-sage dark:text-astrian-leaf" />
              <span>(555) 234-5678</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-astrian-sage dark:text-astrian-leaf" />
              <span>hello@astrionstudio.com</span>
            </div>
            <div className="pt-2 border-t border-astrian-clay/60 dark:border-white/5">
              <p className="font-semibold text-astrian-charcoal dark:text-gray-100 mb-0.5">Opening Hours</p>
              <p className="text-xs">Mon - Fri: 6:00 AM - 9:00 PM</p>
              <p className="text-xs">Sat - Sun: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-astrian-clay/40 dark:border-white/5 flex flex-col sm:flex-row justify-between text-xs text-astrian-charcoal/40 dark:text-gray-500 font-medium">
        <p>© {currentYear} Astrion Studio. All rights reserved.</p>
        <p className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}
