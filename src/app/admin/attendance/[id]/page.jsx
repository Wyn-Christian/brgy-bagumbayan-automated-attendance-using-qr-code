import { CONFIG } from 'src/global-config';

import AdminAttendanceDetailsView from 'src/sections/_admin/view/admin-attendance-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance details | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;

  const data = {
    id,
    user: {
      id: 1,
      full_name: 'Jon Snow',
    },
    check_in_time: '2025-04-15T08:00:00',
    check_out_time: '2025-04-15T16:00:00',
    source: 'kiosk',
    remarks: 'Attended field activity',
    created_at: '2025-04-15T08:00:00',
    updated_at: '2025-04-15T16:00:00',
  };

  return <AdminAttendanceDetailsView id={id} data={data} />;
}
