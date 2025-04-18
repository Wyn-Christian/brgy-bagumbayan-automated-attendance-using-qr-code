import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata = { title: `Attendance Details | ${CONFIG.appName}` };

export default function Page({ params }) {
  const { id } = params;
  return <div>Attendance Details</div>;
}
