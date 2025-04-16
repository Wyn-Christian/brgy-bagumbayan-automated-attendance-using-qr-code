'use client';

import { Typography } from "@mui/material";

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";


// ----------------------------------------------------------------------

export default function AdminAttendanceCreateView() {
	return (
		<>
			<CustomBreadcrumbs
				heading='Create a new attendance'
				links={[
					{
						name: 'Dashboard',
						href: paths.admin.dashboard
					},
					{
						name: 'Attendance',
						href: paths.admin.attendance.list
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
