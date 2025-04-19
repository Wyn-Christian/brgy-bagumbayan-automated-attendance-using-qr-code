'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import UserForm from '../forms/user-form';

// ----------------------------------------------------------------------

export default function AdminUserEditView({ id, data }) {
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

      {data && <UserForm mode="edit" initialValues={data} />}
    </>
  );
}
