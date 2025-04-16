'use client';

import { Typography } from "@mui/material";

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";


// ----------------------------------------------------------------------

export default function AdminAttendanceEditView() {
	return (
		<>
			<CustomBreadcrumbs
				backHref={paths.admin.attendance.list}
				heading='Edit'
				links={[
					{
						name: 'Dashboard',
						href: paths.admin.dashboard
					},
					{
						name: 'Attendance',
						href: paths.admin.attendance.list
					},
					{ name: 'Edit' }
				]}
				sx={{ mb: { xs: 3, md: 5 } }}
				/>
			<Typography>test</Typography>
		</>
	)
}
