import { CONFIG } from 'src/global-config';

import AdminAttendanceDetailsView from 'src/sections/_admin/view/admin-attendance-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance details | ${CONFIG.appName}` };

export default function Page() {
	return <AdminAttendanceDetailsView />
}
