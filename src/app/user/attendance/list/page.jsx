import dayjs from 'dayjs';

import { CONFIG } from 'src/global-config';
import { getUserAttendanceList } from 'src/actions/user/attendance';

import UserAttendanceListView from 'src/sections/_user/view/user-attendance-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance List | ${CONFIG.appName}` };

// ----------------------------------------------------------------------

export default async function Page({ searchParams }) {
  const result = await getUserAttendanceList(searchParams);

  return <UserAttendanceListView data={result?.data} meta={result?.meta} />;
}
