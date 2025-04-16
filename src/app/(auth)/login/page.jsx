import { CONFIG } from 'src/global-config';

import { LoginView } from 'src/sections/auth/log-in-view';


// ----------------------------------------------------------------------

export const metadata = { title: `Login - ${CONFIG.appName}` };

export default function Page() {
	return <LoginView />
}
