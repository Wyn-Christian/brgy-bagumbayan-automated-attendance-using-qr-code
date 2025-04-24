'use client';

import { SnackbarProvider } from 'notistack';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';

import { departments } from 'src/assets/data';

import { Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import UserFormSection from 'src/sections/_admin/forms/user-form-section';
import CustomCardForm from 'src/sections/_admin/components/custom-card-form';

import { passwordSchema, roleDeptSchema, userInfoSchema, credentialsSchema } from '../schema';

// ----------------------------------------------------------------------

export default function AdminUserAccountView({ id, data }) {
  const renderUserInfo = () => (
    <CustomCardForm title="User Info" subheader="Basic personal information.">
      <UserFormSection schema={userInfoSchema} defaultValues={data}>
        <Field.Text name="first_name" label="First Name" />
        <Field.Text name="middle_name" label="Middle Name" />
        <Field.Text name="last_name" label="Last Name" />

        <Field.Select name="gender" label="Gender">
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Field.Select>

        <Field.DatePicker name="birthday" label="Birthday" />
        <Field.Text name="address" label="Address" />
      </UserFormSection>
    </CustomCardForm>
  );

  const renderRoleAndDepartment = () => (
    <CustomCardForm title="Role & Department" subheader="User access and department.">
      <UserFormSection schema={roleDeptSchema} defaultValues={data}>
        <Field.Select name="department" label="Department">
          {departments.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
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
          sx={{ gap: 1 }}
        />
      </UserFormSection>
    </CustomCardForm>
  );

  const renderCredentials = () => (
    <CustomCardForm title="Account Credentials" subheader="Login information.">
      <UserFormSection schema={credentialsSchema} defaultValues={data}>
        <Field.Text name="email" label="Email" />
        <Field.Phone name="contact_number" label="Phone Number" country="PH" />
      </UserFormSection>
    </CustomCardForm>
  );

  const renderPasswordUpdate = () => (
    <CustomCardForm title="Change Password" subheader="Set a new user password.">
      <UserFormSection
        schema={passwordSchema}
        defaultValues={{ id: data.id, password: '', confirm_password: '' }}
      >
        <Field.Text name="password" label="Password" type="password" />
        <Field.Text name="confirm_password" label="Confirm Password" type="password" />
      </UserFormSection>
    </CustomCardForm>
  );

  return (
    <>
      <SnackbarProvider />
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: paths.user.dashboard },
          { name: 'User' },
          { name: 'Account' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <div>
        <Stack spacing={5} sx={{ maxWidth: 720, mx: 'auto' }}>
          {/* User Personal Information */}
          {renderUserInfo()}

          {/* User Role & Department*/}
          {renderRoleAndDepartment()}

          {/* User Credentials (email & contact number) */}
          {renderCredentials()}

          {/* Update Password Form */}
          {renderPasswordUpdate()}
        </Stack>
      </div>
    </>
  );
}
