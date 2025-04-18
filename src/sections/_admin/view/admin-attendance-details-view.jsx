'use client';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate, fTime, fDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function AdminAttendanceDetailsView({ id, data }) {
  const { user, check_in_time, check_out_time, source, remarks, created_at, updated_at } = data;

  return (
    <>
      <CustomBreadcrumbs
        backHref={paths.admin.attendance.list}
        heading="Attendance Details"
        action={
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Iconify icon="line-md:folder-remove" />}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
            <Button
              LinkComponent={RouterLink}
              href={paths.admin.attendance.edit(id)}
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
            <Typography variant="h6">User</Typography>
            <Tooltip title="View user" placement="bottom-start">
              <Link component={RouterLink} href={paths.admin.user.details(user.id)}>
                <Typography variant="subtitle1">{user.full_name}</Typography>
              </Link>
            </Tooltip>
          </Stack>

          <Divider flexItem />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ sm: 'space-around' }}
            gap={3}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle1">Check-in Time</Typography>
              <ListItemText primary={fDate(check_in_time)} secondary={fTime(check_in_time)} />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">Check-out Time</Typography>
              {check_out_time ? (
                <ListItemText primary={fDate(check_out_time)} secondary={fTime(check_out_time)} />
              ) : (
                <Label color="warning">Pending</Label>
              )}
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="subtitle2">Source</Typography>
            <div>
              <Label color={source === 'kiosk' ? 'info' : 'default'}>{source}</Label>
            </div>
          </Stack>

          <Stack>
            <Typography variant="subtitle2">Remarks</Typography>
            <Typography variant="body2">{remarks || '—'}</Typography>
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
        </Stack>
      </Container>
    </>
  );
}
