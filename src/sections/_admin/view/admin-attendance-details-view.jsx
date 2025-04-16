'use client';

import { Typography } from "@mui/material";

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";


// ----------------------------------------------------------------------

export default function AdminAttendanceDetailsView() {
	return (
		<>
			<CustomBreadcrumbs
				backHref={paths.admin.attendance.list}
				heading='Details'
				slotProps={{
					heading: {
						sx: {
							fontSize: 1
						}
					}
				}}
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
					name: 'Details'
				}
			]}
			sx={{ my: 5 }}
			/>
			<Typography>test</Typography>
		</>
	)
}
