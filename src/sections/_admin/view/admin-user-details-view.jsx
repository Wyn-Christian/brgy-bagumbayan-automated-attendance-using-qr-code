'use client';

import QRCode from 'react-qr-code';
import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableFooter from '@mui/material/TableFooter';
import ListItemText from '@mui/material/ListItemText';
import TablePagination from '@mui/material/TablePagination';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate, fTime, fDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function AdminUserDetailsView({ id, data, attendance_list }) {
  const qrRef = useRef();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - attendance_list.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    created_at,
    updated_at,
  } = data;

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
          <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent="space-between">
            <Stack gap={1.5}>
              <Typography variant="h6">Full Name</Typography>
              <Typography variant="subtitle1">{full_name}</Typography>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Label>{department}</Label>
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

          <Stack spacing={1}>
            <Typography variant="subtitle2">QR Image</Typography>

            <Box ref={qrRef} sx={{ maxWidth: { xs: 128, md: 256 }, mx: 'auto' }}>
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

          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Scrollbar fillContent>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 130 }}>Date</TableCell>
                    <TableCell sx={{ minWidth: 130 }}>Check-in</TableCell>
                    <TableCell sx={{ minWidth: 130 }}>Check-out</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell sx={{ minWidth: 250 }}>Remarks</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0
                    ? attendance_list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : attendance_list
                  ).map((row) => (
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
                        <Label color={row.source === 'kiosk' ? 'info' : 'default'}>
                          {row.source}
                        </Label>
                      </TableCell>
                      <TableCell>{row.remarks || '—'}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      count={attendance_list.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Scrollbar>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
