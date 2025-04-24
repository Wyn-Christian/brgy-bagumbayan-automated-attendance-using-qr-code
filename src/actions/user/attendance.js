'use server';

import { customFetch } from '../utils';

export const getUserAttendanceList = async (searchParams) => {
  let params = new URLSearchParams(await searchParams);

  try {
    const res = await customFetch(`/attendance-sessions/current-user?${params.toString()}`, {
      next: { tags: ['user-attendance-list'], revalidate: 10 },
    });

    return res;
  } catch (err) {
    console.log(err);
    return {
      error: 'Failed to fetch attendance list',
      status: 500,
      message: 'Internal Server Error',
    };
  }
};
