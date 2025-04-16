import { CONFIG } from 'src/global-config';

import AdminUserEditView from 'src/sections/_admin/view/admin-user-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User edit | ${CONFIG.appName}` };

export default function Page() {
	return <AdminUserEditView />
}
