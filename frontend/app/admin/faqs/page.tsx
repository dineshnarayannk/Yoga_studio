"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <AdminLayout title="FAQs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-astrian-charcoal dark:text-gray-100">FAQs</h1>
          <p className="text-sm text-gray-500 mt-1">Manage frequently asked questions for the studio.</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          Add FAQs
        </Button>
      </div>

      <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <h3 className="text-lg font-medium text-astrian-charcoal dark:text-gray-100 mb-2">No faqs found</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
          There are currently no records to display. CRUD APIs have not been implemented yet.
        </p>
      </div>
    </AdminLayout>
  );
}
