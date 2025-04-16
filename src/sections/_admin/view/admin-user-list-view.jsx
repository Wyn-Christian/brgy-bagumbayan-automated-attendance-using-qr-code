'use client';

import { Typography } from "@mui/material";

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";


// ----------------------------------------------------------------------

export default function AdminUserListView() {
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
						name: 'User',
						href: paths.admin.user.list
					},
					{
						name: 'List'
					}
				]}
				sx={{ my: 5 }}
			/>
			<Typography>test</Typography>
		</>
	)
}
