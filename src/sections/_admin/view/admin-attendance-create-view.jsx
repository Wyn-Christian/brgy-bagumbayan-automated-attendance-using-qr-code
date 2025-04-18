'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AttendanceForm from '../forms/attendance-form';

// ----------------------------------------------------------------------

export default function AdminAttendanceCreateView() {
  return (
    <>
      <CustomBreadcrumbs
        heading="Create a new attendance"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin.dashboard,
          },
          {
            name: 'Attendance',
            href: paths.admin.attendance.list,
          },
          { name: 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <AttendanceForm />
    </>
  );
}
