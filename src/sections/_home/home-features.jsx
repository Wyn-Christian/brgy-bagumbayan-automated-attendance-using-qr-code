import { m } from 'framer-motion';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate/variants';
import { MotionViewport } from 'src/components/animate/motion-viewport';

import AnimatedTitle from './components/animated-title';
import SectionWrapper from './components/section-wrapper';

export default function HomeFeatures() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Main Features" />
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
    </SectionWrapper>
  );
}
