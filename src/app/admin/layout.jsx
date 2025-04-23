import { checkUserRole } from 'src/actions/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default async function Layout({ children }) {
  // await checkUserRole('admin');

  return <DashboardLayout>{children}</DashboardLayout>;
}
