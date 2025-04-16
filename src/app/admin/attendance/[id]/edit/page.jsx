import { CONFIG } from 'src/global-config';

import AdminAttendanceEditView from 'src/sections/_admin/view/admin-attendance-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Edit attendance | ${CONFIG.appName}` };

export default function Page() {
	return <AdminAttendanceEditView />
}
