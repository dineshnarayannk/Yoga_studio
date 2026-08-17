"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PracticesTable } from "@/components/admin/practices/PracticesTable";
import { PracticeModal } from "@/components/admin/practices/PracticeModal";
import { DeleteConfirmationModal } from "@/components/admin/practices/DeleteConfirmationModal";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  getPractices, 
  createPractice, 
  updatePractice, 
  deletePractice, 
  YogaPractice, 
  PracticeFormData 
} from "@/lib/api/admin/practices";
import axios from "axios";

export default function PracticesPage() {
  const [practices, setPractices] = useState<YogaPractice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPractice, setEditingPractice] = useState<YogaPractice | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [practiceToDelete, setPracticeToDelete] = useState<YogaPractice | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPractices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPractices();
      setPractices(data);
    } catch (err: any) {
      console.error("Failed to load practices:", err);
      setError("Unable to load practices. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPractices();
  }, []);

  const handleAddPractice = () => {
    setEditingPractice(null);
    setIsModalOpen(true);
  };

  const handleEditPractice = (practice: YogaPractice) => {
    setEditingPractice(practice);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (practice: YogaPractice) => {
    setPracticeToDelete(practice);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (formData: PracticeFormData) => {
    try {
      setIsSaving(true);
      if (editingPractice) {
        await updatePractice(editingPractice.id, formData);
        // Toast success message here if toast system was available
      } else {
        await createPractice(formData);
      }
      await fetchPractices();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || "Failed to save practice.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!practiceToDelete) return;
    try {
      setIsDeleting(true);
      await deletePractice(practiceToDelete.id);
      await fetchPractices();
      setIsDeleteModalOpen(false);
      setPracticeToDelete(null);
    } catch (err: any) {
      console.error("Delete failed:", err);
      if (err.response?.status === 409) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete practice. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout title="Yoga Practices">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
              Yoga Practices
            </h1>
            <p className="text-gray-500 mt-1">
              Manage the yoga practices and services offered by the studio.
            </p>
          </div>
          
          <Button 
            onClick={handleAddPractice}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Practice
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
          <PracticesTable 
            practices={practices} 
            onEdit={handleEditPractice}
            onDelete={handleDeleteRequest}
          />
        )}

        <PracticeModal 
          isOpen={isModalOpen}
          onClose={() => !isSaving && setIsModalOpen(false)}
          practice={editingPractice}
          onSave={handleSave}
          isSaving={isSaving}
        />

        <DeleteConfirmationModal 
          isOpen={isDeleteModalOpen}
          onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
          practiceName={practiceToDelete?.name || ""}
        />
      </div>
    </AdminLayout>
  );
}
