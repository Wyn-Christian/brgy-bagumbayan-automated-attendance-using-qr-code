'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CustomDataGrid from 'src/sections/_admin/components/custom-data-grid';

import { attendanceColumns } from '../columns-def';

// ----------------------------------------------------------------------

export default function UserAttendanceListView({ data }) {
  return (
    <>
      <CustomBreadcrumbs
        sx={{ mb: { xs: 3, md: 5 } }}
        heading="Attendance List"
        links={[
          {
            name: 'Dashboard',
            href: paths.user.dashboard,
          },
          {
            name: 'Attendance',
            href: paths.user.attendance.list,
          },
          { name: 'List' },
        ]}
      />
      <CustomDataGrid rows={data} columns={attendanceColumns} />
    </>
  );
}
