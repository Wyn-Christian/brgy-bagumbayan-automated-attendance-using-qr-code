import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { Logo } from 'src/components/logo';

import Nav from './nav';

// ----------------------------------------------------------------------

function NavMobile({ open, onClose, role }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <Drawer
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: [
            {
              display: 'flex',
              flexDirection: 'column',
              width: 'var(--layout-nav-mobile-width)',
              px: 1,
            },
          ],
        },
      }}
    >
      <Box
        sx={{
          pt: 3,
          pb: 2,
          pl: 2.5,
          display: 'flex',
        }}
      >
        <Logo />
      </Box>

      <Nav role={role} />
    </Drawer>
  );
}

export default NavMobile;
