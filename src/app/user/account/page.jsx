import { CONFIG } from 'src/global-config';

import UserAccountView from 'src/sections/_user/view/user-account-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Account | ${CONFIG.appName}` };

export default async function Page() {
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
    old_password: '',
    password: '',
    confirm_password: '',
  };

  return <UserAccountView data={data} />;
}
