'use client';

import dayjs from 'dayjs';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate, fTime, fDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function AdminUserDetailsView({ id, data }) {
  const {
    full_name,
    first_name,
    last_name,
    middle_name,
    email,
    gender,
    address,
    birthday,
    role,
    contact_number,
    is_active,
    created_at,
    updated_at,
  } = data;

  const remarksSamples = [
    'On-time',
    'Late check-in',
    'Left early',
    'Overtime',
    'No check-out',
    'Scanned via mobile',
    '',
  ];

  const sources = ['kiosk', 'manual'];

  const mockAttendanceRows = Array.from({ length: 10 }).map((_, i) => {
    const day = dayjs().subtract(i, 'day');

    // Random hour and minute for check-in
    const checkIn = day
      .hour(7 + Math.floor(Math.random() * 3))
      .minute(Math.floor(Math.random() * 60));

    // 60% chance to have a check-out
    const hasCheckOut = Math.random() > 0.4;
    const checkOut = hasCheckOut ? checkIn.add(8 + Math.floor(Math.random() * 2), 'hour') : null;

    return {
      id: i + 1,
      check_in_time: checkIn.toISOString(),
      check_out_time: checkOut ? checkOut.toISOString() : null,
      source: sources[Math.floor(Math.random() * sources.length)],
      remarks: remarksSamples[Math.floor(Math.random() * remarksSamples.length)],
    };
  });

  return (
    <>
      <CustomBreadcrumbs
        backHref={paths.admin.user.list}
        heading="User Details"
        action={
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Iconify icon="line-md:person-remove" />}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
            <Button
              LinkComponent={RouterLink}
              href={paths.admin.user.edit(id)}
              startIcon={<Iconify icon="line-md:edit-twotone" />}
              variant="contained"
            >
              Edit
            </Button>
          </Stack>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Container maxWidth="md">
        <Stack gap={3}>
          <Stack gap={1.5}>
            <Typography variant="h6">Full Name</Typography>
            <Typography variant="subtitle1">{full_name}</Typography>
          </Stack>

          <Divider flexItem />

          <Stack spacing={1}>
            <Typography variant="h6">Basic Info</Typography>
            <ListItemText primary="Email" secondary={email} />
            <ListItemText primary="Gender" secondary={gender} />
            <ListItemText primary="Birthday" secondary={fDate(birthday)} />
            <ListItemText primary="Contact Number" secondary={contact_number} />
            <ListItemText primary="Address" secondary={address} />
          </Stack>

          <Divider flexItem />

          <Stack spacing={1}>
            <Typography variant="subtitle2">Account Status</Typography>
            <Stack direction="row" spacing={2}>
              <Label color={is_active ? 'success' : 'warning'}>
                {is_active ? 'Active' : 'Inactive'}
              </Label>
              <Label color={role === 'admin' ? 'primary' : 'default'}>{role}</Label>
            </Stack>
          </Stack>

          <Divider flexItem />

          <Stack direction="row" spacing={2}>
            <ListItemText
              primary="Created at"
              secondary={fDateTime(created_at)}
              slotProps={{
                primary: { sx: { fontSize: 12 } },
                secondary: { sx: { fontSize: 13 } },
              }}
            />
            <ListItemText
              primary="Updated at"
              secondary={fDateTime(updated_at)}
              slotProps={{
                primary: { sx: { fontSize: 12 } },
                secondary: { sx: { fontSize: 13 } },
              }}
            />
          </Stack>

          <Divider flexItem />
          <Typography variant="h6" sx={{ mt: 5 }}>
            Attendance History
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Check-in</TableCell>
                <TableCell>Check-out</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mockAttendanceRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{fDate(row.check_in_time)}</TableCell>
                  <TableCell>{fTime(row.check_in_time)}</TableCell>
                  <TableCell>
                    {row.check_out_time ? (
                      fTime(row.check_out_time)
                    ) : (
                      <Label color="warning">Pending</Label>
                    )}
                  </TableCell>
                  <TableCell>
                    <Label color={row.source === 'kiosk' ? 'info' : 'default'}>{row.source}</Label>
                  </TableCell>
                  <TableCell>{row.remarks || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </Container>
    </>
  );
}
