'use client';

import { Typography } from "@mui/material";

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";


// ----------------------------------------------------------------------

export default function AdminAuditLogsDetailsView() {
	return (
		<>
			<CustomBreadcrumbs
				backHref={paths.admin.auditLogs.list}
				heading='Details'
				links={[
					{
						name: 'Dashboard',
						href: paths.admin.dashboard
					},
					{
						name: 'Audit logs',
						href: paths.admin.auditLogs.list
					},
					{
						name: 'Details'
					}
				]}
				sx={{ my: 5 }}
			/>
			<Typography>test</Typography>
		</>
	)
}
