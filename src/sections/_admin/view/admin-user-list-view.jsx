'use client';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { userColumns } from '../columns-def';
import CustomDataGrid from '../components/custom-data-grid';

// ----------------------------------------------------------------------

export default function AdminUserListView({ data = [] }) {
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
        action={
          <Button
            component={RouterLink}
            variant="contained"
            startIcon={<Iconify icon="line-md:plus" />}
            href={paths.admin.user.create}
          >
            Create User
          </Button>
        }
      />

      <CustomDataGrid rows={data} columns={userColumns} />
    </>
  );
}
