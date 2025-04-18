'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import UserForm from '../forms/user-form';

// ----------------------------------------------------------------------

export default function AdminUserCreateView() {
  return (
    <>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin.dashboard,
          },
          {
            name: 'User',
            href: paths.admin.user.list,
          },
          { name: 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <UserForm />
    </>
  );
}
