import { apiClient } from '../../apiClient';

export interface Instructor {
  id: number;
  name: string;
  bio: string;
  specialization: string | null;
  experience: string | null;
  image: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface InstructorFormData {
  name: string;
  bio: string;
  specialization: string;
  experience?: string;
  image?: string;
  status: 'ACTIVE' | 'INACTIVE';
  display_order: number;
}

export const getInstructors = async (): Promise<Instructor[]> => {
  const response = await apiClient.get('/admin/instructors');
  return response.data.data;
};

export const getInstructorById = async (id: number): Promise<Instructor> => {
  const response = await apiClient.get(`/admin/instructors/${id}`);
  return response.data.data;
};

export const createInstructor = async (data: InstructorFormData): Promise<Instructor> => {
  const response = await apiClient.post('/admin/instructors', data);
  return response.data.data;
};

export const updateInstructor = async (id: number, data: InstructorFormData): Promise<Instructor> => {
  const response = await apiClient.put(`/admin/instructors/${id}`, data);
  return response.data.data;
};

export const deleteInstructor = async (id: number): Promise<void> => {
  await apiClient.delete(`/admin/instructors/${id}`);
};
