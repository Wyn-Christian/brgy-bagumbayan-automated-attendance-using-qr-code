import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieUserDepartments({ data }) {
  return (
    <Paper
      sx={{
        boxShadow: 'var(--customShadows-card)',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <CardHeader title="Users per Department" sx={{ px: 3, pt: 3, pb: 0 }} />
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          borderRadius: 2,
          p: 2.5,
        }}
      >
        <PieChart
          series={[
            {
              data,
              innerRadius: 30,
              cornerRadius: 3,
              arcLabel: (item) => `${item.value}`,
              arcLabelMinAngle: 20,
              arcLabelRadius: '60%',

              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          height={250}
          hideLegend
        />
      </Box>
    </Paper>
  );
}
