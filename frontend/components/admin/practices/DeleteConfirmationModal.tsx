"use client";

import { X, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
  practiceName: string;
}

export function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting,
  practiceName
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={!isDeleting ? onClose : undefined} />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#1a1c1a] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold font-display text-astrian-charcoal dark:text-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Delete Practice
          </h2>
          <button 
            onClick={onClose}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete <span className="font-semibold text-astrian-charcoal dark:text-white">"{practiceName}"</span>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This action cannot be undone. If this practice has been used in existing sessions or bookings, it might be safer to edit it and change its status to <strong>INACTIVE</strong> instead.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 flex justify-end gap-3">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="primary"
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-rose-600 hover:bg-rose-700 text-white border-transparent w-32 flex justify-center"
          >
            {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
