import { CONFIG } from 'src/global-config';
import { getAttendanceList } from 'src/actions/admin/attendance';

import AdminAttendanceListView from 'src/sections/_admin/view/admin-attendance-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance list | ${CONFIG.appName}` };

export default async function Page({ searchParams }) {
  const { data, meta } = await getAttendanceList(searchParams);

  return <AdminAttendanceListView data={data} meta={meta} />;
}
