import { CONFIG } from 'src/global-config';
import { getUserDetails } from 'src/actions/admin/user';

import AdminUserEditView from 'src/sections/_admin/view/admin-user-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User edit | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;
  const user = await getUserDetails(id);

  return <AdminUserEditView id={id} data={user} />;
}
