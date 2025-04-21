import dayjs from 'dayjs';

import { CONFIG } from 'src/global-config';

import AdminAttendanceListView from 'src/sections/_admin/view/admin-attendance-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance list | ${CONFIG.appName}` };

export default function Page() {
  const firstNames = ['Jon', 'Arya', 'Tyrion', 'Daenerys', 'Bran', 'Sansa', 'Samwell', 'Cersei'];
  const lastNames = [
    'Snow',
    'Lannister',
    'Stark',
    'Targaryen',
    'Baratheon',
    'Tyrell',
    'Greyjoy',
    'Mormont',
  ];
  const remarksSamples = [
    'On-time',
    'Late check-in',
    'Left early',
    'Overtime',
    'No check-out',
    '',
    'Scanned via mobile',
  ];
  const sourceSamples = ['kiosk', 'mobile'];

  const data = Array.from({ length: 50 }).map((_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const fullName = `${firstName} ${lastName}`;

    const baseDay = dayjs().subtract(i % 5, 'day');
    const checkIn = baseDay.hour(8 + (i % 2)).minute(10 + (i % 5));
    const hasCheckedOut = i % 4 !== 0;
    const checkOut = hasCheckedOut ? checkIn.add(8 + (i % 2), 'hour') : null;

    return {
      id: i + 1,
      user: {
        id: i + 1,
        full_name: fullName,
      },
      check_in_time: checkIn.toISOString(),
      check_out_time: checkOut ? checkOut.toISOString() : null,
      source: sourceSamples[i % sourceSamples.length],
      remarks: remarksSamples[i % remarksSamples.length],
      created_at: checkIn.toISOString(),
      updated_at: (checkOut || checkIn).toISOString(),
    };
  });

  return <AdminAttendanceListView data={data} />;
}
