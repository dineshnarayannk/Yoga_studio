"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile?tab=settings");
  }, [router]);

  return (
    <div className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 flex items-center justify-center">
      <div className="h-10 w-10 border-4 border-astrian-sage border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
