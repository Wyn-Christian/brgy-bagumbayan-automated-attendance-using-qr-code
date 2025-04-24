import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
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
    field: 'user.full_name',
    headerName: 'Full Name',
    width: 200,
    type: 'string',
    valueGetter: (row) => row?.user?.full_name,
    renderCell: (params) => {
      const userId = params.row?.user?.id;
      return (
        <Tooltip title={`View ${params.row?.user?.first_name}'s profile`}>
          <Link
            component={RouterLink}
            href={paths.admin.user.details(userId)}
            underline="hover"
            color="primary"
          >
            {params.row.user.full_name}
          </Link>
        </Tooltip>
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
    field: 'total_hours',
    headerName: 'Total Hours',
    type: 'number',
    width: 140,
    valueGetter: (value, row) => {
      const checkIn = row?.check_in_time ? dayjs(row?.check_in_time) : null;
      const checkOut = row?.check_out_time ? dayjs(row?.check_out_time) : null;

      if (!checkIn || !checkOut) return null;

      const hours = checkOut.diff(checkIn, 'minute') / 60;
      return Number(hours.toFixed(2));
    },
    renderCell: (params) =>
      params.value !== null ? (
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
          <ListItemText primary={`${params.value} hr${params.value === 1 ? '' : 's'}`} />
        </Box>
      ) : (
        <Label color="warning">—</Label>
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
    headerName: '',
    width: 50,
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
