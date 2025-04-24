import { CONFIG } from 'src/global-config';
import { getCurrentUser } from 'src/actions/auth';

import UserAccountView from 'src/sections/_user/view/user-account-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Account | ${CONFIG.appName}` };

export default async function Page() {
  const user = await getCurrentUser();

  return <UserAccountView data={user} />;
}
