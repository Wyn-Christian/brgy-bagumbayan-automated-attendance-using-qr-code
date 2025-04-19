import { m } from 'framer-motion';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate/variants';
import { MotionViewport } from 'src/components/animate/motion-viewport';

import SectionWrapper from './components/section-wrapper';

// ----------------------------------------------------------------------

export default function HomeSystemProcess() {
  return (
    <SectionWrapper>
      <MotionViewport>
        <m.div variants={varFade('inUp')}>
          <Typography variant="h3" align="center" mb={5}>
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
    </SectionWrapper>
  );
}
