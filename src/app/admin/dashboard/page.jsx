import dayjs from 'dayjs';

import { CONFIG } from 'src/global-config';

import AdminDashboardView from 'src/sections/_admin/view/admin-dashboard-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard | ${CONFIG.appName}` };
// ----------------------------------------------------------------------

const last10Days = [...Array(10)].map((_, i) =>
  dayjs()
    .subtract(9 - i, 'day')
    .format('DD MMM')
);

const mockSummary = [
  { title: 'Total Users', value: 123 },
  { title: 'Present Today', value: 23 },
  { title: 'Attendance Today', value: 23 },
];

const mockAttendance = {
  labels: last10Days,
  checkInData: [2, 4, 3, 5, 6, 8, 9, 4, 5, 3],
  checkOutData: [1, 3, 2, 4, 5, 7, 8, 3, 4, 2],
};

const mockUserByDept = [
  { id: 0, label: 'Staff', value: 12 },
  { id: 1, label: 'Command Center', value: 8 },
  { id: 2, label: 'Custodial', value: 5 },
  { id: 3, label: 'Security Force – Morning Shift', value: 6 },
  { id: 4, label: 'Security Force – Night Shift', value: 4 },
  { id: 5, label: 'Clearances & ID Office', value: 7 },
  { id: 6, label: 'Secretary Office', value: 3 },
  { id: 7, label: 'Lupon Office', value: 2 },
  { id: 8, label: 'Environmental Police', value: 2 },
  { id: 9, label: 'Kagawad Office', value: 1 },
  { id: 10, label: 'Sangguniang Kabataan Office', value: 2 },
];

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <AdminDashboardView
      summary={mockSummary}
      attendance={mockAttendance}
      userByDept={mockUserByDept}
    />
  );
}
