"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/admin/login");
      } else if (user.role !== "ADMIN") {
        router.push("/admin/access-denied");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0F1611]">
        <Loader2 className="h-10 w-10 animate-spin text-astrian-sage" />
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    // Return null while redirecting to avoid flashing unauthenticated content
    return null;
  }

  return <>{children}</>;
}
