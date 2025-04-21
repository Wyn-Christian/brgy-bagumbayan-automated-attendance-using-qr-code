import dayjs from 'dayjs';

import { CONFIG } from 'src/global-config';

import UserDashboardView from 'src/sections/_user/view/user-dashboard-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard | ${CONFIG.appName}` };

export default async function Page() {
  const user = {
    id: 12,
    role: 'admin',
    department: 'Security Force - Morning Shift',
    first_name: 'Juan',
    middle_name: 'Santos',
    last_name: 'Dela Cruz',
    full_name: 'Juan Dela Cruz',
    birthday: '1988-12-24',
    gender: 'male',
    address: '123 Bagumbayan Street, Taguig City',
    contact_number: '09171234567',
    email: 'juan.delacruz@example.com',
    qr_code: '8653723e-908c-4f90-93a4-7970e22e3113',
    is_active: true,
    created_at: '2025-04-08T08:52:41',
    updated_at: '2025-04-08T19:30:40',
  };
  const remarksSamples = [
    'On-time',
    'Late check-in',
    'Left early',
    'Overtime',
    'No check-out',
    'Scanned via mobile',
    '',
  ];

  const sources = ['kiosk', 'manual'];

  const mockAttendanceRows = Array.from({ length: 5 }).map((_, i) => {
    const day = dayjs().subtract(i, 'day');

    // Random hour and minute for check-in
    const checkIn = day
      .hour(7 + Math.floor(Math.random() * 3))
      .minute(Math.floor(Math.random() * 60));

    // 60% chance to have a check-out
    const hasCheckOut = Math.random() > 0.4;
    const checkOut = hasCheckOut ? checkIn.add(8 + Math.floor(Math.random() * 2), 'hour') : null;

    return {
      id: i + 1,
      check_in_time: checkIn.toISOString(),
      check_out_time: checkOut ? checkOut.toISOString() : null,
      source: sources[Math.floor(Math.random() * sources.length)],
      remarks: remarksSamples[Math.floor(Math.random() * remarksSamples.length)],
    };
  });
  return <UserDashboardView user={user} recentAttendanceData={mockAttendanceRows} />;
}
