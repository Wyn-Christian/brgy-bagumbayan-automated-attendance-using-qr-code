'use server';

import { customFetch } from '../utils';

export const getAdminDashboardData = async () => {
  const res = await customFetch('/dashboard/admin', {
    next: { tags: ['admin-dashboard'], revalidate: 10 },
  });

  return res;
};
