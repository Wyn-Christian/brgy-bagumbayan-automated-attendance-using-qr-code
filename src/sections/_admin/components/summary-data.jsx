import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { AnimateCountUp } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function SummaryData({ title, value, unit }) {
  return (
    <Grid size={{ xs: 12, sm: 4 }}>
      <Card sx={{ p: 3, overflow: 'unset' }}>
        <Box>
          <Typography variant="subtitle2">{title}</Typography>
          <AnimateCountUp to={value} sx={(theme) => ({ ...theme.typography.h3 })} unit={unit} />
        </Box>
      </Card>
    </Grid>
  );
}
