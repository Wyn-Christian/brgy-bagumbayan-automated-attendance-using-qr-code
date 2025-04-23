'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { Form, Field } from 'src/components/hook-form';

import { attendanceSchema } from '../schema';
import SelectUser from '../components/select-user';
import CustomCardForm from '../components/custom-card-form';

// ----------------------------------------------------------------------

export default function AttendanceForm({ mode = 'create', initialValues, submitHandler }) {
  const methods = useForm({
    resolver: zodResolver(attendanceSchema),
    defaultValues: initialValues || {
      user: null,
      check_in_time: null,
      check_out_time: null,
      source: 'manual',
      remarks: '',
    },
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => await submitHandler(formData, setError));

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack
        sx={{
          mx: 'auto',
          maxWidth: { xs: 720, lg: 880 },
          gap: 5,
        }}
      >
        <CustomCardForm title="Attendance Info" subheader="Fill out the core details">
          <SelectUser initialValues={initialValues} />

          <Field.MobileDateTimePicker name="check_in_time" label="Check-in Time" />
          <Field.MobileDateTimePicker name="check_out_time" label="Check-out Time (optional)" />
        </CustomCardForm>

        <CustomCardForm title="Extra Details" subheader="Optional remarks and source">
          <Field.Select name="source" label="Source">
            <MenuItem value="manual">Manual</MenuItem>
            <MenuItem value="kiosk">Kiosk</MenuItem>
          </Field.Select>

          <Field.Text
            name="remarks"
            label="Remarks"
            placeholder="Any comments or notes..."
            multiline
            rows={3}
          />
        </CustomCardForm>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" gap={1}>
          <Button
            variant="outlined"
            color="error"
            disabled={Object.keys(errors).length === 0}
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting
              ? mode === 'edit'
                ? 'Saving...'
                : 'Creating...'
              : mode === 'edit'
                ? 'Save Changes'
                : 'Create'}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
