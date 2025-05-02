'use server';

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
