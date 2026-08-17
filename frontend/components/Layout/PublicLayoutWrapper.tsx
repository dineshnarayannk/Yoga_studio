"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Layout/Footer";
import { ChatBot } from "@/components/ui/ChatBot";
import { AuthModal } from "@/components/AuthModal";
import React from "react";

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <ChatBot />
      <AuthModal />
    </>
  );
}
