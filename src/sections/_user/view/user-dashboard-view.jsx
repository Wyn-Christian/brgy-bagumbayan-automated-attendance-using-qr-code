'use client';

import { useRef } from 'react';
import QRCode from 'react-qr-code';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import SummaryData from 'src/sections/_admin/components/summary-data';

// ----------------------------------------------------------------------

export default function UserDashboardView({ user, summary, recent_attendance }) {
  const qrRef = useRef();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
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
      a.download = `${user?.full_name.replace(/\s+/g, '_')}_QR.png`;
      a.href = imgURI;
      a.click();
    };

    img.src = url;
  };

  const renderRecentAttendanceTable = () => (
    <Grid size={{ xs: 12, md: 8 }}>
      <Card>
        <CardHeader title="Recent Attendance" sx={{ mb: 3 }} />
        <Scrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 130 }}>Date</TableCell>
                <TableCell sx={{ minWidth: 130 }}>Time-in</TableCell>
                <TableCell sx={{ minWidth: 130 }}>Time-out</TableCell>
                <TableCell sx={{ minWidth: 130 }}>Source</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recent_attendance.map((row) => (
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
                </TableRow>
              ))}
            </TableBody>
            {!recent_attendance.length && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Stack spacing={1} alignItems="center" justifyContent="center" py={3}>
                    <Iconify
                      icon="mdi:calendar-remove"
                      width={32}
                      height={32}
                      color="text.secondary"
                    />
                    <Typography variant="body2" color="text.secondary">
                      No attendance records yet.
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      This user hasn’t recorded any attendance recently.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </Table>
        </Scrollbar>
        <Divider />
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            LinkComponent={RouterLink}
            href={paths.user.attendance.list}
            endIcon={<Iconify icon="line-md:chevron-right" />}
          >
            View all
          </Button>
        </Box>
      </Card>
    </Grid>
  );

  const renderQrCode = () => (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card>
        <CardHeader title="QR Code image" sx={{ mb: 3 }} />
        <Stack spacing={2} sx={{ px: 3, pb: 2, maxWidth: 250, m: 'auto' }}>
          <Box ref={qrRef} sx={{ maxWidth: { xs: 128, md: 256 }, mx: 'auto' }}>
            <QRCode value={user?.qr_code} style={{ height: 'auto', width: '100%' }} />
          </Box>
          <Button onClick={handleDownloadQR} startIcon={<Iconify icon="line-md:download-loop" />}>
            Download QR
          </Button>
        </Stack>
      </Card>
    </Grid>
  );

  return (
    <>
      <Typography variant="h4" mb={3}>{`${getGreeting()}, ${user.first_name}!`}</Typography>
      <Grid container spacing={3}>
        <SummaryData title="Total Present (this month)" value={summary?.total_present || 0} />
        <SummaryData
          title="Total Hours (this month)"
          value={summary?.total_hours || 0}
          unit="hrs"
        />

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle2">Avg. Time-in</Typography>
              <Typography variant="h3">{summary?.avg_check_in_time || '--:--'}</Typography>
            </div>
          </Card>
        </Grid>

        {renderRecentAttendanceTable()}

        {renderQrCode()}
      </Grid>
    </>
  );
}
