import { CONFIG } from 'src/global-config';

import { AttendanceLogView } from 'src/sections/auth/attendance-log-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance - ${CONFIG.appName}` };

export default function Page() {
  return <AttendanceLogView />;
}
