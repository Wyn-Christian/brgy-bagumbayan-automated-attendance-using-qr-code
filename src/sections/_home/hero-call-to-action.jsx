import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { varFade } from 'src/components/animate/variants';
import { MotionViewport } from 'src/components/animate/motion-viewport';

import SectionWrapper from './components/section-wrapper';

// ----------------------------------------------------------------------

export default function HeroCallToAction() {
  return (
    <SectionWrapper bgcolor="background.neutral">
      <MotionViewport>
        <m.div variants={varFade('inUp')}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h5">Barangay Staff? Head to the Check-In Page.</Typography>
            <Button
              component={RouterLink}
              href={paths.attendance.checkIn}
              variant="contained"
              size="large"
            >
              Go to Kiosk Mode
            </Button>
          </Stack>
        </m.div>
      </MotionViewport>
    </SectionWrapper>
  );
}
