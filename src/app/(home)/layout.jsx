import { HomeLayout } from 'src/layouts/home'

export default function Layout({ children }) {
	return (
		<HomeLayout
			// slotProps={{
			// 	header: {
			// 		sx: { position: { md: 'fixed' } }
			// 	}
			// }}
		>
			{children}
		</HomeLayout>
	)
}
