"use client";

import { useState, useEffect } from "react";
import { YogaPractice, PracticeFormData } from "@/lib/api/admin/practices";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  practice: YogaPractice | null;
  onSave: (data: PracticeFormData) => Promise<void>;
  isSaving: boolean;
}

const DEFAULT_FORM: PracticeFormData = {
  name: "",
  description: "",
  short_description: "",
  difficulty: "ALL_LEVELS",
  duration: 60,
  category: "",
  image: "",
  status: "ACTIVE",
  display_order: 0,
};

export function PracticeModal({ isOpen, onClose, practice, onSave, isSaving }: PracticeModalProps) {
  const [formData, setFormData] = useState<PracticeFormData>(DEFAULT_FORM);

  useEffect(() => {
    if (isOpen) {
      if (practice) {
        setFormData({
          name: practice.name,
          description: practice.description,
          short_description: practice.short_description,
          difficulty: practice.difficulty,
          duration: practice.duration,
          category: practice.category || "",
          image: practice.image || "",
          status: practice.status,
          display_order: practice.display_order,
        });
      } else {
        setFormData(DEFAULT_FORM);
      }
    }
  }, [isOpen, practice]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={!isSaving ? onClose : undefined} />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#1a1c1a] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
            {practice ? "Edit Practice" : "Add New Practice"}
          </h2>
          <button 
            onClick={onClose}
            disabled={isSaving}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="practice-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors"
                  placeholder="e.g., Vinyasa Flow"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category *</label>
                <input 
                  required
                  type="text" 
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors"
                  placeholder="e.g., Dynamic Yoga"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Difficulty *</label>
                <select 
                  required
                  value={formData.difficulty}
                  onChange={e => setFormData({ ...formData, difficulty: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors appearance-none"
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                  <option value="ALL_LEVELS">All Levels</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Duration (mins) *</label>
                <input 
                  required
                  type="number" 
                  min="1"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors appearance-none"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Display Order</label>
                <input 
                  type="number" 
                  value={formData.display_order}
                  onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Image URL</label>
              <input 
                type="url" 
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Short Description *</label>
              <textarea 
                required
                rows={2}
                value={formData.short_description}
                onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors resize-none"
                placeholder="A brief overview..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description *</label>
              <textarea 
                required
                rows={5}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121413] text-astrian-charcoal dark:text-gray-100 focus:border-astrian-sage outline-none transition-colors resize-none"
                placeholder="Full details about the practice..."
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 flex justify-end gap-3">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="practice-form" 
            variant="primary"
            disabled={isSaving}
            className="w-32 flex justify-center"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Practice"}
          </Button>
        </div>
      </div>
    </div>
  );
}
