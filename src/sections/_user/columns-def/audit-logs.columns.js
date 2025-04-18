import Box from '@mui/material/Box';

import { fDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/label/label';

export const auditLogColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    type: 'number',
  },
  {
    field: 'fullName',
    headerName: 'User',
    width: 180,
    type: 'string',
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    type: 'string',
    renderCell: (params) => {
      const value = params.value?.toLowerCase();
      let color = 'default';

      if (value?.includes('delete')) color = 'error';
      else if (value?.includes('create')) color = 'info';
      else if (value?.includes('update')) color = 'warning';
      else if (value?.includes('login')) color = 'success';
      else if (value?.includes('logout')) color = 'secondary';

      return <Label color={color}>{params.value}</Label>;
    },
  },
  {
    field: 'ipAddress',
    headerName: 'IP Address',
    width: 140,
    type: 'string',
  },
  {
    field: 'userAgent',
    headerName: 'User Agent',
    width: 220,
    type: 'string',
  },
  {
    field: 'metaInfo',
    headerName: 'Meta Info',
    width: 250,
    type: 'string',
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
    field: 'createdAt',
    headerName: 'Date & Time',
    width: 180,
    type: 'dateTime',
    valueGetter: (value) => value && new Date(value),
    valueFormatter: (value) => value && fDateTime(value),
  },
];
