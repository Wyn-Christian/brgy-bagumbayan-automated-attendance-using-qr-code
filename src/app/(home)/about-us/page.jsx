import { redirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata = { title: `About Us - ${CONFIG.appName}` };

export default function Page() {
  redirect(paths.maintenance);
  return <>About Us Page</>;
}
