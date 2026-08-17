"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session, SessionFormData } from "@/lib/api/admin/sessions";
import { YogaPractice, getPractices } from "@/lib/api/admin/practices";
import { Instructor, getInstructors } from "@/lib/api/admin/instructors";
import { format, parse } from "date-fns";

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
  onSave: (data: SessionFormData) => Promise<void>;
  isSaving: boolean;
}

export function SessionModal({ 
  isOpen, 
  onClose, 
  session, 
  onSave, 
  isSaving 
}: SessionModalProps) {
  const [practices, setPractices] = useState<YogaPractice[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoadingDependencies, setIsLoadingDependencies] = useState(false);

  const [formData, setFormData] = useState<SessionFormData>({
    practice_id: 0,
    instructor_id: 0,
    session_date: format(new Date(), 'yyyy-MM-dd'),
    start_time: "07:00",
    end_time: "08:00",
    capacity: 20,
    status: "SCHEDULED"
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof SessionFormData, string>>>({});

  // Fetch Practices and Instructors for the dropdowns
  useEffect(() => {
    if (isOpen && practices.length === 0) {
      const fetchDependencies = async () => {
        try {
          setIsLoadingDependencies(true);
          const [practicesData, instructorsData] = await Promise.all([
            getPractices(),
            getInstructors()
          ]);
          // Only show ACTIVE practices/instructors in dropdown (unless editing an old one)
          setPractices(practicesData);
          setInstructors(instructorsData);
        } catch (error) {
          console.error("Failed to load dependencies", error);
        } finally {
          setIsLoadingDependencies(false);
        }
      };
      fetchDependencies();
    }
  }, [isOpen]);

  useEffect(() => {
    if (session) {
      // time strings from db might be "07:00:00", slice to "07:00" for input type="time"
      const formatTimeInput = (time: string) => time.substring(0, 5);

      setFormData({
        practice_id: session.practice_id,
        instructor_id: session.instructor_id,
        session_date: session.session_date,
        start_time: formatTimeInput(session.start_time),
        end_time: formatTimeInput(session.end_time),
        capacity: session.capacity,
        status: session.status
      });
    } else {
      setFormData({
        practice_id: 0,
        instructor_id: 0,
        session_date: format(new Date(), 'yyyy-MM-dd'),
        start_time: "07:00",
        end_time: "08:00",
        capacity: 20,
        status: "SCHEDULED"
      });
    }
    setErrors({});
  }, [session, isOpen]);

  const validate = () => {
    const newErrors: Partial<Record<keyof SessionFormData, string>> = {};
    if (!formData.practice_id) newErrors.practice_id = "Please select a practice";
    if (!formData.instructor_id) newErrors.instructor_id = "Please select an instructor";
    if (!formData.session_date) newErrors.session_date = "Date is required";
    if (!formData.start_time) newErrors.start_time = "Start time is required";
    if (!formData.end_time) newErrors.end_time = "End time is required";
    if (formData.start_time >= formData.end_time) {
      newErrors.end_time = "End time must be after start time";
    }
    if (formData.capacity <= 0) newErrors.capacity = "Capacity must be > 0";
    
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={!isSaving ? onClose : undefined} />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a1c1a] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
            {session ? "Edit Session" : "Schedule New Session"}
          </h2>
          <button 
            onClick={onClose}
            disabled={isSaving}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoadingDependencies ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 text-astrian-sage animate-spin" />
            </div>
          ) : (
            <form id="session-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Practice Dropdown */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Yoga Practice *
                  </label>
                  <select
                    value={formData.practice_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, practice_id: parseInt(e.target.value) }))}
                    className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.practice_id ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white appearance-none`}
                  >
                    <option value={0} disabled>Select a practice</option>
                    {practices.map(p => (
                      <option key={p.id} value={p.id} disabled={p.status !== 'ACTIVE' && p.id !== session?.practice_id}>
                        {p.name} {p.status !== 'ACTIVE' ? '(Inactive)' : ''}
                      </option>
                    ))}
                  </select>
                  {errors.practice_id && <p className="text-rose-500 text-xs mt-1">{errors.practice_id}</p>}
                </div>

                {/* Instructor Dropdown */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Instructor *
                  </label>
                  <select
                    value={formData.instructor_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, instructor_id: parseInt(e.target.value) }))}
                    className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.instructor_id ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white appearance-none`}
                  >
                    <option value={0} disabled>Select an instructor</option>
                    {instructors.map(i => (
                      <option key={i.id} value={i.id} disabled={i.status !== 'ACTIVE' && i.id !== session?.instructor_id}>
                        {i.name} {i.status !== 'ACTIVE' ? '(Inactive)' : ''}
                      </option>
                    ))}
                  </select>
                  {errors.instructor_id && <p className="text-rose-500 text-xs mt-1">{errors.instructor_id}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Session Date *
                  </label>
                  <input 
                    type="date"
                    value={formData.session_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, session_date: e.target.value }))}
                    className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.session_date ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white`}
                  />
                  {errors.session_date && <p className="text-rose-500 text-xs mt-1">{errors.session_date}</p>}
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Capacity (Seats) *
                  </label>
                  <input 
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                    className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.capacity ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white`}
                  />
                  {errors.capacity && <p className="text-rose-500 text-xs mt-1">{errors.capacity}</p>}
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Time *
                  </label>
                  <input 
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                    className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.start_time ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white`}
                  />
                  {errors.start_time && <p className="text-rose-500 text-xs mt-1">{errors.start_time}</p>}
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Time *
                  </label>
                  <input 
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                    className={`w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border ${errors.end_time ? 'border-rose-500' : 'border-gray-200 dark:border-white/10'} rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white`}
                  />
                  {errors.end_time && <p className="text-rose-500 text-xs mt-1">{errors.end_time}</p>}
                </div>

                {/* Status */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as SessionFormData['status'] }))}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 text-astrian-charcoal dark:text-white appearance-none"
                  >
                    <option value="SCHEDULED">SCHEDULED</option>
                    <option value="FULL">FULL</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

              </div>
            </form>
          )}
        </div>

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
            form="session-form"
            disabled={isSaving || isLoadingDependencies}
            className="w-32 flex justify-center"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
