import dayjs from 'dayjs';

import { CONFIG } from 'src/global-config';

import AdminAuditLogsListView from 'src/sections/_admin/view/admin-audit-logs-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Audit Logs List | ${CONFIG.appName}` };

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
  const actions = [
    'Login',
    'Logout',
    'Created user',
    'Updated attendance',
    'Deleted user',
    'Viewed logs',
  ];
  const data = Array.from({ length: 50 }).map((_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const fullName = `${firstName} ${lastName}`;

    return {
      id: i + 1,
      user: {
        id: i + 13,
        full_name: fullName,
      },
      action: actions[i % actions.length],
      ipAddress: `192.168.1.${i % 100}`,
      userAgent: i % 3 === 0 ? 'Mozilla/5.0 (Windows NT 10.0)' : 'Chrome/122.0.0.1',
      metaInfo: i % 4 === 0 ? `{"details": "Audit event #${i + 1}"}` : '',
      createdAt: dayjs().subtract(i, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    };
  });

  return <AdminAuditLogsListView data={data} />;
}
