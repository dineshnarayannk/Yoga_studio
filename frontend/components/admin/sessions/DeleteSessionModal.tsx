"use client";

import { X, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/api/admin/sessions";

interface DeleteSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => Promise<void>;
  onConfirmCancel: () => Promise<void>;
  isProcessing: boolean;
  session: Session | null;
}

export function DeleteSessionModal({ 
  isOpen, 
  onClose, 
  onConfirmDelete, 
  onConfirmCancel,
  isProcessing,
  session
}: DeleteSessionModalProps) {
  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={!isProcessing ? onClose : undefined} />
      
      <div className="relative w-full max-w-md bg-white dark:bg-[#1a1c1a] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold font-display text-astrian-charcoal dark:text-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Manage Session
          </h2>
          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300">
            How would you like to handle this session?
          </p>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-black/20 rounded-xl text-sm">
            <p className="font-medium text-astrian-charcoal dark:text-gray-100 mb-1">
              Cancel Session (Recommended)
            </p>
            <p className="text-gray-500">
              Marks the session as <strong>CANCELLED</strong>. This preserves historical records and future booking logs safely.
            </p>
          </div>
          <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-900/10 rounded-xl text-sm border border-rose-100 dark:border-rose-900/30">
            <p className="font-medium text-rose-700 dark:text-rose-400 mb-1">
              Delete Session (Destructive)
            </p>
            <p className="text-rose-600/80 dark:text-rose-300/80">
              Permanently removes the session from the database. This will fail if users have already booked it.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 flex flex-col sm:flex-row justify-end gap-3">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onClose}
            disabled={isProcessing}
          >
            Go Back
          </Button>
          <Button 
            type="button" 
            variant="secondary"
            onClick={onConfirmDelete}
            disabled={isProcessing}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
          >
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete"}
          </Button>
          <Button 
            type="button" 
            variant="primary"
            onClick={onConfirmCancel}
            disabled={isProcessing}
            className="bg-orange-500 hover:bg-orange-600 text-white border-transparent"
          >
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Cancel Session"}
          </Button>
        </div>
      </div>
    </div>
  );
}
