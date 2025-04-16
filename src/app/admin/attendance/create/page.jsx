import { CONFIG } from 'src/global-config';

import AdminAttendanceCreateView from 'src/sections/_admin/view/admin-attendance-create-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new attendance | ${CONFIG.appName}` };

export default function Page() {
	return <AdminAttendanceCreateView />
}
