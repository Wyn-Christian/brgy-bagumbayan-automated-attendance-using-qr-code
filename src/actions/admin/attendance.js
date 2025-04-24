'use server';

import { revalidateTag } from 'next/cache';

import { customFetch } from '../utils';

export const createAttendance = async (formData) => {
  const res = await customFetch('/attendance-sessions', {
    method: 'POST',
    body: JSON.stringify(formData),
    next: { tags: ['admin-attendance-list'] },
  });

  revalidateTag('admin-attendance-list');
  return res;
};

export const getAttendanceDashboardData = async () => {
  const res = await customFetch('/attendance-sessions/dashboard', {
    next: { tags: ['admin-attendance-dashboard'], revalidate: 10 },
  });

  return res;
};

export const getAttendanceList = async (searchParams) => {
  let params = new URLSearchParams(await searchParams);

  try {
    const res = await customFetch(`/attendance-sessions?${params.toString()}`, {
      next: { tags: ['admin-attendance-list'], revalidate: 10 },
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

export const getUserAttendanceList = async (userId, searchParams) => {
  let params = new URLSearchParams(await searchParams);

  try {
    const res = await customFetch(`/attendance-sessions/user/${userId}?${params.toString()}`, {
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

export const getAttendanceDetail = async (id) => {
  try {
    const res = await customFetch(`/attendance-sessions/${id}`, {
      next: { tags: [`admin-attendance-detail-${id}`], revalidate: 30 },
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

export const updateAttendance = async (id, formData) => {
  const res = await customFetch(`/attendance-sessions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(formData),
    next: { tags: ['admin-attendance-list', `admin-attendance-detail-${id}`] },
  });

  revalidateTag('admin-attendance-list');
  revalidateTag(`admin-attendance-detail-${id}`);
  return res;
};

export const deleteAttendance = async (id) => {
  const res = await customFetch(`/attendance-sessions/${id}`, {
    method: 'DELETE',
    next: { tags: ['admin-attendance-list'] },
  });

  revalidateTag('admin-attendance-list');
  return res;
};
