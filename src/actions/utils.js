import { cookies } from 'next/headers';

export const API_URL = process.env.BACKEND_URL;

export async function getHeaders(isFormData = false) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token_cookie')?.value;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
}

export async function customFetch(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = await getHeaders(isFormData);

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const error = await res.json();

      logError({
        type: 'API_ERROR',
        path,
        status: res.status,
        message: error.message,
      });

      return { ...error, status: res.status };
    }

    return await res.json();
  } catch (err) {
    logError({
      type: 'FETCH_FAILURE',
      path,
      message: err.message,
    });

    return { error: 'Fetch Failed', message: 'Internal Server Error', status: 500 };
  }
}

// -------------------
// Error Logger
// -------------------
export function logError({ type, path, status, message }) {
  // Basic local logging
  console.error(`[${type}] ${path} ${status || ''} → ${message}`);
}
