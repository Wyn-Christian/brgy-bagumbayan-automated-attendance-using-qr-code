import { CONFIG } from 'src/global-config';
import { getUserAttendanceList } from 'src/actions/admin/attendance';
import { getUserDetails, getUserSummaryDetails } from 'src/actions/admin/user';

import AdminUserDetailsView from 'src/sections/_admin/view/admin-user-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User details | ${CONFIG.appName}` };

export default async function Page({ params, searchParams }) {
  const { id } = await params;

  const user = await getUserDetails(id);
  const summary = await getUserSummaryDetails(id);
  const attendance_page = await getUserAttendanceList(id, searchParams);

  return (
    <AdminUserDetailsView id={id} data={user} summary={summary} attendance_page={attendance_page} />
  );
}
