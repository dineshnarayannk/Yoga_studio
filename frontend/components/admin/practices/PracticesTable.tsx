"use client";

import { YogaPractice } from "@/lib/api/admin/practices";
import { Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";

interface PracticesTableProps {
  practices: YogaPractice[];
  onEdit: (practice: YogaPractice) => void;
  onDelete: (practice: YogaPractice) => void;
}

export function PracticesTable({ practices, onEdit, onDelete }: PracticesTableProps) {
  if (practices.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-astrian-charcoal dark:text-gray-100 mb-2">No yoga practices found</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
          Add your first yoga practice to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase font-semibold text-gray-500 border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Difficulty & Duration</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created At</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/5">
            {practices.map((practice) => (
              <tr key={practice.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  {practice.image ? (
                    <img 
                      src={practice.image} 
                      alt={practice.name} 
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-astrian-charcoal dark:text-gray-100">
                  {practice.name}
                </td>
                <td className="px-6 py-4">
                  {practice.category || '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span>{practice.difficulty.replace('_', ' ')}</span>
                    <span className="text-xs text-gray-500">{practice.duration} min</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {practice.display_order}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    practice.status === 'ACTIVE' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {practice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs whitespace-nowrap">
                  {format(new Date(practice.created_at), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(practice)}
                      className="p-2 text-gray-400 hover:text-astrian-sage transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(practice)}
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
