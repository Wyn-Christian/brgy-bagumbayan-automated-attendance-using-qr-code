import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { AnimateCountUp } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function SummaryData({ title, value }) {
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <Paper
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          p: 3,
          boxShadow: 'var(--customShadows-card)',
          overflow: 'unset',
        }}
      >
        <Box>
          <Typography variant="subtitle2">{title}</Typography>
          <AnimateCountUp to={value} sx={(theme) => ({ ...theme.typography.h3 })} />
        </Box>
      </Paper>
    </Grid>
  );
}
