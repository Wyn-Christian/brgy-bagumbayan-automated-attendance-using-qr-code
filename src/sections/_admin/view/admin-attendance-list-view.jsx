'use client';

import dayjs from 'dayjs';

import { paths } from "src/routes/paths";

import { fDateTime } from "src/utils/format-time";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import CustomDataGrid from '../components/custom-data-grid';

// ----------------------------------------------------------------------

const columns = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{ field: 'fullName', headerName: 'Full Name', width: 200 },
	{
		field: 'checkInTime',
		headerName: 'Check-in Time',
		type: 'dateTime',
		width: 200,
		valueGetter: (value) => value && new Date(value),
		valueFormatter: (value) => value && fDateTime(value),
	},
	{
		field: 'checkOutTime',
		headerName: 'Check-out Time',
		type: 'dateTime',
		width: 200,
		valueGetter: (value) => value && new Date(value),
		valueFormatter: (value) => value && fDateTime(value),
	},
	{ field: 'source', headerName: 'Source', width: 120 },
	{ field: 'remarks', headerName: 'Remarks', width: 200 },
];


const firstNames = [
	'Jon', 'Cersei', 'Jaime', 'Arya', 'Daenerys', 'Robert', 'Tyrion', 'Brienne', 'Sansa',
	'Bran', 'Samwell', 'Jorah', 'Theon', 'Margaery', 'Petyr', 'Sandor', 'Eddard', 'Gendry',
	'Ygritte', 'Missandei', 'Gilly', 'Rhaegar', 'Khal', 'Podrick', 'Shae'
];

const lastNames = [
	'Snow', 'Lannister', 'Stark', 'Targaryen', 'Baratheon', 'Greyjoy', 'Tyrell', 'Baelish',
	'Hound', 'Mormont', 'Tarly', 'Martell', 'Reed', 'Seaworth', 'Payne', 'Waters', 'Freeman',
	'Sand', 'Clegane', 'Hill'
];

const remarksSamples = [
	'On-time',
	'Late check-in',
	'Left early',
	'Overtime',
	'No check-out',
	'Scanned via mobile',
	'Forgot to check-out',
	'',
	'',
];

const sourceSamples = ['kiosk', 'mobile'];

const rows = Array.from({ length: 50 }).map((_, i) => {
	const firstName = firstNames[i % firstNames.length];
	const lastName = lastNames[i % lastNames.length];
	const fullName = `${firstName} ${lastName}`;

	const baseDay = dayjs().subtract(i % 7, 'day'); // simulate different days
	const checkIn = baseDay.hour(8 + (i % 3)).minute(15 + (i % 5));
	const hasCheckedOut = i % 4 !== 0; // every 4th entry has no check-out
	const checkOut = hasCheckedOut ? checkIn.add(8 + (i % 2), 'hour') : null;

	return {
		id: i + 1,
		fullName,
		checkInTime: checkIn.toISOString(),
		checkOutTime: checkOut ? checkOut.toISOString() : null,
		source: sourceSamples[i % sourceSamples.length],
		remarks: remarksSamples[i % remarksSamples.length],
	};
});


export default function AdminAttendanceListView() {
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
						name: 'Attendance',
						href: paths.admin.attendance.list
					},
					{ name: 'List' }
				]}
				sx={{ mb: { xs: 3, md: 5 } }}
				/>
			<CustomDataGrid rows={rows} columns={columns} />
		</>
	)
}
