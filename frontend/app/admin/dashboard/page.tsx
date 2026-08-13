"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from "lucide-react";

export default function AdminDashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/admin");
      } else if (user.role !== "ADMIN") {
        router.push("/admin");
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-astrian-sage"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F1611] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#1c1f1d] border-r border-gray-200 dark:border-white/10 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
            Admin Portal
          </h2>
          <p className="text-xs text-gray-500 mt-1">Yoga Studio Management</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-astrian-sage/10 text-astrian-sage rounded-xl font-medium">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl font-medium transition-colors">
            <Calendar className="h-5 w-5" />
            Sessions
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl font-medium transition-colors">
            <Users className="h-5 w-5" />
            Users
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl font-medium transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </button>
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4">
            {user.profile_image ? (
              <img src={user.profile_image} alt="Admin" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800" />
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-astrian-charcoal dark:text-gray-100 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-2">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Here is an overview of what's happening at the studio today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1c1f1d] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Today's Sessions</h3>
            <p className="text-3xl font-bold text-astrian-charcoal dark:text-gray-100">4</p>
          </div>
          <div className="bg-white dark:bg-[#1c1f1d] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Active Bookings</h3>
            <p className="text-3xl font-bold text-astrian-charcoal dark:text-gray-100">28</p>
          </div>
          <div className="bg-white dark:bg-[#1c1f1d] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Pending Passes</h3>
            <p className="text-3xl font-bold text-astrian-charcoal dark:text-gray-100">12</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-astrian-charcoal dark:text-gray-100 mb-4">
            Recent Activity
          </h2>
          <div className="text-center py-12 text-gray-500">
            CRUD APIs are not yet implemented. Activity will appear here once connected to the backend database.
          </div>
        </div>
      </main>
    </div>
  );
}
