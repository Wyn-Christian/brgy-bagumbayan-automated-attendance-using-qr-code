import { CONFIG } from 'src/global-config';

import AdminAttendanceEditView from 'src/sections/_admin/view/admin-attendance-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Edit attendance | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;

  return <AdminAttendanceEditView id={id} />;
}
