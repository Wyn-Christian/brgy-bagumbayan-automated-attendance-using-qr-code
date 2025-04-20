'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import UserAccountForm from '../forms/user-account-form';

// ----------------------------------------------------------------------

export default function AdminAccountView({ data }) {
  return (
    <>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin.dashboard,
          },
          {
            name: 'User',
            href: paths.admin.user.list,
          },
          { name: 'Account' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <UserAccountForm initialValues={data} />
    </>
  );
}
