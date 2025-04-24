'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';

import { prepareUserPayload } from 'src/utils/prepare-payload';

import { createUser } from 'src/actions/admin/user';
import { departments } from 'src/assets/data/departments';

import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

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
  role: 'user',
  department: 'Staff',
  password: '',
  confirm_password: '',
};

// ----------------------------------------------------------------------

export default function AdminUserCreateView() {
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = prepareUserPayload(data);
      const res = await createUser(payload);

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

      enqueueSnackbar('User created successfully!', { variant: 'success' });
      router.push(paths.admin.user.details(res.result.id));
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  });

  const renderUserInfo = () => (
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
  );

  const renderRoleDepartment = () => (
    <CustomCardForm title="Role & Department" subheader="Assign access and area.">
      <Field.Select name="department" label="Department">
        {departments.map((dept) => (
          <MenuItem key={dept} value={dept}>
            {dept}
          </MenuItem>
        ))}
      </Field.Select>
      <Field.RadioGroup
        name="role"
        label="Role"
        row
        options={[
          { label: 'User', value: 'user' },
          { label: 'Admin', value: 'admin' },
        ]}
      />
    </CustomCardForm>
  );

  const renderCredentials = () => (
    <CustomCardForm title="Account Credentials" subheader="Login email and phone.">
      <Field.Text name="email" label="Email" type="email" />
      <Field.Phone name="contact_number" label="Phone Number" country="PH" />
    </CustomCardForm>
  );

  const renderPassword = () => (
    <CustomCardForm title="Password" subheader="Set a secure login password.">
      <Field.Text name="password" label="Password" type="password" />
      <Field.Text name="confirm_password" label="Confirm Password" type="password" />
    </CustomCardForm>
  );

  return (
    <>
      <SnackbarProvider />
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          { name: 'Dashboard', href: paths.admin.dashboard },
          { name: 'User', href: paths.admin.user.list },
          { name: 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={5} sx={{ maxWidth: 720, mx: 'auto' }}>
          {/* User Personal Information */}
          {renderUserInfo()}

          {/* User Role & Department*/}
          {renderRoleDepartment()}

          {/* User Credentials (email & contact number) */}
          {renderCredentials()}

          {/* Update Password Form */}
          {renderPassword()}

          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create User'}
            </Button>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
