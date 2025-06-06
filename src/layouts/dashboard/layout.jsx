'use client';

import { useBoolean } from 'minimal-shared/hooks';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { Logo } from 'src/components/logo';

import Nav from './nav';
import NavMobile from './nav-mobile';
import { layoutClasses } from '../core';
import { MainSection } from '../core/main-section';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { MenuButton } from '../components/menu-button';
import { SidebarContainerSection } from '../core/sidebar-container-section';

// ----------------------------------------------------------------------

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
  role = 'admin',
}) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderHeader = () => {
    const headerSlots = {
      topArea: null,
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={(theme) => ({
              mr: 1,
              ml: -1,
              [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
            })}
          />
          <NavMobile open={open} onClose={onClose} role={role} />
        </>
      ),
      centerArea: null,
      rightArea: null,
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={slotProps?.header?.slotProps}
        sx={(theme) => ({
          [theme.breakpoints.up(layoutQuery)]: {
            paddingLeft: 'var(--layout-nav-vertical-width)',
            transition: `padding-left var(--layout-transition-duration) var(--layout-transition-easing) 0ms`,
          },
        })}
      />
    );
  };

  const renderFooter = () => null;

  const renderMain = () => (
    <SidebarContainerSection>
      <MainContentWrapper>
        <MainSection {...slotProps?.main}>{children}</MainSection>
      </MainContentWrapper>
    </SidebarContainerSection>
  );

  return (
    <LayoutSection
      // @Header
      headerSection={renderHeader()}
      // @Footer
      footerSection={renderFooter()}
      // @Styles
      cssVars={cssVars}
      sx={sx}
    >
      {/* @Slot nav desktop */}
      <NavWrapper layoutQuery={layoutQuery}>
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
      </NavWrapper>

      {renderMain()}
    </LayoutSection>
  );
}

let NavWrapper = styled(
  (props) => <div {...props} className={mergeClasses([layoutClasses.root, props.className])} />,
  {
    shouldForwardProp: (prop) => prop !== 'layoutQuery',
  }
)(({ layoutQuery, theme }) => ({
  padding: '0px 14px',
  top: 0,
  left: 0,
  height: '100%',
  position: 'fixed',
  flexDirection: 'column',
  zIndex: 'var(--layout-nav-zIndex)',
  width: 'var(--layout-nav-vertical-width)',
  borderRight: `1px solid ${varAlpha('var(--palette-grey-500Channel)', 0.12)}`,
  transition: 'width var(--layout-transition-duration) var(--layout-transition-easing) 0ms',
  [theme.breakpoints.down(layoutQuery)]: { display: 'none' },
}));

let MainContentWrapper = styled(
  (props) => (
    <Container
      maxWidth="lg"
      {...props}
      className={mergeClasses([layoutClasses.content, props.className])}
    />
  ),
  {
    shouldForwardProp: (prop) => prop !== 'layoutQuery',
  }
)(({ layoutQuery = 'lg', theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  paddingTop: 'var(--layout-dashboard-content-pt)',
  paddingBottom: 'var(--layout-dashboard-content-pb)',
  [theme.breakpoints.up(layoutQuery)]: {
    paddingLeft: 'var(--layout-dashboard-content-px)',
    paddingRight: 'var(--layout-dashboard-content-px)',
  },
}));
