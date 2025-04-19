import { m } from 'framer-motion';

import Typography from '@mui/material/Typography';

import { varFade } from 'src/components/animate/variants';
import { MotionViewport } from 'src/components/animate/motion-viewport';

// ----------------------------------------------------------------------

export default function AnimatedTitle({ title }) {
  return (
    <MotionViewport>
      <m.div variants={varFade('inUp')}>
        <Typography variant="h3" align="center" gutterBottom mb={5}>
          {title}
        </Typography>
      </m.div>
    </MotionViewport>
  );
}
