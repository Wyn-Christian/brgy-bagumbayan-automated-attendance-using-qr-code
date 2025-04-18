import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate, fTime, fDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const attendanceColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    type: 'number',
  },
  {
    field: 'user.full_name',
    headerName: 'Full Name',
    width: 200,
    type: 'string',
    valueGetter: (row) => row?.user?.full_name,
    renderCell: (params) => {
      const userId = params.row?.user?.id;
      return (
        <Link
          component={RouterLink}
          href={paths.admin.user.details(userId)}
          underline="hover"
          color="primary"
        >
          {params.row.user.full_name}
        </Link>
      );
    },
  },
  {
    field: 'check_in_time',
    headerName: 'Check-in Time',
    type: 'dateTime',
    width: 200,
    valueGetter: (value) => value && new Date(value),
    valueFormatter: (value) => value && fDateTime(value),
    renderCell: (params) => (
      <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
        <ListItemText primary={fDate(params.value)} secondary={fTime(params.value)} />
      </Box>
    ),
  },
  {
    field: 'check_out_time',
    headerName: 'Check-out Time',
    type: 'dateTime',
    width: 200,
    valueGetter: (value) => value && new Date(value),
    valueFormatter: (value) => value && fDateTime(value),
    renderCell: (params) =>
      params.value ? (
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
          <ListItemText primary={fDate(params.value)} secondary={fTime(params.value)} />
        </Box>
      ) : (
        <Label color="warning">Pending</Label>
      ),
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
    headerName: 'Actions',
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        component={RouterLink}
        href={paths.admin.attendance.details(params.row.id)}
        icon={<Iconify icon="line-md:person" />}
        label="View"
        showInMenu
      />,
      <GridActionsCellItem
        component={RouterLink}
        href={paths.admin.attendance.edit(params.row.id)}
        icon={<Iconify icon="line-md:edit-twotone" />}
        label="Edit"
        showInMenu
      />,
    ],
  },
];

const firstNames = ['Jon', 'Arya', 'Tyrion', 'Daenerys', 'Bran', 'Sansa', 'Samwell', 'Cersei'];
const lastNames = [
  'Snow',
  'Lannister',
  'Stark',
  'Targaryen',
  'Baratheon',
  'Tyrell',
  'Greyjoy',
  'Mormont',
];
const remarksSamples = [
  'On-time',
  'Late check-in',
  'Left early',
  'Overtime',
  'No check-out',
  '',
  'Scanned via mobile',
];
const sourceSamples = ['kiosk', 'mobile'];

export const mockAttendanceRows = Array.from({ length: 50 }).map((_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const fullName = `${firstName} ${lastName}`;

  const baseDay = dayjs().subtract(i % 5, 'day');
  const checkIn = baseDay.hour(8 + (i % 2)).minute(10 + (i % 5));
  const hasCheckedOut = i % 4 !== 0;
  const checkOut = hasCheckedOut ? checkIn.add(8 + (i % 2), 'hour') : null;

  return {
    id: i + 1,
    user: {
      id: i + 1,
      full_name: fullName,
    },
    check_in_time: checkIn.toISOString(),
    check_out_time: checkOut ? checkOut.toISOString() : null,
    source: sourceSamples[i % sourceSamples.length],
    remarks: remarksSamples[i % remarksSamples.length],
    created_at: checkIn.toISOString(),
    updated_at: (checkOut || checkIn).toISOString(),
  };
});
