'use client';

import { Typography } from "@mui/material";

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";


// ----------------------------------------------------------------------

export default function AdminUserCreateView() {
	return (
		<>
			<CustomBreadcrumbs
				heading='Create a new user'
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
						name: 'Create'
					}
				]}
				sx={{ my: 5 }}
			/>
			<Typography>test</Typography>
		</>
	)
}
