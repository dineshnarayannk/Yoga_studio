"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Instructor, InstructorFormData } from "@/lib/api/admin/instructors";

interface InstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructor: Instructor | null;
  onSave: (data: InstructorFormData) => Promise<void>;
  isSaving: boolean;
}

export function InstructorModal({ 
  isOpen, 
  onClose, 
  instructor, 
  onSave, 
  isSaving 
}: InstructorModalProps) {
  const [formData, setFormData] = useState<InstructorFormData>({
    name: "",
    bio: "",
    specialization: "",
    experience: "",
    image: "",
    status: "ACTIVE",
    display_order: 0
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof InstructorFormData, string>>>({});

  useEffect(() => {
    if (instructor) {
      setFormData({
        name: instructor.name,
        bio: instructor.bio,
        specialization: instructor.specialization || "",
        experience: instructor.experience || "",
        image: instructor.image || "",
        status: instructor.status,
        display_order: instructor.display_order
      });
    } else {
      setFormData({
        name: "",
        bio: "",
        specialization: "",
        experience: "",
        image: "",
        status: "ACTIVE",
        display_order: 0
      });
    }
    setErrors({});
  }, [instructor, isOpen]);

  const validate = () => {
    const newErrors: Partial<Record<keyof InstructorFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={!isSaving ? onClose : undefined} />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a1c1a] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
            {instructor ? "Edit Instructor" : "Add New Instructor"}
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
          <form id="instructor-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name *
                </label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.name ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white`}
                  placeholder="e.g. Jane Doe"
                />
                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Specialization *
                </label>
                <input 
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                  className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.specialization ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white`}
                  placeholder="e.g. Vinyasa Flow"
                />
                {errors.specialization && <p className="text-rose-500 text-xs mt-1">{errors.specialization}</p>}
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience
                </label>
                <input 
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white"
                  placeholder="e.g. 5+ years"
                />
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio *
                </label>
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.bio ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white resize-none`}
                  placeholder="Instructor's biography..."
                />
                {errors.bio && <p className="text-rose-500 text-xs mt-1">{errors.bio}</p>}
              </div>

              {/* Image URL */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input 
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'ACTIVE' | 'INACTIVE' }))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white appearance-none"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Display Order
                </label>
                <input 
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white"
                />
              </div>

            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 flex justify-end gap-3 shrink-0">
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
            form="instructor-form"
            disabled={isSaving}
            className="w-32 flex justify-center"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
