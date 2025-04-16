import { DashboardLayout } from 'src/layouts/dashboard'

export default function Layout({ children }) {
	return (
		<DashboardLayout role='user'>{children}</DashboardLayout>
	)
}
