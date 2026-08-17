"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { InstructorsTable } from "@/components/admin/instructors/InstructorsTable";
import { InstructorModal } from "@/components/admin/instructors/InstructorModal";
import { DeleteInstructorModal } from "@/components/admin/instructors/DeleteInstructorModal";
import { 
  getInstructors, 
  createInstructor, 
  updateInstructor, 
  deleteInstructor, 
  Instructor, 
  InstructorFormData 
} from "@/lib/api/admin/instructors";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInstructors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getInstructors();
      setInstructors(data);
    } catch (err: any) {
      console.error("Failed to load instructors:", err);
      setError("Unable to load instructors. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleAddInstructor = () => {
    setEditingInstructor(null);
    setIsModalOpen(true);
  };

  const handleEditInstructor = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (instructor: Instructor) => {
    setInstructorToDelete(instructor);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (formData: InstructorFormData) => {
    try {
      setIsSaving(true);
      if (editingInstructor) {
        await updateInstructor(editingInstructor.id, formData);
      } else {
        await createInstructor(formData);
      }
      await fetchInstructors();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || "Failed to save instructor.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!instructorToDelete) return;
    try {
      setIsDeleting(true);
      await deleteInstructor(instructorToDelete.id);
      await fetchInstructors();
      setIsDeleteModalOpen(false);
      setInstructorToDelete(null);
    } catch (err: any) {
      console.error("Delete failed:", err);
      if (err.response?.status === 409) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete instructor. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout title="Instructors">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
              Instructors
            </h1>
            <p className="text-gray-500 mt-1">
              Manage the Yoga Studio instructors and their profiles.
            </p>
          </div>
          
          <Button 
            onClick={handleAddInstructor}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Instructor
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center p-24">
            <Loader2 className="w-8 h-8 text-astrian-sage animate-spin" />
          </div>
        ) : error ? (
          <div className="p-6 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100">
            {error}
          </div>
        ) : (
          <InstructorsTable 
            instructors={instructors} 
            onEdit={handleEditInstructor}
            onDelete={handleDeleteRequest}
          />
        )}

        <InstructorModal 
          isOpen={isModalOpen}
          onClose={() => !isSaving && setIsModalOpen(false)}
          instructor={editingInstructor}
          onSave={handleSave}
          isSaving={isSaving}
        />

        <DeleteInstructorModal 
          isOpen={isDeleteModalOpen}
          onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
          instructorName={instructorToDelete?.name || ""}
        />
      </div>
    </AdminLayout>
  );
}
