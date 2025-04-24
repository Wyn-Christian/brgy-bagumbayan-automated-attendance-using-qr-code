import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const attendanceColumns = [
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    width: 200,
    valueGetter: (value, row) => row && new Date(row.check_in_time),
    valueFormatter: (value) => value && fDate(value),
  },
  {
    field: 'check_in_time',
    headerName: 'Check-in Time',
    type: 'dateTime',
    width: 200,
    valueGetter: (value) => value && new Date(value),
    valueFormatter: (value) => value && fTime(value),
  },
  {
    field: 'check_out_time',
    headerName: 'Check-out Time',
    type: 'dateTime',
    width: 200,
    valueGetter: (value) => value && new Date(value),
    valueFormatter: (value) => value && fTime(value),
    renderCell: (params) =>
      params.value ? fTime(params.value) : <Label color="warning">Pending</Label>,
  },
  {
    field: 'source',
    headerName: 'Source',
    width: 120,
    type: 'singleSelect',
    valueOptions: ['kiosk', 'mobile'],
    renderCell: (params) => (
      <Label color={params.value === 'mobile' ? 'info' : 'default'}>{params.value}</Label>
    ),
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    width: 200,
    type: 'string',
    renderCell: (params) => params.value || '—',
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: '',
    width: 50,
    getActions: (params) => [
      <GridActionsCellItem
        component={RouterLink}
        href={paths.user.attendance.details(params.row.id)}
        icon={<Iconify icon="line-md:person" />}
        label="View"
        showInMenu
      />,
    ],
  },
];
