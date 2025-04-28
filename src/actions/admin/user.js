'use server';

import { revalidateTag } from 'next/cache';

import { customFetch } from '../utils';

// ----------------------------------------------------------------------

export const createUser = async (formData) => {
  const res = await customFetch('/users', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  revalidateTag('user-list');
  return res;
};

export const getUserDetails = async (id) => {
  const res = await customFetch(`/users/${id}`, {
    next: { tags: [`user-detail-${id}`], revalidate: 30 },
  });

  return res;
};

export const getUserList = async (searchParams) => {
  let params = new URLSearchParams(await searchParams);

  try {
    const res = await customFetch(`/users?${params.toString()}`, {
      next: { tags: ['user-list'], revalidate: 10 },
    });

    return res;
  } catch (err) {
    console.log(err);
    return { error: 'Failed to fetch user list' };
  }
};

export const updateUser = async (formData) => {
  const res = await customFetch(`/users/${formData.get('id')}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
  });

  revalidateTag('user-list');
  revalidateTag('admin-dashboard');
  revalidateTag(`user-detail-${formData.get('id')}`);
  return res;
};

export const deleteUser = async (id) => {
  const res = await customFetch(`/users/${id}`, {
    method: 'DELETE',
    next: { tags: ['user-list'] },
  });

  revalidateTag('user-list');
  return res;
};

export const searchUser = async (query) => {
  const res = await customFetch(`/users/search?query=${query}`, {
    next: { tags: ['user-list'], revalidate: 10 },
  });

  return res;
};
