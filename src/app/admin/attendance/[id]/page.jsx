import { CONFIG } from 'src/global-config';
import { getAttendanceDetail } from 'src/actions/admin/attendance';

import AdminAttendanceDetailsView from 'src/sections/_admin/view/admin-attendance-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance details | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;
  const data = await getAttendanceDetail(id);

  return <AdminAttendanceDetailsView id={id} data={data} />;
}
