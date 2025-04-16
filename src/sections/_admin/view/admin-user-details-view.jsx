'use client';

import { Typography } from "@mui/material";

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";


// ----------------------------------------------------------------------

export default function AdminUserDetailsView() {
	return (
		<>
			<CustomBreadcrumbs
				backHref={paths.admin.user.list}
				heading='Details'
				links={[
					{
						name: 'Dashboard',
						href: paths.admin.dashboard
					},
					{
						name: 'User',
						href: paths.admin.user.list
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
