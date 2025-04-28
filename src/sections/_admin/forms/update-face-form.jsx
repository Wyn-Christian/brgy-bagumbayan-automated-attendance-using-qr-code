import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { updateUser } from 'src/actions/admin/user';

import { Form } from 'src/components/hook-form';
import { FaceCaptureSection } from 'src/components/face-recognition-camera';

import { updateFaceSchema } from '../schema';

export default function UpdateFaceForm({ userId, userData }) {
  const methods = useForm({
    resolver: zodResolver(updateFaceSchema),
    defaultValues: { face: null, id: Number(userId) },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const newFace = watch('face');

  const onSubmit = handleSubmit(async (data) => {
    console.log('onSubmit exe');
    try {
      const formData = new FormData();
      formData.append('id', data.id);
      formData.append('face', data.face);

      console.log('HAAHH');

      const res = await updateUser(formData);

      if (res.error) {
        enqueueSnackbar(res.error || 'Failed to update face.', { variant: 'error' });
        return;
      }

      enqueueSnackbar('Face updated test successfully!', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <FaceCaptureSection name="face" defaultImageUrl={userData.face_image_path} />

        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="contained" disabled={isSubmitting || !newFace}>
            {isSubmitting ? 'Saving...' : 'Update Face'}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
