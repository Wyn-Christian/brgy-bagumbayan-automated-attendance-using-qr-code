'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { userColumns, mockUserRows } from '../columns-def';
import CustomDataGrid from '../components/custom-data-grid';

// ----------------------------------------------------------------------

export default function AdminUserListView() {
  return (
    <>
      <CustomBreadcrumbs
        heading="List"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin.dashboard,
          },
          {
            name: 'User',
            href: paths.admin.user.list,
          },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CustomDataGrid rows={mockUserRows} columns={userColumns} />
    </>
  );
}
