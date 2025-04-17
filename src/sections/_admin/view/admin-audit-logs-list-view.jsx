'use client';

import dayjs from 'dayjs';
import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { auditLogColumns } from '../columns-def';
import CustomDataGrid from '../components/custom-data-grid';

// ----------------------------------------------------------------------

export default function AdminAuditLogsListView() {
  const rows = useMemo(() => {
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

    return Array.from({ length: 50 }).map((_, i) => {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      const fullName = `${firstName} ${lastName}`;

      return {
        id: i + 1,
        fullName,
        action: actions[i % actions.length],
        ipAddress: `192.168.1.${i % 100}`,
        userAgent: i % 3 === 0 ? 'Mozilla/5.0 (Windows NT 10.0)' : 'Chrome/122.0.0.1',
        metaInfo: i % 4 === 0 ? `{"details": "Audit event #${i + 1}"}` : '',
        createdAt: dayjs().subtract(i, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      };
    });
  }, []);

  return (
    <>
      <CustomBreadcrumbs
        heading="List"
        links={[
          {
            name: 'Dashboard',
            href: paths.admin.dashboard,
          },
          {
            name: 'Audit logs',
            href: paths.admin.auditLogs.list,
          },
          { name: 'List' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <CustomDataGrid rows={rows} columns={auditLogColumns} />
    </>
  );
}
