import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import { BarChart } from '@mui/x-charts/BarChart';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function AttendanceChart({ labels, checkInData, checkOutData }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Paper
      sx={{
        boxShadow: 'var(--customShadows-card)',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <CardHeader title="Check-In / Check-Out - Last 10 Days" sx={{ px: 3, pt: 3, pb: 0 }} />
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          borderRadius: 2,
          pl: 'var(--spacing)',
          py: 2.5,
          pr: 2.5,
          height: 320,
        }}
      >
        <BarChart
          xAxis={[{ scaleType: 'band', data: labels, label: 'Date' }]}
          series={[
            { data: checkInData, label: 'Check in', stack: isXs ? 'stack' : undefined },
            { data: checkOutData, label: 'Check out', stack: isXs ? 'stack' : undefined },
          ]}
          sx={{ height: '100%' }}
          borderRadius={4}
        />
      </Box>
    </Paper>
  );
}
