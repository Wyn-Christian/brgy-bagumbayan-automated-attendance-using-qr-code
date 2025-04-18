import { CONFIG } from 'src/global-config';

import AdminUserDetailsView from 'src/sections/_admin/view/admin-user-details-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User details | ${CONFIG.appName}` };

export default async function Page({ params }) {
  const { id } = params;

  const data = {
    id,
    role: 'admin',
    first_name: 'Juan',
    middle_name: 'Santos',
    last_name: 'Dela Cruz',
    full_name: 'Juan Dela Cruz',
    birthday: '1988-12-24',
    gender: 'male',
    address: '123 Bagumbayan Street, Taguig City',
    contact_number: '09171234567',
    email: 'juan.delacruz@example.com',
    is_active: true,
    created_at: '2025-04-08T08:52:41',
    updated_at: '2025-04-08T19:30:40',
  };

  return <AdminUserDetailsView id={id} data={data} />;
}
