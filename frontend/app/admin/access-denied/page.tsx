"use client";

import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-[#0F1611]">
      <div className="w-full max-w-md bg-white dark:bg-[#1c1f1d] p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 text-center">
        
        <div className="mx-auto w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-6 shadow-sm">
          <ShieldAlert className="h-8 w-8 text-rose-500" />
        </div>
        
        <h1 className="text-3xl font-display font-bold text-astrian-charcoal dark:text-gray-100 mb-2">
          Access Denied
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          You do not have permission to access the Admin Portal. This area is restricted to administrators only.
        </p>

        <Link href="/">
          <Button variant="primary" className="w-full flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Yoga Studio
          </Button>
        </Link>
      </div>
    </div>
  );
}
