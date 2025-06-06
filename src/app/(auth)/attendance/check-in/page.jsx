import { CONFIG } from 'src/global-config';

import { AttendanceCheckInView } from 'src/sections/auth/attendance-check-in-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Time In - ${CONFIG.appName}` };

export default function Page() {
	return <AttendanceCheckInView />
}
