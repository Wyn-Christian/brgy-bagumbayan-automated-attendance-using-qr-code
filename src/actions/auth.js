'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import { API_URL, customFetch } from './utils';

// --------------------
// LOGIN ACTION
// --------------------
export async function login(formData) {
  const cookie = await cookies();

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json();

      return { ...error, status: res.status };
    }

    const data = await res.json();

    cookie.set('access_token_cookie', data.access_token);
    cookie.set('refresh_token_cookie', data.refresh_token);

    return data?.user;
  } catch (err) {
    return { error: 'Log in failed', status: 500, message: err.message };
  }
}

// --------------------
// LOGOUT ACTION
// --------------------
export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set('access_token_cookie', '');
  cookieStore.set('refresh_token_cookie', '');

  redirect('/');
}

// --------------------
// GET CURRENT USER
// --------------------
export const getCurrentUser = async () => {
  const data = await customFetch('/users/me', {
    next: { tags: ['current-user'] },
  });
  return data;
};

export async function checkUserRole(role) {
  const cookie = await cookies();

  if (!cookie.has('access_token_cookie') && !cookie.get('access_token_cookie')?.value) {
    redirect('/');
  }

  let response = await customFetch('/users/me', {
    next: { tags: ['current-user'] },
  });

  if (!response || !response.role) {
    redirect('/');
  }
}

export const updateUserAccount = async (formData) => {
  const data = await customFetch(`/users/${formData.id}`, {
    method: 'PATCH',
    body: JSON.stringify(formData),
    next: { tags: ['current-user'] },
  });

  revalidateTag('current-user');

  return data;
};
