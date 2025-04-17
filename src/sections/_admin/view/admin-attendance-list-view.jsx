'use client';

import { paths } from 'src/routes/paths';

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
      />
      <CustomDataGrid rows={mockAttendanceRows} columns={attendanceColumns} />
    </>
  );
}
