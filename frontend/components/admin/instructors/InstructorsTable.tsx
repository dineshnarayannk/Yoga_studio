"use client";

import { Instructor } from "@/lib/api/admin/instructors";
import { Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";

interface InstructorsTableProps {
  instructors: Instructor[];
  onEdit: (instructor: Instructor) => void;
  onDelete: (instructor: Instructor) => void;
}

export function InstructorsTable({ instructors, onEdit, onDelete }: InstructorsTableProps) {
  if (instructors.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1c1f1d] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-astrian-charcoal dark:text-gray-100 mb-2">No instructors found</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
          Add your first instructor to get started.
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
              <th className="px-6 py-4">Specialization</th>
              <th className="px-6 py-4">Experience</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/5">
            {instructors.map((instructor) => (
              <tr key={instructor.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  {instructor.image ? (
                    <img 
                      src={instructor.image} 
                      alt={instructor.name} 
                      className="w-12 h-12 rounded-full object-cover bg-gray-100 dark:bg-gray-800"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {instructor.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-astrian-charcoal dark:text-gray-100">
                  {instructor.name}
                </td>
                <td className="px-6 py-4">
                  {instructor.specialization || '-'}
                </td>
                <td className="px-6 py-4">
                  {instructor.experience || '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    instructor.status === 'ACTIVE' 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {instructor.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {instructor.display_order}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onEdit(instructor)}
                      className="p-2 text-gray-400 hover:text-astrian-sage transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(instructor)}
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
