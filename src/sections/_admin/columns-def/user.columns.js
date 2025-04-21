import dayjs from 'dayjs';

import Link from '@mui/material/Link';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { departments } from 'src/assets/data';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const userColumns = [
  { field: 'id', headerName: 'ID', width: 70, type: 'number' },

  {
    field: 'full_name',
    headerName: 'User',
    width: 200,
    renderCell: (params) => (
      <Link
        component={RouterLink}
        href={paths.admin.user.details(params.row.id)}
        underline="hover"
        color="primary"
        sx={{ fontWeight: 500 }}
      >
        {params.value}
      </Link>
    ),
  },

  { field: 'email', headerName: 'Email', width: 230, type: 'string' },

  {
    field: 'contact_number',
    headerName: 'Contact Number',
    width: 150,
    type: 'string',
  },

  {
    field: 'gender',
    headerName: 'Gender',
    width: 100,
    type: 'singleSelect',
    valueOptions: ['male', 'female'],
  },

  {
    field: 'birthday',
    headerName: 'Birthday',
    width: 130,
    type: 'date',
    valueFormatter: (value) => value && fDate(value),
  },

  {
    field: 'address',
    headerName: 'Address',
    width: 250,
    type: 'string',
  },

  {
    field: 'department',
    headerName: 'Department',
    width: 250,
    type: 'singleSelect',
    valueOptions: departments,
  },

  {
    field: 'role',
    headerName: 'Role',
    width: 100,
    type: 'singleSelect',
    valueOptions: ['user', 'admin'],
    valueFormatter: (value) =>
      typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : value,
    renderCell: (params) => (
      <Label color={params.value === 'admin' ? 'primary' : 'secondary'}>{params.value}</Label>
    ),
  },

  {
    field: 'is_active',
    headerName: 'Active',
    width: 90,
    type: 'boolean',
    renderCell: (params) => (
      <Label color={params.value ? 'success' : 'warning'}>
        {params.value ? 'Active' : 'Inactive'}
      </Label>
    ),
  },

  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        component={RouterLink}
        icon={<Iconify icon="line-md:person" />}
        label="View"
        href={paths.admin.user.details(params.row.id)}
        showInMenu
      />,
      <GridActionsCellItem
        component={RouterLink}
        href={paths.admin.user.edit(params.row.id)}
        icon={<Iconify icon="line-md:edit-twotone" />}
        label="Edit"
        showInMenu
      />,
    ],
  },
];
