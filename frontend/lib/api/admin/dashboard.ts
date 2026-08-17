import { apiClient } from '../../apiClient';

export interface DashboardStats {
  totalUsers: number;
  totalPractices: number;
  totalInstructors: number;
  upcomingSessions: number;
  totalBookings: number;
  pendingPasses: number;
  pendingReviews: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get('/admin/dashboard/stats');
  return response.data.data;
};
