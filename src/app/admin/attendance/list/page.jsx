import { CONFIG } from 'src/global-config';

import AdminAttendanceListView from 'src/sections/_admin/view/admin-attendance-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance list | ${CONFIG.appName}` };

export default function Page() {
	return <AdminAttendanceListView />
}
