'use client';

import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { userSchema } from '../schema';
import CustomCardForm from '../components/custom-card-form';

// ----------------------------------------------------------------------

const defaultValues = {
  first_name: '',
  middle_name: '',
  last_name: '',
  gender: '',
  birthday: null,
  address: '',
  email: '',
  contact_number: '',
  password: '',
  confirmPassword: '',
  role: 'user',
};

// ----------------------------------------------------------------------

export default function UserForm({ mode = 'create', initialValues }) {
  const showPassword = useBoolean();
  const { value: IsChangePassword, setValue: setIsChangePassword } = useBoolean(!(mode === 'edit'));

  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues || defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('Submitting user:', data);
      await new Promise((r) => setTimeout(r, 2000));
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ maxWidth: 720, mx: 'auto' }}>
        <CustomCardForm title="User Info" subheader="Fill out the basic user details.">
          <Field.Text name="first_name" label="First Name" />
          <Field.Text name="middle_name" label="Middle Name" />
          <Field.Text name="last_name" label="Last Name" />

          <Field.Select name="gender" label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Field.Select>

          <Field.DatePicker name="birthday" label="Birthday" />

          <Field.Text name="address" label="Address" />
        </CustomCardForm>

        <CustomCardForm title="Account Credentials">
          <Field.Text name="email" label="Email" />
          <Field.Phone name="contact_number" label="Phone Number" country="PH" />

          {mode === 'edit' && (
            <FormControlLabel
              label="Change Password"
              control={
                <Switch
                  value={!IsChangePassword}
                  onChange={() => setIsChangePassword(!IsChangePassword)}
                />
              }
            />
          )}

          {(mode == 'create' || IsChangePassword) && (
            <>
              <Field.Text
                name="password"
                label="Password"
                type={showPassword.value ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={showPassword.onToggle} edge="end">
                          <Iconify
                            icon={
                              showPassword.value ? 'solar:eye-outline' : 'solar:eye-closed-outline'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Field.Text
                name="confirm_password"
                label="Confirm password"
                type={showPassword.value ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={showPassword.onToggle} edge="end">
                          <Iconify
                            icon={
                              showPassword.value ? 'solar:eye-outline' : 'solar:eye-closed-outline'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </>
          )}
          <Field.RadioGroup
            name="role"
            label="Role"
            row
            options={[
              { label: 'User', value: 'user' },
              { label: 'Admin', value: 'admin' },
            ]}
            sx={{ gap: 1 }}
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
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting
              ? mode === 'edit'
                ? 'Saving...'
                : 'Creating...'
              : mode === 'edit'
                ? 'Save Changes'
                : 'Create User'}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
