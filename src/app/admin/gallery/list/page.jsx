import { CONFIG } from 'src/global-config';
import { getFaceImages } from 'src/actions/admin/upload-face';

import AdminGalleryListView from 'src/sections/_admin/view/admin-gallery-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Gallery | ${CONFIG.appName}` };

export default async function Page({ searchParams }) {
  const result = await getFaceImages(searchParams);

  return <AdminGalleryListView data={result?.images} />;
}
