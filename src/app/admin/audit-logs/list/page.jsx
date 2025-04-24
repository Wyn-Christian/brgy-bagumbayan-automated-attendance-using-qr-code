import { CONFIG } from 'src/global-config';
import { getAuditLogsList } from 'src/actions/admin/audit-logs';

import AdminAuditLogsListView from 'src/sections/_admin/view/admin-audit-logs-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Audit Logs List | ${CONFIG.appName}` };

export default async function Page({ searchParams }) {
  const result = await getAuditLogsList(searchParams);

  console.log(result);

  return <AdminAuditLogsListView data={result?.data} meta={result?.meta} />;
}
