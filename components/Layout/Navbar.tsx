"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Navbar() {
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
        const offset = 80; // height of the navbar
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* Action Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/enquiry">
              <Button
                variant="primary"
                size="sm"
              >
                Get A Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Actions (Theme Toggle & Menu Button) */}
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-astrian-oat dark:bg-[#121413] pt-24 px-6 md:hidden flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6">
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
            <div className="flex flex-col gap-4">
              <Link href="/enquiry" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Get A Free Trial
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


