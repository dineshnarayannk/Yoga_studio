"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, User, LogOut, Calendar, Video, Settings as SettingsIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";
import { AstraLiveSessionModal, CategoryPractice } from "@/components/ui/AstraMentor/AstraLiveSessionModal";
import { AstraLiveStudio } from "@/components/ui/AstraMentor/AstraLiveStudio";

export default function Navbar() {
  const { user, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Astra AI Live Session modal & studio state
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [activeSessionData, setActiveSessionData] = useState<CategoryPractice | null>(null);

  useEffect(() => {
    const handleScroll = () => {  
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Classes", href: "/classes" },
    { label: "Schedule", href: "/schedule" },
    { label: "Instructors", href: "/instructors" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith("/#") || href.startsWith("#")) {
      const id = href.replace(/^\/#?/, "#");
      const element = document.querySelector(id);
      if (element) {
        e.preventDefault();
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-3 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 max-w-7xl mx-auto"
        )}
      >
        <div
          className={cn(
            "w-full rounded-full transition-all duration-500 px-5 md:px-7 py-3 flex items-center justify-between",
            isScrolled
              ? "bg-[#F4F8F2]/90 dark:bg-[#0F1611]/90 backdrop-blur-xl border border-[#C9D7C3]/60 dark:border-[#8DA97B]/25 shadow-xl shadow-[#2D4632]/8"
              : "bg-[#F4F8F2]/75 dark:bg-[#0F1611]/75 backdrop-blur-md border border-[#C9D7C3]/40 dark:border-[#8DA97B]/15 shadow-md shadow-[#2D4632]/3"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 text-xl font-bold font-display tracking-tight text-[#233228] dark:text-[#F4F8F2] cursor-pointer group"
          >
            <div className="h-9 w-9 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img src="/title_icon.png" alt="Yoga Studio Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold tracking-tight text-lg">Astrion <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#8DA97B]/20 text-[#2D4632] dark:text-[#8DA97B] ml-1">AI</span></span>
          </Link>
 
          {/* Desktop Navigation links */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleLinkClick(e, link.href);
                }}
                className="text-sm font-medium text-[#52625A] dark:text-[#C9D7C3] hover:text-[#2D4632] dark:hover:text-white transition-colors duration-300 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5D7555] dark:bg-[#8DA97B] rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
 
          {/* Action Row & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsLiveModalOpen(true)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#2D4632] to-[#5D7555] hover:from-[#1F2E23] hover:to-[#2D4632] text-[#F8F7F2] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#2D4632]/20 hover:scale-[1.02]"
              title="Launch Astra AI Live Guided Session"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8DA97B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8DA97B]"></span>
              </span>
              <Video className="h-3.5 w-3.5 text-[#C9D7C3]" />
              <span>Live AI Studio</span>
            </button>

            <ThemeToggle />
            
            {user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openAuthModal()}
                  className="text-xs font-semibold text-[#233228] dark:text-[#C9D7C3] hover:text-[#5D7555] transition-colors cursor-pointer focus:outline-none px-2"
                >
                  Sign In
                </button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openAuthModal()}
                  className="bg-[#2D4632] hover:bg-[#1F2E23] text-white rounded-full text-xs font-semibold px-4 py-2 shadow-sm"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
 
          {/* Mobile actions trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#233228] dark:text-[#F4F8F2] hover:text-[#5D7555] transition-colors duration-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
 
      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-astrian-oat dark:bg-[#121413] pt-24 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-5 overflow-y-auto max-h-[60vh] py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleLinkClick(e, link.href);
                  }}
                  className="text-2xl font-medium text-astrian-charcoal dark:text-gray-100 hover:text-astrian-sage transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth and Action State */}
            <div className="border-t border-astrian-clay/60 dark:border-white/5 pt-6 flex flex-col gap-4">
              {user ? (
                <div className="space-y-4">
                  {/* User Profile Card */}
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1c1f1d] rounded-2xl border border-astrian-clay dark:border-white/10">
                    <div className="h-10 w-10 rounded-full overflow-hidden relative border border-astrian-clay dark:border-white/10 bg-astrian-sage/10 dark:bg-astrian-sage/20 flex items-center justify-center">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="object-cover w-full h-full"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="font-bold text-base text-astrian-sage dark:text-astrian-leaf uppercase">
                          {user.displayName ? user.displayName.charAt(0) : "U"}
                        </span>
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-astrian-charcoal dark:text-gray-100 truncate">{user.displayName}</p>
                      <p className="text-xs text-astrian-charcoal/50 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Settings / Menu quick links */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2.5 text-xs font-semibold text-astrian-charcoal dark:text-gray-200 bg-white dark:bg-[#1c1f1d] rounded-xl border border-astrian-clay dark:border-white/10 justify-center hover:text-astrian-sage transition-colors"
                    >
                      <User className="h-4 w-4 text-astrian-sage" />
                      Profile
                    </Link>
                    <Link
                      href="/classes?filter=booked"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2.5 text-xs font-semibold text-astrian-charcoal dark:text-gray-200 bg-white dark:bg-[#1c1f1d] rounded-xl border border-astrian-clay dark:border-white/10 justify-center hover:text-astrian-sage transition-colors"
                    >
                      <Calendar className="h-4 w-4 text-astrian-sage" />
                      My Classes
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-rose-200 dark:border-rose-900/30 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors font-semibold text-sm cursor-pointer"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal();
                    }}
                  >
                    Sign Up
                  </Button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal();
                    }}
                    className="w-full text-center py-3 text-sm font-semibold text-astrian-charcoal dark:text-gray-300 hover:text-astrian-sage transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Astra AI Live Session Modal & Studio Launcher */}
      <AstraLiveSessionModal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
        onStartSession={(data) => {
          setIsLiveModalOpen(false);
          setActiveSessionData(data);
        }}
      />

      {activeSessionData && (
        <AstraLiveStudio
          sessionData={activeSessionData}
          onEndSession={() => setActiveSessionData(null)}
        />
      )}
    </>
  );
}
