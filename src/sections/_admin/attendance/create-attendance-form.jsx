'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { Form, Field } from 'src/components/hook-form';

import { attendanceSchema } from '../schema';
import CustomCardForm from '../components/custom-card-form';

// ----------------------------------------------------------------------

const defaultValues = {
  user_id: null,
  check_in_time: null,
  check_out_time: null,
  source: 'kiosk',
  remarks: '',
};

// ----------------------------------------------------------------------

export default function CreateAttendanceForm() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(attendanceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('Submitting attendance:', data);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  // Simulate input-based fetch
  useEffect(() => {
    if (!inputValue) {
      setOptions([]); // clear options
      setLoading(false); // stop loading state
      return;
    }

    const timeout = setTimeout(() => {
      const allUsers = [
        { id: 1, label: 'Jon Snow' },
        { id: 2, label: 'Arya Stark' },
        { id: 3, label: 'Tyrion Lannister' },
        { id: 4, label: 'Daenerys Targaryen' },
        { id: 5, label: 'Cersei Lannister' },
        { id: 6, label: 'Jorah Mormont' },
      ];

      const filtered = allUsers.filter((user) =>
        user.label.toLowerCase().includes(inputValue.toLowerCase())
      );

      setOptions(filtered);
      setLoading(false);
    }, 500); // simulate debounce/fetch delay

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout);
  }, [inputValue]);

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
          <Field.Autocomplete
            name="user_id"
            label="User"
            placeholder="Search user..."
            options={options}
            loading={loading}
            disabled={loading && inputValue.length === 0}
            onInputChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setInputValue(newValue);
              }
            }}
            getOptionLabel={(option) => option?.label ?? ''}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
          />

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
            variant="contained"
            type="submit"
            color="error"
            disabled={Object.keys(errors).length === 0}
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button variant="contained" type="submit">
            {isSubmitting ? 'Creating...' : 'Create Attendance'}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
