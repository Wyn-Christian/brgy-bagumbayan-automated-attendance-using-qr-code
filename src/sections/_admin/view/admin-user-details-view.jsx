'use client';

import QRCode from 'react-qr-code';
import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate, fDateTime } from 'src/utils/format-time';

import { deleteUser } from 'src/actions/admin/user';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Image as CustomImage } from 'src/components/image';
import DeleteButton from 'src/components/delete-button/delete-button';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import ItemNotFound from 'src/components/item-not-found/item-not-found';
import { UserAttendanceTable } from 'src/components/user-attendance-table';

import SummaryData from '../components/summary-data';

// ----------------------------------------------------------------------

export default function AdminUserDetailsView({ id, summary, data, attendance_page }) {
  const [openDialog, setOpenDialog] = useState(false);
  const qrRef = useRef();

  const handleDownloadQR = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const padding = 30; // px white space

      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;

      // Fill background with white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw QR image centered
      ctx.drawImage(img, padding, padding);

      URL.revokeObjectURL(url);

      const imgURI = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `${full_name.replace(/\s+/g, '_')}_QR.png`;
      a.href = imgURI;
      a.click();
    };

    img.src = url;
  };

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
    department,
    contact_number,
    qr_code,
    is_active,
    face_image_path,
    created_at,
    updated_at,
  } = data;

  const { total_present, total_hours, avg_check_in_time } = summary;

  const RenderDetails = () => (
    <Container maxWidth="md">
      <Stack gap={3}>
        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent="space-between">
          <Stack gap={1.5}>
            <Typography variant="h6">Full Name</Typography>
            <Typography variant="subtitle1">{full_name}</Typography>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            {department && <Label>{department}</Label>}
            <Label color={role === 'admin' ? 'primary' : 'default'}>{role}</Label>
          </Box>
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

        <Stack
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-around"
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <Stack spacing={1}>
            <Typography variant="subtitle2" textAlign={{ xs: 'start', md: 'center' }}>
              QR Image
            </Typography>

            <Box ref={qrRef} sx={{ maxWidth: { xs: 128, md: 256 } }}>
              <QRCode
                id="qr-code"
                style={{ height: 'auto', width: '100%' }}
                size={512}
                value={qr_code}
              />
            </Box>
            <Button
              variant="outlined"
              onClick={handleDownloadQR}
              startIcon={<Iconify icon="line-md:download-loop" />}
              sx={{ mt: 1, mx: 'auto', width: 'fit-content' }}
            >
              Download QR
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="subtitle2" textAlign={{ xs: 'start', md: 'center' }}>
              Face Image
            </Typography>
            <Button
              onClick={() => setOpenDialog(true)}
              sx={{
                p: 0,
                borderRadius: 2,
                overflow: 'hidden',
                width: { xs: 128, md: 256 },
                height: { xs: 128, md: 256 },
                minWidth: 0,
              }}
            >
              <CustomImage
                src={face_image_path}
                alt="Face Preview"
                ratio="1/1"
                sx={{
                  borderRadius: 2,
                  width: '100%',
                  height: '100%',
                }}
              />
            </Button>
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

        <Grid container spacing={3}>
          <SummaryData title="Total Present (this month)" value={total_present || 0} />
          <SummaryData title="Total Hours (this month)" value={total_hours || 0} unit="hrs" />

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ p: 3 }}>
              <div>
                <Typography variant="subtitle2">Avg. Time-in</Typography>
                <Typography variant="h3">{avg_check_in_time || '--:--'}</Typography>
              </div>
            </Card>
          </Grid>
        </Grid>

        <UserAttendanceTable userId={id} data={attendance_page.data} meta={attendance_page.meta} />
      </Stack>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
        <DialogContent sx={{ px: 2, pt: 2 }}>
          <CustomImage
            src={face_image_path}
            alt="Full Face Preview"
            sx={{
              width: '100%',
              borderRadius: 2,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );

  return (
    <>
      <CustomBreadcrumbs
        backHref={paths.admin.user.list}
        heading="User Details"
        action={
          <Stack direction="row" spacing={1}>
            <DeleteButton
              icon="line-md:person-remove"
              title={`Are you sure you want to delete ${full_name}?`}
              content="This action cannot be undone. Deleting this user will permanently remove their account, QR code, and attendance records."
              action={() => deleteUser(id)}
              path={paths.admin.user.list}
            />
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

      {data?.status === 404 ? (
        <ItemNotFound title="User not found!" path={paths.admin.attendance.list} />
      ) : (
        <RenderDetails />
      )}
    </>
  );
}
