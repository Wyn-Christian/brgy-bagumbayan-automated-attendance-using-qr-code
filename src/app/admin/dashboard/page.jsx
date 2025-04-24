import { CONFIG } from 'src/global-config';
import { getAdminDashboardData } from 'src/actions/admin/dashboard';

import AdminDashboardView from 'src/sections/_admin/view/admin-dashboard-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard | ${CONFIG.appName}` };

// ----------------------------------------------------------------------

export default async function Page() {
  const dashboard_data = await getAdminDashboardData();

  console.log(dashboard_data);
  return (
    <AdminDashboardView
      summary={dashboard_data?.summary}
      attendance={dashboard_data?.attendance}
      user_by_dept={dashboard_data?.user_by_dept}
    />
  );
}
