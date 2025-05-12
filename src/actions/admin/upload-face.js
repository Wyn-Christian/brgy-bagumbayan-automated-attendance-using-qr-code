'use server';

import { customFetch } from '../utils';

export const uploadFace = async (file) => {
  const formData = new FormData();
  formData.append('face', file);

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/face/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || 'Face upload failed');
    }

    const result = await res.json();
    return result.path;
  } catch (error) {
    console.error('Face upload error:', error);
    throw error;
  }
};

export const getFaceImages = async (searchParams) => {
  const params = new URLSearchParams(await searchParams);

  try {
    const res = await customFetch(`/face/gallery?${params.toString()}`, {
      next: { tags: ['face-gallery'], revalidate: 10 },
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
