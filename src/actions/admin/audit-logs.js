'use server';

import { customFetch } from '../utils';

export const getAuditLogsList = async (searchParams) => {
  const params = new URLSearchParams(await searchParams);

  try {
    const res = await customFetch(`/audit-logs?${params.toString()}`, {
      next: { tags: ['admin-audit-logs-list'], revalidate: 10 },
    });
    return res;
  } catch (err) {
    console.error(err);
    return {
      error: 'Failed to fetch audit log list',
      status: 500,
      message: 'Internal Server Error',
    };
  }
};

export const getAuditLogsByUser = async (userId, searchParams) => {
  const params = new URLSearchParams(await searchParams);

  try {
    const res = await customFetch(`/audit-logs/user/${userId}?${params.toString()}`, {
      next: { tags: ['user-audit-logs-list'], revalidate: 10 },
    });
    return res;
  } catch (err) {
    console.error(err);
    return {
      error: 'Failed to fetch user audit log list',
      status: 500,
      message: 'Internal Server Error',
    };
  }
};

export const getAuditLogDetail = async (id) => {
  try {
    const res = await customFetch(`/audit-logs/${id}`, {
      next: { tags: [`admin-audit-log-detail-${id}`], revalidate: 30 },
    });
    return res;
  } catch (err) {
    console.error(err);
    return {
      error: 'Failed to fetch audit log detail',
      status: 500,
      message: 'Internal Server Error',
    };
  }
};
