import { cookies } from 'next/headers';

export const API_URL = process.env.BACKEND_URL;

export async function getHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token_cookie')?.value;

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function customFetch(path, options = {}) {
  const headers = await getHeaders();

  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
      // cache: 'no-store',
    });

    if (!res.ok) {
      const error = await res.json();

      // Logging middleware
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
    // Unexpected error like network/server down
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
