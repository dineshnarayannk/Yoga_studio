"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  Flower2,
  UserSquare2,
  CalendarCheck2,
  Ticket,
  HelpCircle,
  Image as ImageIcon,
  MessageSquareHeart,
  X
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Yoga Practices", href: "/admin/practices", icon: Flower2 },
    { name: "Instructors", href: "/admin/instructors", icon: UserSquare2 },
    { name: "Sessions", href: "/admin/sessions", icon: Calendar },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck2 },
    { name: "Sanctuary Passes", href: "/admin/passes", icon: Ticket },
    { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquareHeart },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#1c1f1d] border-r border-gray-200 dark:border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
              Admin Portal
            </h2>
            <p className="text-xs text-gray-500 mt-1">Yoga Studio Management</p>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-astrian-charcoal dark:hover:text-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm ${
                  isActive 
                    ? "bg-astrian-sage/10 text-astrian-sage dark:bg-astrian-sage/20" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-astrian-sage" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-1">
          <Link
            href="/admin/settings"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors text-sm ${
              pathname === "/admin/settings"
                ? "bg-astrian-sage/10 text-astrian-sage dark:bg-astrian-sage/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button 
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
