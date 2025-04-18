'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import UserForm from '../forms/user-form';

const mockFetchUser = async (id) => ({
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
  confirmPassword: '',
});

// ----------------------------------------------------------------------

export default function AdminUserEditView() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    mockFetchUser(id).then(setInitialValues);
  }, [id]);

  return (
    <>
      <CustomBreadcrumbs
        backHref={paths.admin.user.list}
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
