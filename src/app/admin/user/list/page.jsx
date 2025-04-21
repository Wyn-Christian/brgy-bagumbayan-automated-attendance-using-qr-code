import dayjs from 'dayjs';

import { CONFIG } from 'src/global-config';
import { departments } from 'src/assets/data';

import AdminUserListView from 'src/sections/_admin/view/admin-user-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `User list | ${CONFIG.appName}` };

export default function Page() {
  const firstNames = [
    'Jon',
    'Arya',
    'Tyrion',
    'Daenerys',
    'Bran',
    'Sansa',
    'Samwell',
    'Cersei',
    'Theon',
    'Jorah',
  ];

  const lastNames = [
    'Snow',
    'Lannister',
    'Stark',
    'Targaryen',
    'Greyjoy',
    'Baratheon',
    'Tyrell',
    'Mormont',
  ];

  const data = Array.from({ length: 50 }).map((_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const full_name = `${firstName} ${lastName}`;

    const birthday = dayjs()
      .subtract(20 + (i % 30), 'year')
      .format('YYYY-MM-DD');
    const createdAt = dayjs().subtract(i, 'day').toISOString();
    const updatedAt = dayjs()
      .subtract(i - 1, 'day')
      .toISOString();

    return {
      id: i + 1,
      role: i % 8 === 0 ? 'admin' : 'user',
      department: departments[i % departments.length],
      first_name: firstName,
      middle_name: 'M.', // fake middle
      last_name: lastName,
      full_name,
      birthday,
      gender: i % 2 === 0 ? 'male' : 'female',
      address: 'Bagumbayan, Taguig City',
      contact_number: `09${Math.floor(100000000 + Math.random() * 900000000)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@bagumbayan.gov.ph`,
      is_active: i % 5 !== 0,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  });

  return <AdminUserListView data={data} />;
}
