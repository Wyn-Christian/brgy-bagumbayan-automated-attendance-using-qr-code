'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import UserForm from '../forms/user-form';

// ----------------------------------------------------------------------

export default function AdminUserEditView({ id }) {
  const initialValues = {
    id,
    first_name: 'Juan',
    middle_name: 'Santos',
    last_name: 'Dela Cruz',
    gender: 'male',
    birthday: '1990-01-01',
    address: '123 Bagumbayan, Taguig',
    email: 'juan@example.com',
    contact_number: '+639170000000',
    role: 'admin',
    password: '',
    confirm_password: '',
  };

  return (
    <>
      <CustomBreadcrumbs
        backHref={paths.admin.user.details(id)}
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.admin.dashboard },
          { name: 'User', href: paths.admin.user.list },
          { name: 'Edit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {initialValues && <UserForm mode="edit" initialValues={initialValues} />}
    </>
  );
}
