"use client";

import { useAuth } from "@/hooks/useAuth";
import { Menu, ChevronDown, User, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface AdminHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function AdminHeader({ onMenuClick, title = "Dashboard" }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-[#1c1f1d] border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:text-astrian-charcoal dark:hover:text-gray-100 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold font-display text-astrian-charcoal dark:text-gray-100 hidden sm:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/5 p-1.5 rounded-full lg:rounded-xl lg:pr-3 transition-colors"
          >
            {user?.profile_image ? (
              <img src={user.profile_image} alt={user.name} className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700" referrerPolicy="no-referrer" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-astrian-sage/20 text-astrian-sage flex items-center justify-center border border-astrian-sage/30">
                <User className="h-4 w-4" />
              </div>
            )}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm font-medium text-astrian-charcoal dark:text-gray-200 max-w-[120px] truncate">
                {user?.name}
              </span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a1c1a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 lg:hidden">
                <p className="text-sm font-medium text-astrian-charcoal dark:text-gray-100 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <div className="hidden lg:block px-4 py-3 border-b border-gray-100 dark:border-white/5">
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
