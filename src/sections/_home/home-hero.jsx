import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';

import { varFade } from 'src/components/animate/variants';
import { AnimateText } from 'src/components/animate/animate-text';
import { MotionViewport } from 'src/components/animate/motion-viewport';

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
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
          overflow: 'hidden',
          position: 'relative',
          py: 10,
          minHeight: 760,
          height: '100vh',
          maxHeight: 1440,
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.up('md')]: {},
        }),
      ]}
    >
      <Container>
        <MotionViewport>
          <m.div variants={varFade('inUp')}>
            <Stack spacing={4} alignItems="center" textAlign="center" justifyContent="center">
              <Box
                component="span"
                sx={(theme) => ({
                  ...theme.mixins.textGradient(
                    `90deg, ${theme.vars.palette.primary.main} 20%, ${theme.vars.palette.secondary.main} 100%`
                  ),
                })}
              >
                <AnimateText
                  component="h1"
                  textContent={['QR Code-Based Attendance System', 'for Barangay Bagumbayan']}
                  sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 'bold' }}
                />
              </Box>

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
              </Stack>

              <Link
                variant="overline"
                component={RouterLink}
                href={paths.auth.login}
                color="text.primary"
              >
                Login here
              </Link>
            </Stack>
          </m.div>
        </MotionViewport>
      </Container>
    </Box>
  );
}
