"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, User, LogOut, Calendar, Settings as SettingsIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";

export default function Navbar() {
  const { user, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
          isScrolled
            ? "glass-panel shadow-[0_4px_30px_rgba(17,24,39,0.03)] py-3"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 text-xl font-bold font-display tracking-tight text-astrian-charcoal dark:text-gray-100 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-astrian-sage flex items-center justify-center text-white">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <span>Astrion</span>
          </Link>
 
          {/* Desktop Navigation links */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleLinkClick(e, link.href);
                }}
                className="text-[0.95rem] font-medium text-astrian-charcoal/80 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
 
          {/* Action Row & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => openAuthModal()}
                  className="text-sm font-semibold text-astrian-charcoal/80 dark:text-gray-300 hover:text-astrian-sage dark:hover:text-astrian-leaf transition-colors cursor-pointer focus:outline-none"
                >
                  Sign In
                </button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openAuthModal()}
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
              className="p-2 text-astrian-charcoal dark:text-gray-100 hover:text-astrian-sage transition-colors duration-300 cursor-pointer"
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
    </>
  );
}
