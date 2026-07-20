"use client";

import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2D4632] text-[#F8F7F2] border-t border-[#8DA97B]/20 py-16 transition-colors duration-300 relative overflow-hidden">
      {/* Botanical background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-radial from-[#8DA97B]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">

        {/* Brand / Logo */}
        <div className="md:col-span-4 flex flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold font-display tracking-tight text-[#F8F7F2]">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#5D7555] to-[#8DA97B] flex items-center justify-center text-white shadow-md">
              <Sparkles className="h-4.5 w-4.5 text-[#F8F7F2]" />
            </div>
            <span className="font-semibold">Astrion <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#8DA97B]/20 text-[#8DA97B] ml-1">AI</span></span>
          </Link>
          <p className="text-xs text-[#C9D7C3] leading-relaxed font-light max-w-sm">
            A next-generation AI wellness sanctuary fusing ancient mindfulness practices with real-time posture tracking and tailored guided meditation.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full border border-[#8DA97B]/30 flex items-center justify-center text-[#C9D7C3] hover:text-white hover:border-[#8DA97B] hover:bg-[#8DA97B]/20 transition-all duration-300">
              <svg className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full border border-[#8DA97B]/30 flex items-center justify-center text-[#C9D7C3] hover:text-white hover:border-[#8DA97B] hover:bg-[#8DA97B]/20 transition-all duration-300">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8DA97B]">Sanctuary Navigation</h4>
          <nav className="flex flex-col gap-2.5 text-xs font-medium">
            <Link href="/classes" className="text-[#C9D7C3] hover:text-white transition-colors">
              Practices & Flow
            </Link>
            <Link href="/schedule" className="text-[#C9D7C3] hover:text-white transition-colors">
              Weekly Schedule
            </Link>
            <Link href="/instructors" className="text-[#C9D7C3] hover:text-white transition-colors">
              Master Guides & AI
            </Link>
            <Link href="/gallery" className="text-[#C9D7C3] hover:text-white transition-colors">
              Sanctuary Gallery
            </Link>
            <Link href="/faq" className="text-[#C9D7C3] hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="text-[#C9D7C3] hover:text-white transition-colors">
              About Astrion
            </Link>
            <Link href="/contact" className="text-[#C9D7C3] hover:text-white transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Studio Info */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8DA97B]">Sanctuary Contact & Hours</h4>
          <div className="space-y-3 text-xs text-[#C9D7C3] font-light">
            <Link href="/contact?map=1" className="flex items-start gap-2.5 hover:text-white transition-colors cursor-pointer group">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#8DA97B] group-hover:scale-110 transition-transform" />
              <span>120 Serenity Lane, Wellness District, CA 90210</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#8DA97B]" />
              <span>(555) 234-5678</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#8DA97B]" />
              <span>hello@astrionstudio.com</span>
            </div>
            <div className="pt-3 border-t border-[#8DA97B]/20">
              <p className="font-semibold text-white mb-0.5 text-xs">Sanctuary Hours</p>
              <p className="text-[11px] text-[#C9D7C3]">Mon - Fri: 6:00 AM - 9:00 PM</p>
              <p className="text-[11px] text-[#C9D7C3]">Sat - Sun: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-[#8DA97B]/20 flex flex-col sm:flex-row justify-between text-xs text-[#AFC4A3] font-medium">
        <p>© {currentYear} Astrion AI Sanctuary. All rights reserved.</p>
        <p className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}
