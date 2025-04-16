// ----------------------------------------------------------------------

export function updateComponentsWithSettings(settingsState) {
  const MuiCssBaseline = {
    styleOverrides: {
      html: {
        fontSize: settingsState?.fontSize,
      },
    },
  };

  return {
    components: {
      MuiCssBaseline,
    },
  };
}
