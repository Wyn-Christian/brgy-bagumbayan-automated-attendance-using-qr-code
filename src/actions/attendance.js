'use server';

import { customFetch } from './utils';

export async function checkIn(payload) {
  return await customFetch('/attendance-sessions/check-in', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function checkOut(payload) {
  return await customFetch('/attendance-sessions/check-out', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
