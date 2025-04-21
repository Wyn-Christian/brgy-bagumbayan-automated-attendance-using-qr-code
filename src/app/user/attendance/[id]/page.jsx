import { CONFIG } from 'src/global-config';

import UserAttendanceDetailsView from 'src/sections/_user/view/user-attendance-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance Details | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;

  const data = {
    id,
    user: {
      id: 1,
      full_name: 'Jon Snow',
    },
    check_in_time: '2025-04-15T08:00:00',
    // check_out_time: '2025-04-15T16:00:00',
    check_out_time: null,
    source: 'kiosk',
    remarks: 'Attended field activity',
    created_at: '2025-04-15T08:00:00',
    updated_at: '2025-04-15T16:00:00',
  };

  return <UserAttendanceDetailsView id={id} data={data} />;
}
