import { m } from 'framer-motion';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { varFade } from 'src/components/animate/variants';
import { MotionViewport } from 'src/components/animate/motion-viewport';
import { AnimateCountUp } from 'src/components/animate/animate-count-up';

import AnimatedTitle from './components/animated-title';
import SectionWrapper from './components/section-wrapper';

// ----------------------------------------------------------------------

function HomeStatistics() {
  return (
    <SectionWrapper bgcolor="background.neutral">
      <AnimatedTitle title="Team Overview" />

      <MotionViewport>
        <Grid container spacing={3} justifyContent="center">
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
    </SectionWrapper>
  );
}

export default HomeStatistics;
