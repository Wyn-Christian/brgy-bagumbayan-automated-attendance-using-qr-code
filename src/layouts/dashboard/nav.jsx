import { Scrollbar } from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

import { NAV_USER_DATA, NAV_ADMIN_DATA } from './nav-config';

// ----------------------------------------------------------------------

export default function Nav({role}) {
  return (
    <Scrollbar fillContent>
      <NavSectionVertical
        data={role === 'admin' ? NAV_ADMIN_DATA : NAV_USER_DATA}
        slotProps={{ subheader: { display: role === 'admin' ? 'block' : 'none' } }}
      />
    </Scrollbar>
  );
}
