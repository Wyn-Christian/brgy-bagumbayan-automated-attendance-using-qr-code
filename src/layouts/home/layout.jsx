'use client';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { NavBasicMobile, NavBasicDesktop } from 'src/components/nav-basic';

import Footer from './footer';
import { MainSection } from '../core/main-section';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { MenuButton } from '../components/menu-button';


// ----------------------------------------------------------------------

export const NAV_HOME_DATA_MOBILE = [
  {
    title: 'Home',
    path: '/',
    icon: <Iconify icon="line-md:home-simple" />,
  },
  {
    title: 'About Us',
    path: '/about-us',
    icon: <Iconify icon="line-md:alert-circle" />,
  },
  {
    title: 'Login',
    path: '/login',
    icon: <Iconify icon="line-md:login" />,
  },
];

export const NAV_HOME_DATA_DESKTOP = [
  ...NAV_HOME_DATA_MOBILE,
  {
    title: 'Log Attendance',
    icon: <Iconify icon="line-md:folder" />,
    path: '/attendance',
    // children: [
    // 	{ title: 'Time in', path: '/attendance/check-in' },
    // 	{ title: 'Time out', path: '/attendance/check-out' },
    // ],
  },
];

export function HomeLayout({ sx, cssVars, children, slotProps, layoutQuery = 'md' }) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderHeader = () => {
    const headerSlots = {
      leftArea: (
        <>
          {/* Nobile nav */}
          <MenuButton
            onClick={onOpen}
            sx={(theme) => ({
              mr: 1,
              ml: -1,
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
            })}
          />
          <Drawer
            open={open}
            onClose={onClose}
            slotProps={{
              paper: { sx: { width: 280 } },
            }}
          >
            <Box sx={{ pl: 2.5, py: 2 }}>
              <Logo />
            </Box>

            <NavBasicMobile
              sx={{ px: 1.5 }}
              data={NAV_HOME_DATA_MOBILE}
              cssVars={{ '--nav-item-gap': '8px' }}
            />
          </Drawer>

          {/* Logo */}
          <Logo />
        </>
      ),
      centerArea: null,
      rightArea: (
        <NavBasicDesktop
          data={NAV_HOME_DATA_DESKTOP}
          cssVars={{ '--nav-item-gap': '16px' }}
          sx={{ display: { xs: 'none', md: 'block' } }}
        />
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header.slotProps}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => <Footer />;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      // Header
      headerSection={renderHeader()}
      // Footer
      footerSection={renderFooter()}
      // Styles
      cssVars={cssVars}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}
