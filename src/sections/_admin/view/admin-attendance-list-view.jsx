'use client';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CustomDataGrid from '../components/custom-data-grid';
import { attendanceColumns, mockAttendanceRows } from '../columns-def';

// ----------------------------------------------------------------------

export default function AdminAttendanceListView() {
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
            name: 'Attendance',
            href: paths.admin.attendance.list,
          },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            component={RouterLink}
            variant="contained"
            startIcon={<Iconify icon="line-md:plus" />}
            href={paths.admin.attendance.create}
          >
            Create Attendance
          </Button>
        }
      />
      <CustomDataGrid rows={mockAttendanceRows} columns={attendanceColumns} />
    </>
  );
}
