import { CONFIG } from 'src/global-config';

import AdminAttendanceEditView from 'src/sections/_admin/view/admin-attendance-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Edit attendance | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;
  const initialValues = {
    id,
    user_id: { id: 1, full_name: 'Jon Snow' },
    check_in_time: '2025-04-13T08:00:00',
    check_out_time: '2025-04-13T16:00:00',
    source: 'manual',
    remarks: 'Edited remarks',
  };

  return <AdminAttendanceEditView id={id} data={initialValues} />;
}
