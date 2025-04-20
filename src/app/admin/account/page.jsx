import { CONFIG } from 'src/global-config';

import AdminAccountView from 'src/sections/_admin/view/admin-account-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Admin account | ${CONFIG.appName}` };

export default function Page() {
  const data = {
    id: 123,
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

  return <AdminAccountView data={data} />;
}
