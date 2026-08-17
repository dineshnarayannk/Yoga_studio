import { apiClient } from '../../apiClient';

export interface Session {
  id: number;
  practice_id: number;
  instructor_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  status: 'SCHEDULED' | 'FULL' | 'CANCELLED' | 'COMPLETED';
  created_at: string;
  updated_at: string;
  
  // Joined fields
  practice_name: string;
  instructor_name: string;
}

export interface SessionFormData {
  practice_id: number;
  instructor_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  status: 'SCHEDULED' | 'FULL' | 'CANCELLED' | 'COMPLETED';
}

export const getSessions = async (): Promise<Session[]> => {
  const response = await apiClient.get('/admin/sessions');
  return response.data.data;
};

export const getSessionById = async (id: number): Promise<Session> => {
  const response = await apiClient.get(`/admin/sessions/${id}`);
  return response.data.data;
};

export const createSession = async (data: SessionFormData): Promise<Session> => {
  const response = await apiClient.post('/admin/sessions', data);
  return response.data.data;
};

export const updateSession = async (id: number, data: SessionFormData): Promise<Session> => {
  const response = await apiClient.put(`/admin/sessions/${id}`, data);
  return response.data.data;
};

export const deleteSession = async (id: number): Promise<void> => {
  await apiClient.delete(`/admin/sessions/${id}`);
};
