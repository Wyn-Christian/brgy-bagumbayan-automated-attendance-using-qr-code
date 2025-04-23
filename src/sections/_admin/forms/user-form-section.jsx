'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { prepareUserPayload } from 'src/utils/prepare-payload';

import { updateUser } from 'src/actions/admin/user';

import { Form } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserFormSection({ schema, defaultValues, children }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  // Handle form submit
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      const payload = prepareUserPayload(data);
      const res = await updateUser(payload);

      if (res?.status === 400) {
        Object.entries(res.message).forEach(([field, messages]) => {
          setError(field, {
            type: 'manual',
            message: messages[0] || 'Invalid input',
          });
        });

        enqueueSnackbar({
          variant: 'error',
          message: 'Validation failed. Please check the form.',
        });
        return;
      }

      console.log(res);
      enqueueSnackbar('Changes saved successfully.', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        {children}
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          {/* Reset Button */}
          <Button
            variant="outlined"
            color="error"
            disabled={Object.keys(errors).length === 0}
            onClick={() => reset()}
          >
            Reset
          </Button>

          {/* Submit Button */}
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
