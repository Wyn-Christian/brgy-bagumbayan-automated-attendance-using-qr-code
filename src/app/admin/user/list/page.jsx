import { CONFIG } from 'src/global-config';

import AdminUserListView from 'src/sections/_admin/view/admin-user-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User list | ${CONFIG.appName}` };

export default function Page() {
	return <AdminUserListView />
}
