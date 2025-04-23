import { CONFIG } from 'src/global-config';
import { getCurrentUser } from 'src/actions/auth';

import AdminAccountView from 'src/sections/_admin/view/admin-account-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Admin account | ${CONFIG.appName}` };

export default async function Page() {
  const user = await getCurrentUser();

  return <AdminAccountView data={user} />;
}
