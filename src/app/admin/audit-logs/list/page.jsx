import { CONFIG } from 'src/global-config';

import AdminAuditLogsListView from 'src/sections/_admin/view/admin-audit-logs-list-view';


// ----------------------------------------------------------------------

export const metadata = { title: `Audit Logs List | ${CONFIG.appName}` };

export default function Page() {
	return <AdminAuditLogsListView />
}
