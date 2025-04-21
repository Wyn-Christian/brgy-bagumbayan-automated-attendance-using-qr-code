'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import UserAccountForm from '../forms/user-account-form';

// ----------------------------------------------------------------------

export default function UserAccountView({ data }) {
  return (
    <>
      <CustomBreadcrumbs
        sx={{ mb: { xs: 3, md: 5 } }}
        backHref={paths.user.dashboard}
        heading="Account"
        links={[
          {
            name: 'Dashboard',
            href: paths.user.dashboard,
          },
          { name: 'User' },
          { name: 'Account' },
        ]}
      />
      <UserAccountForm initialValues={data} />
    </>
  );
}
