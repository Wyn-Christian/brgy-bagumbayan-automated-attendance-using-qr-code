'use client';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SummaryData from '../components/summary-data';
import AttendanceChart from '../components/attendance-chart';
import PieUserDepartments from '../components/pie-user-departments';

// ----------------------------------------------------------------------

export default function AdminDashboardView({ summary, attendance, user_by_dept }) {
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
          checkInData={attendance.check_in_data}
          checkOutData={attendance.check_out_data}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <PieUserDepartments data={user_by_dept} />
      </Grid>
    </Grid>
  );
}
