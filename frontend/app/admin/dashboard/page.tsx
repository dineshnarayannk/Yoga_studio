"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getDashboardStats, DashboardStats } from "@/lib/api/admin/dashboard";
import { 
  Users, 
  Flower2, 
  UserSquare2, 
  Calendar, 
  CalendarCheck2, 
  Ticket, 
  MessageSquareHeart,
  Activity,
  Loader2
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Total Users", value: isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : statsData?.totalUsers ?? "-", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Total Practices", value: isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : statsData?.totalPractices ?? "-", icon: Flower2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Total Instructors", value: isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : statsData?.totalInstructors ?? "-", icon: UserSquare2, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "Upcoming Sessions", value: isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : statsData?.upcomingSessions ?? "-", icon: Calendar, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "Total Bookings", value: isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : statsData?.totalBookings ?? "-", icon: CalendarCheck2, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
    { label: "Pending Passes", value: isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : statsData?.pendingPasses ?? "-", icon: Ticket, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
    { label: "Pending Reviews", value: isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : statsData?.pendingReviews ?? "-", icon: MessageSquareHeart, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div>
        <h1 className="text-3xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-2">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Here is an overview of what's happening at the studio today.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1c1f1d] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-start gap-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-astrian-charcoal dark:text-gray-100 flex items-center h-8">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-astrian-sage" />
              <h2 className="text-xl font-bold text-astrian-charcoal dark:text-gray-100">Recent Bookings</h2>
            </div>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
              No data yet. CRUD APIs are not implemented.
            </div>
          </div>

          <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-astrian-sage" />
              <h2 className="text-xl font-bold text-astrian-charcoal dark:text-gray-100">Recent Users</h2>
            </div>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
              No data yet. CRUD APIs are not implemented.
            </div>
          </div>

          <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-astrian-sage" />
              <h2 className="text-xl font-bold text-astrian-charcoal dark:text-gray-100">Upcoming Sessions</h2>
            </div>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
              No data yet. CRUD APIs are not implemented.
            </div>
          </div>

          <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Ticket className="h-5 w-5 text-astrian-sage" />
              <h2 className="text-xl font-bold text-astrian-charcoal dark:text-gray-100">Sanctuary Pass Requests</h2>
            </div>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
              No data yet. CRUD APIs are not implemented.
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
