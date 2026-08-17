"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SessionsTable } from "@/components/admin/sessions/SessionsTable";
import { SessionModal } from "@/components/admin/sessions/SessionModal";
import { DeleteSessionModal } from "@/components/admin/sessions/DeleteSessionModal";
import { 
  getSessions, 
  createSession, 
  updateSession, 
  deleteSession, 
  Session, 
  SessionFormData 
} from "@/lib/api/admin/sessions";

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PAST'>('UPCOMING');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete/Cancel Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<Session | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getSessions();
      setSessions(data);
    } catch (err: any) {
      console.error("Failed to load sessions:", err);
      setError("Unable to load sessions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const filteredSessions = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    if (activeTab === 'UPCOMING') {
      return sessions.filter(s => s.session_date >= today);
    } else {
      return sessions.filter(s => s.session_date < today);
    }
  }, [sessions, activeTab]);

  const handleAddSession = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  const handleEditSession = (session: Session) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (session: Session) => {
    setSessionToDelete(session);
    setIsDeleteModalOpen(true);
  };

  const handleCancelQuickRequest = async (session: Session) => {
    if (!window.confirm("Are you sure you want to cancel this session?")) return;
    try {
      await updateSession(session.id, {
        practice_id: session.practice_id,
        instructor_id: session.instructor_id,
        session_date: session.session_date,
        start_time: session.start_time,
        end_time: session.end_time,
        capacity: session.capacity,
        status: 'CANCELLED'
      });
      await fetchSessions();
    } catch (err: any) {
      console.error("Failed to cancel session:", err);
      alert(err.response?.data?.message || "Failed to cancel session.");
    }
  };

  const handleSave = async (formData: SessionFormData) => {
    try {
      setIsSaving(true);
      if (editingSession) {
        await updateSession(editingSession.id, formData);
      } else {
        await createSession(formData);
      }
      await fetchSessions();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save failed:", err);
      alert(err.response?.data?.message || "Failed to save session.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmHardDelete = async () => {
    if (!sessionToDelete) return;
    try {
      setIsDeleting(true);
      await deleteSession(sessionToDelete.id);
      await fetchSessions();
      setIsDeleteModalOpen(false);
      setSessionToDelete(null);
    } catch (err: any) {
      console.error("Delete failed:", err);
      if (err.response?.status === 409) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete session. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmCancelStatus = async () => {
    if (!sessionToDelete) return;
    try {
      setIsDeleting(true);
      await updateSession(sessionToDelete.id, {
        practice_id: sessionToDelete.practice_id,
        instructor_id: sessionToDelete.instructor_id,
        session_date: sessionToDelete.session_date,
        start_time: sessionToDelete.start_time,
        end_time: sessionToDelete.end_time,
        capacity: sessionToDelete.capacity,
        status: 'CANCELLED'
      });
      await fetchSessions();
      setIsDeleteModalOpen(false);
      setSessionToDelete(null);
    } catch (err: any) {
      console.error("Cancel failed:", err);
      alert(err.response?.data?.message || "Failed to cancel session.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AdminLayout title="Sessions">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-astrian-charcoal dark:text-gray-100">
              Sessions
            </h1>
            <p className="text-gray-500 mt-1">
              Create and manage scheduled Yoga classes.
            </p>
          </div>
          
          <Button 
            onClick={handleAddSession}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Session
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 dark:border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('UPCOMING')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[17px] ${
              activeTab === 'UPCOMING'
                ? 'border-astrian-sage text-astrian-sage'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Upcoming Sessions
          </button>
          <button
            onClick={() => setActiveTab('PAST')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-[17px] ${
              activeTab === 'PAST'
                ? 'border-astrian-sage text-astrian-sage'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Past Sessions
          </button>
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
          <SessionsTable 
            sessions={filteredSessions} 
            onEdit={handleEditSession}
            onDelete={handleDeleteRequest}
            onCancel={handleCancelQuickRequest}
          />
        )}

        <SessionModal 
          isOpen={isModalOpen}
          onClose={() => !isSaving && setIsModalOpen(false)}
          session={editingSession}
          onSave={handleSave}
          isSaving={isSaving}
        />

        <DeleteSessionModal 
          isOpen={isDeleteModalOpen}
          onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
          onConfirmDelete={handleConfirmHardDelete}
          onConfirmCancel={handleConfirmCancelStatus}
          isProcessing={isDeleting}
          session={sessionToDelete}
        />
      </div>
    </AdminLayout>
  );
}
