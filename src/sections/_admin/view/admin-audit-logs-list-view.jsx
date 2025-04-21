'use client';

import { paths } from 'src/routes/paths';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { auditLogColumns } from '../columns-def';
import CustomDataGrid from '../components/custom-data-grid';

// ----------------------------------------------------------------------

export default function AdminAuditLogsListView({ data }) {
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
      <CustomDataGrid rows={data} columns={auditLogColumns} />
    </>
  );
}
