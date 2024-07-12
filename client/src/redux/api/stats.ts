import { Stat } from '../../types';
import { apiClient } from './apiClient';

export const fetchStats = async () => {
  const { data, status } = await apiClient.get<Stat>('/stats');

  return { data, status };
};
