import { CONFIG } from 'src/global-config';

import AdminUserDetailsView from 'src/sections/_admin/view/admin-user-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User details | ${CONFIG.appName}` };

export default function Page() {
	return <AdminUserDetailsView />
}
