import { checkUserRole } from 'src/actions/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default async function Layout({ children }) {
  // await checkUserRole('user');

  return <DashboardLayout role="user">{children}</DashboardLayout>;
}
