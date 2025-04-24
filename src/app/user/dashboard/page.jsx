import { CONFIG } from 'src/global-config';
import { getUserDashboardData } from 'src/actions/user/dashboard';

import UserDashboardView from 'src/sections/_user/view/user-dashboard-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard | ${CONFIG.appName}` };

export default async function Page() {
  const data = await getUserDashboardData();

  return (
    <UserDashboardView
      user={data?.user}
      summary={data?.summary}
      recent_attendance={data?.recent_attendance}
    />
  );
}
