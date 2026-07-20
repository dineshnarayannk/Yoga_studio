"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut, Calendar, Settings as SettingsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  const dropdownItems = [
    {
      label: "My Profile",
      href: "/profile",
      icon: <User className="h-4.5 w-4.5 text-astrian-sage" />
    },
    {
      label: "My Classes",
      href: "/classes?filter=booked",
      icon: <Calendar className="h-4.5 w-4.5 text-astrian-sage" />
    },
    {
      label: "Settings",
      href: "/profile?tab=settings",
      icon: <SettingsIcon className="h-4.5 w-4.5 text-astrian-sage" />
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1 rounded-full hover:bg-astrian-cream dark:hover:bg-[#1c1f1d] transition-colors focus:outline-none cursor-pointer group"
        aria-label="User account menu"
      >
        <div className="h-9 w-9 rounded-full overflow-hidden relative border border-astrian-clay dark:border-white/10 bg-astrian-sage/10 dark:bg-astrian-sage/20 flex items-center justify-center">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || "User avatar"}
              fill
              referrerPolicy="no-referrer"
              className="object-cover"
              sizes="36px"
            />
          ) : (
            <span className="font-bold text-sm text-astrian-sage dark:text-astrian-leaf uppercase">
              {user.displayName ? user.displayName.charAt(0) : "U"}
            </span>
          )}
        </div>
        <span className="hidden sm:inline text-sm font-medium text-astrian-charcoal dark:text-gray-200 group-hover:text-astrian-sage transition-colors pr-2">
          {user.displayName?.split(" ")[0]}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="absolute right-0 mt-3 w-56 bg-[#FDFBF7] dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 rounded-2xl shadow-xl overflow-hidden z-50 py-2.5 transition-colors duration-300"
          >
            {/* Header info */}
            <div className="px-4 py-2 border-b border-astrian-clay/60 dark:border-white/5 mb-2 pb-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-astrian-charcoal/40 dark:text-gray-400">Authenticated user</p>
              <p className="text-sm font-bold text-astrian-charcoal dark:text-gray-100 font-display mt-0.5 truncate">{user.displayName}</p>
              <p className="text-xs text-astrian-charcoal/50 dark:text-gray-400 truncate">{user.email}</p>
            </div>

            {/* Navigation links */}
            <div className="space-y-0.5 px-2">
              {dropdownItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-astrian-charcoal/80 dark:text-gray-300 rounded-xl hover:bg-astrian-cream dark:hover:bg-white/5 hover:text-astrian-sage transition-all duration-200"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Logout trigger button */}
            <div className="border-t border-astrian-clay/60 dark:border-white/5 mt-2.5 pt-2 px-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200 cursor-pointer text-left focus:outline-none"
              >
                <LogOut className="h-4.5 w-4.5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
