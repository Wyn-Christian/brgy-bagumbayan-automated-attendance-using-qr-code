'use client';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SummaryData from '../components/summary-data';
import AttendanceChart from '../components/attendance-chart';
import PieUserDepartments from '../components/pie-user-departments';

// ----------------------------------------------------------------------

export default function AdminDashboardView({ summary, attendance, userByDept }) {
  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h3"> Good day!</Typography>
      </Grid>

      {summary.map((item) => (
        <SummaryData key={item.title} title={item.title} value={item.value} />
      ))}

      <Grid size={{ xs: 12, md: 8 }}>
        <AttendanceChart
          labels={attendance.labels}
          checkInData={attendance.checkInData}
          checkOutData={attendance.checkOutData}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <PieUserDepartments data={userByDept} />
      </Grid>
    </Grid>
  );
}
