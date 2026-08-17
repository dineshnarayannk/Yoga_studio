"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminIndexPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/admin/login");
      } else if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/access-denied");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0F1611]">
      <Loader2 className="h-10 w-10 animate-spin text-astrian-sage" />
    </div>
  );
}
