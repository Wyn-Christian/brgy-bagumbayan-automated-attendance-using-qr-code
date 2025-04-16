import { CONFIG } from 'src/global-config';

import AdminUserCreateView from 'src/sections/_admin/view/admin-user-create-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new user | ${CONFIG.appName}` };

export default function Page() {
	return <AdminUserCreateView />
}
