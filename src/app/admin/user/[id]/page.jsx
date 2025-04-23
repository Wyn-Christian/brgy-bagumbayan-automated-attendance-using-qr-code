import { CONFIG } from 'src/global-config';
import { getUserDetails } from 'src/actions/admin/user';
import { getUserAttendanceList } from 'src/actions/admin/attendance';

import AdminUserDetailsView from 'src/sections/_admin/view/admin-user-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User details | ${CONFIG.appName}` };

export default async function Page({ params, searchParams }) {
  const { id } = await params;

  const user = await getUserDetails(id);
  const attendance_page = await getUserAttendanceList(id, searchParams);

  return <AdminUserDetailsView id={id} data={user} attendance_page={attendance_page} />;
}
