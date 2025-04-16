'use client';

import dayjs from 'dayjs';

import { paths } from "src/routes/paths";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import CustomDataGrid from "../components/custom-data-grid";


// ----------------------------------------------------------------------

export default function AdminUserListView() {

	const firstNames = ['Jon', 'Arya', 'Tyrion', 'Daenerys', 'Bran', 'Sansa', 'Samwell', 'Cersei', 'Theon', 'Jorah'];
	const lastNames = ['Snow', 'Lannister', 'Stark', 'Targaryen', 'Greyjoy', 'Baratheon', 'Tyrell', 'Mormont'];

	const rows = Array.from({ length: 50 }).map((_, i) => {
		const firstName = firstNames[i % firstNames.length];
		const lastName = lastNames[i % lastNames.length];
		const fullName = `${firstName} ${lastName}`;

		const birthday = dayjs().subtract(20 + (i % 30), 'year').format('YYYY-MM-DD');

		return {
			id: i + 1,
			fullName,
			email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@bagumbayan.gov.ph`,
			contactNumber: `09${Math.floor(100000000 + Math.random() * 900000000)}`,
			gender: i % 2 === 0 ? 'Male' : 'Female',
			birthday,
			address: 'Bagumbayan, Taguig City',
			role: i % 8 === 0 ? 'admin' : 'user',
			isActive: i % 5 !== 0, // every 5th user is inactive
		};
	});

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'fullName', headerName: 'Full Name', width: 200 },
		{ field: 'email', headerName: 'Email', width: 230 },
		{ field: 'contactNumber', headerName: 'Contact Number', width: 150 },
		{ field: 'gender', headerName: 'Gender', width: 100 },
		{ field: 'birthday', headerName: 'Birthday', width: 130 },
		{ field: 'address', headerName: 'Address', width: 250 },
		{
			field: 'role',
			headerName: 'Role',
			width: 100,
			type: 'singleSelect',
			valueOptions: ['user', 'admin'],
			valueFormatter: (value) => typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : value
		},
		{ field: 'isActive', headerName: 'Active', width: 90 },
	];

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
					{ name: 'List' }
				]}
				sx={{ mb: { xs: 3, md: 5 } }}
			/>
			<CustomDataGrid rows={rows} columns={columns} />

		</>
	)
}
