import { CONFIG } from 'src/global-config';
import { getAttendanceDetail } from 'src/actions/admin/attendance';

import AdminAttendanceEditView from 'src/sections/_admin/view/admin-attendance-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Edit attendance | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;
  const data = await getAttendanceDetail(id);

  return <AdminAttendanceEditView id={id} data={data} />;
}
