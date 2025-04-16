// ----------------------------------------------------------------------

export function layoutSectionVars(theme) {
  return {
    '--layout-nav-zIndex': theme.zIndex.drawer + 1,
    '--layout-nav-mobile-width': '288px',
    '--layout-header-blur': '8px',
    '--layout-header-zIndex': theme.zIndex.appBar + 1,
    '--layout-header-mobile-height': '64px',
    '--layout-header-desktop-height': '72px',
    '--layout-nav-vertical-width': '300px',
    '--layout-transition-duration': '120ms',
    '--layout-nav-mini-width': '88px',
    '--layout-transition-easing': 'linear',
  };
}
