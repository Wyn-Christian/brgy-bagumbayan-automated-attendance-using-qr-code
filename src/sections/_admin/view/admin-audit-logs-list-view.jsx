'use client';

import { Typography } from "@mui/material";

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";


// ----------------------------------------------------------------------

export default function AdminAuditLogsListView() {
	return (
		<>
			<CustomBreadcrumbs
				heading='List'
				links={[
					{
						name: 'Dashboard',
						href: paths.admin.dashboard
					},
					{
						name: 'Audit logs',
						href: paths.admin.auditLogs.list
					},
					{ name: 'List' }
				]}
				sx={{ mb: { xs: 3, md: 5 } }}
				/>
			<Typography>test</Typography>
		</>
	)
}
