import 'src/global.css';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { CONFIG } from 'src/global-config';
import { LocalizationProvider } from 'src/locales';
import { themeConfig, ThemeProvider } from 'src/theme';
import { themeOverrides } from 'src/theme/theme-overrides';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';

// ----------------------------------------------------------------------

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export const metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/logo.ico`,
    },
  ],
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          modeStorageKey={themeConfig.modeStorageKey}
          attribute={themeConfig.cssVariables.colorSchemeSelector}
          defaultMode={themeConfig.enableSystemMode ? 'system' : themeConfig.defaultMode}
        />

        <LocalizationProvider>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <ThemeProvider
              themeOverrides={themeOverrides}
              modeStorageKey={themeConfig.modeStorageKey}
              defaultMode={themeConfig.enableSystemMode ? 'system' : themeConfig.defaultMode}
            >
              <MotionLazy>
                <ProgressBar />
                {children}
              </MotionLazy>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
