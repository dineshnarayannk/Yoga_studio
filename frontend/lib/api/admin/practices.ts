import { apiClient } from '../../apiClient';

export interface YogaPractice {
  id: number;
  name: string;
  description: string;
  short_description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
  duration: number;
  image: string | null;
  category: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PracticeFormData {
  name: string;
  description: string;
  short_description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
  duration: number;
  category: string;
  image?: string;
  status: 'ACTIVE' | 'INACTIVE';
  display_order: number;
}

export const getPractices = async (): Promise<YogaPractice[]> => {
  const response = await apiClient.get('/admin/practices');
  return response.data.data;
};

export const getPracticeById = async (id: number): Promise<YogaPractice> => {
  const response = await apiClient.get(`/admin/practices/${id}`);
  return response.data.data;
};

export const createPractice = async (data: PracticeFormData): Promise<YogaPractice> => {
  const response = await apiClient.post('/admin/practices', data);
  return response.data.data;
};

export const updatePractice = async (id: number, data: PracticeFormData): Promise<YogaPractice> => {
  const response = await apiClient.put(`/admin/practices/${id}`, data);
  return response.data.data;
};

export const deletePractice = async (id: number): Promise<void> => {
  await apiClient.delete(`/admin/practices/${id}`);
};
