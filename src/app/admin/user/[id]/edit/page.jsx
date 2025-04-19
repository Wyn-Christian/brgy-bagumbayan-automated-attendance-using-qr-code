import { CONFIG } from 'src/global-config';

import AdminUserEditView from 'src/sections/_admin/view/admin-user-edit-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User edit | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = await params;

  const data = {
    id,
    first_name: 'Juan',
    middle_name: 'Santos',
    last_name: 'Dela Cruz',
    gender: 'male',
    birthday: '1990-01-01',
    address: '123 Bagumbayan, Taguig',
    email: 'juan@example.com',
    contact_number: '+639170000000',
    role: 'admin',
    department: 'Command Center',
    password: '',
    confirm_password: '',
  };

  return <AdminUserEditView id={id} data={data} />;
}
