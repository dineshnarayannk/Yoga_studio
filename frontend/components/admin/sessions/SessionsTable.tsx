"use client";

import { Session } from "@/lib/api/admin/sessions";
import { Edit2, Trash2, CalendarX2 } from "lucide-react";
import { format, parse } from "date-fns";

interface SessionsTableProps {
  sessions: Session[];
  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;
  onCancel: (session: Session) => void;
}

export function SessionsTable({ sessions, onEdit, onDelete, onCancel }: SessionsTableProps) {
  if (sessions.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
          <CalendarX2 className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-astrian-charcoal dark:text-gray-100 mb-2">No sessions found</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
          Schedule your first yoga session to get started.
        </p>
      </div>
    );
  }

  // Helper to format time nicely from "HH:mm:ss" to "h:mm a"
  const formatTime = (timeStr: string) => {
    try {
      const date = parse(timeStr, 'HH:mm:ss', new Date());
      return format(date, 'h:mm a');
    } catch {
      return timeStr; // fallback
    }
  };

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'SCHEDULED': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'FULL': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'CANCELLED': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase font-semibold text-gray-500 border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-4">Practice</th>
              <th className="px-6 py-4">Instructor</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Capacity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/5">
            {sessions.map((session) => (
              <tr key={session.id} className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${session.status === 'CANCELLED' ? 'opacity-60' : ''}`}>
                <td className="px-6 py-4 font-medium text-astrian-charcoal dark:text-gray-100">
                  {session.practice_name}
                </td>
                <td className="px-6 py-4">
                  {session.instructor_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(session.session_date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatTime(session.start_time)} - {formatTime(session.end_time)}
                </td>
                <td className="px-6 py-4">
                  {session.capacity} seats
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyles(session.status)}`}>
                    {session.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {session.status !== 'CANCELLED' && (
                      <button 
                        onClick={() => onCancel(session)}
                        className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                        title="Cancel Session"
                      >
                        <CalendarX2 className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => onEdit(session)}
                      className="p-2 text-gray-400 hover:text-astrian-sage transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(session)}
                      className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
