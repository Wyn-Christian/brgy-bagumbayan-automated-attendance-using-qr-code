'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AttendanceForm from '../forms/attendance-form';

// ----------------------------------------------------------------------

export default function AdminAttendanceEditView({ id }) {
  const initialValues = {
    id,
    user_id: { id: 1, full_name: 'Jon Snow' },
    check_in_time: '2025-04-13T08:00:00',
    check_out_time: '2025-04-13T16:00:00',
    source: 'manual',
    remarks: 'Edited remarks',
  };

  return (
    <>
      <CustomBreadcrumbs
        backHref={paths.admin.attendance.details(id)}
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin.dashboard,
          },
          {
            name: 'Attendance',
            href: paths.admin.attendance.list,
          },
          { name: 'Edit' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {initialValues && <AttendanceForm mode="edit" initialValues={initialValues} />}
    </>
  );
}
