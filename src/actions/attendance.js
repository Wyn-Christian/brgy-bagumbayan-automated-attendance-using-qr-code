'use server';

import { customFetch } from './utils';

export async function checkIn(payload) {
  console.log(payload);

  return await customFetch('/attendance-sessions/check-in', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function checkOut() {
  // Will be implemented next
}
