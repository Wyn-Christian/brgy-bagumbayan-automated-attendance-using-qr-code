import { CONFIG } from 'src/global-config';

import AdminDashboardView from 'src/sections/_admin/view/admin-dashboard-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard | ${CONFIG.appName}` };

export default function Page() {
  return <AdminDashboardView />;
}
