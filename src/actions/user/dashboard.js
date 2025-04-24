'use server';

import { customFetch } from '../utils';

export const getUserDashboardData = async () => {
	const res = await customFetch('/dashboard/user', {
		next: { tags: ['user-dashboard'], revalidate: 10 },
	});

	return res;
};
