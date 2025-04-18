'use client';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate/variants';
import { AnimateText } from 'src/components/animate/animate-text';
import { MotionViewport } from 'src/components/animate/motion-viewport';
import { AnimateCountUp } from 'src/components/animate/animate-count-up';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <>
      {/* HERO SECTION */}
      <Box
        component="section"
        sx={[
          (theme) => ({
            ...theme.mixins.bgGradient({
              images: [
                `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)})`,
                `url(${CONFIG.assetsDir}/assets/background/overlay-1.webp)`,
              ],
            }),
            py: 10,
            overflow: 'hidden',
            position: 'relative',
            [theme.breakpoints.up('md')]: {
              py: 15,
              minHeight: 760,
              height: '100vh',
              maxHeight: 1440,
              display: 'flex',
              alignItems: 'center',
            },
          }),
        ]}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <MotionViewport>
            <m.div variants={varFade('inUp')}>
              <Stack
                spacing={4}
                alignItems="center"
                textAlign="center"
                justifyContent="center"
                sx={{ minHeight: '80vh' }}
              >
                <AnimateText
                  component="h1"
                  textContent={['QR Code-Based Attendance System', 'for Barangay Bagumbayan']}
                  sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 'bold' }}
                />

                <Typography variant="subtitle1" sx={{ maxWidth: 600 }}>
                  A modern, secure, and user-friendly system to streamline attendance monitoring for
                  staff and barangay officials.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    LinkComponent={RouterLink}
                    href={paths.attendance.checkIn}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Check In
                  </Button>
                  <Button
                    LinkComponent={RouterLink}
                    href={paths.attendance.checkOut}
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    Check Out
                  </Button>
                  <Button
                    LinkComponent={RouterLink}
                    href={paths.auth.login}
                    variant="outlined"
                    color="inherit"
                    size="large"
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </m.div>
          </MotionViewport>
        </Container>
      </Box>

      <Container>
        {/* FEATURES SECTION */}
        <Box sx={{ mt: 10 }}>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: 'uiw:qrcode',
                title: 'QR Code Scanning',
                desc: 'Fast, contactless attendance logging with personal QR codes.',
              },
              {
                icon: 'mdi:facial-recognition',
                title: 'Camera Verification',
                desc: 'Prevents buddy punching by capturing real-time snapshots.',
              },
              {
                icon: 'material-symbols:monitor-heart-outline-rounded',
                title: 'Real-Time Monitoring',
                desc: 'View attendance logs live in the admin dashboard.',
              },
              {
                icon: 'material-symbols:export-notes-outline-sharp',
                title: 'Export to Excel',
                desc: 'Download attendance data for easy reporting and documentation.',
              },
            ].map((item, idx) => (
              <Grid size={{ xs: 12, md: 6 }} key={idx}>
                <MotionViewport>
                  <m.div variants={varFade('inUp')}>
                    <Stack alignItems="center" textAlign="center" spacing={2}>
                      <Iconify icon={item.icon} width={64} height={64} />
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </Stack>
                  </m.div>
                </MotionViewport>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* STATISTICS SECTION */}
        <Box sx={{ mt: 10 }}>
          <MotionViewport>
            <Grid container spacing={4} justifyContent="center">
              {[
                { label: 'Total Staff', value: 520 },
                { label: 'Checked In Today', value: 403 },
                { label: 'On Leave / Absent', value: 25 },
                { label: 'Reports Generated', value: 1284 },
              ].map((stat, idx) => (
                <Grid size={{ xs: 6, md: 3 }} key={idx}>
                  <m.div variants={varFade('inUp')}>
                    <Stack spacing={1} textAlign="center" alignItems="center">
                      <AnimateCountUp
                        component="h2"
                        to={stat.value}
                        sx={{ fontSize: 32, fontWeight: 'bold', color: 'primary.main' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Stack>
                  </m.div>
                </Grid>
              ))}
            </Grid>
          </MotionViewport>
        </Box>

        {/* HOW IT WORKS SECTION */}
        <Box sx={{ mt: 10 }}>
          <MotionViewport>
            <m.div variants={varFade('inUp')}>
              <Typography variant="h3" align="center" gutterBottom>
                How It Works
              </Typography>
            </m.div>
          </MotionViewport>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: 'ph:identification-badge-bold',
                title: 'Generate QR ID',
                desc: 'Each staff is assigned a unique QR code with personal metadata.',
              },
              {
                icon: 'material-symbols:qr-code-2',
                title: 'Scan on Kiosk',
                desc: 'Scan code on the terminal during check-in and check-out.',
              },
              {
                icon: 'material-symbols:photo-camera-front-outline',
                title: 'Camera Snapshot',
                desc: 'System captures a live image for visual identity confirmation.',
              },
              {
                icon: 'material-symbols:data-thresholding-rounded',
                title: 'Logged to Dashboard',
                desc: 'Data is instantly sent and visualized in the admin panel.',
              },
            ].map((step, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                <MotionViewport>
                  <m.div variants={varFade('inUp')}>
                    <Stack spacing={1} textAlign="center" alignItems="center">
                      <Iconify icon={step.icon} width={48} height={48} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.desc}
                      </Typography>
                    </Stack>
                  </m.div>
                </MotionViewport>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CALL TO ACTION */}
        <Divider sx={{ my: 8 }} />

        <MotionViewport>
          <m.div variants={varFade('inUp')}>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Typography variant="h5">Barangay Staff? Head to the Check-In Page.</Typography>
              <Button variant="contained" size="large" href="/check-in">
                Go to Kiosk Mode
              </Button>
            </Stack>
          </m.div>
        </MotionViewport>
      </Container>
    </>
  );
}
