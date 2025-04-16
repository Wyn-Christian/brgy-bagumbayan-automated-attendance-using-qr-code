import { CONFIG } from 'src/global-config';

import AdminAuditLogsDetailsView from 'src/sections/_admin/view/admin-audit-logs-details-view';


// ----------------------------------------------------------------------

export const metadata = { title: `Audit Log Details | ${CONFIG.appName}` };

export default function Page() {
	return <AdminAuditLogsDetailsView />
}
