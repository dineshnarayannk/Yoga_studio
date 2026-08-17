"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminProtectedRoute } from "./AdminProtectedRoute";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0F1611] flex overflow-hidden">
        <AdminSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader 
            onMenuClick={() => setIsSidebarOpen(true)} 
            title={title}
          />
          <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}
