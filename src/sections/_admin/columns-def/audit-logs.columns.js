import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { GridActionsCellItem } from '@mui/x-data-grid'; // or from '@mui/x-data-grid'

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label/label';

export const auditLogColumns = [
  {
    field: 'user.full_name',
    headerName: 'Full Name',
    width: 200,
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
    field: 'activity',
    headerName: 'Activity',
    width: 180,
    renderCell: (params) => {
      const value = params.value?.toLowerCase();
      let color = 'default';

      if (value?.includes('delete')) color = 'error';
      else if (value?.includes('create')) color = 'info';
      else if (value?.includes('update')) color = 'warning';
      else if (value?.includes('login')) color = 'success';
      else if (value?.includes('logout')) color = 'secondary';

      const title = params.value
        .split('_')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
      return <Label color={color}>{title}</Label>;
    },
  },
  {
    field: 'ip_address',
    headerName: 'IP Address',
    width: 140,
  },
  {
    field: 'user_agent',
    headerName: 'User Agent',
    width: 220,
  },
  {
    field: 'meta_info',
    headerName: 'Meta Info',
    width: 250,
    renderCell: (params) =>
      params.value ? (
        <Box
          component="code"
          sx={{
            fontSize: 12,
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
            backgroundColor: 'grey.100',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {params.value}
        </Box>
      ) : (
        '—'
      ),
  },
  {
    field: 'created_at',
    headerName: 'Date & Time',
    width: 180,
    valueGetter: (value) => value && new Date(value),
    valueFormatter: (value) => fDateTime(value),
  },
  // {
  //   field: 'actions',
  //   type: 'actions',
  //   headerName: '',
  //   width: 50,
  //   getActions: (params) => [
  //     <GridActionsCellItem
  //       key="view"
  //       component={RouterLink}
  //       href={paths.admin.auditLogs.details(params.row.id)}
  //       icon={<Iconify icon="line-md:person" />}
  //       label="View"
  //       showInMenu
  //     />,
  //   ],
  // },
];
