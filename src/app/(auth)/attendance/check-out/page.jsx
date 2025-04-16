import { CONFIG } from 'src/global-config';

import { AttendanceCheckOutView } from 'src/sections/auth/attendance-check-out-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Check Out - ${CONFIG.appName}` };

export default function Page() {
	return <AttendanceCheckOutView />
}
