import { CONFIG } from 'src/global-config';
import { getUserList } from 'src/actions/admin/user';

import AdminUserListView from 'src/sections/_admin/view/admin-user-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User list | ${CONFIG.appName}` };

export default async function Page({ searchParams }) {
  const result = await getUserList(searchParams);

  return <AdminUserListView data={result?.data} meta={result?.meta} />;
}
