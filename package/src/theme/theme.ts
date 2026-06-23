import { createTheme, type CSSVariablesResolver, type MantineTheme } from '@mantine/core';
import { LAYOUT_CONFIG, LAYOUT_CSS_VARIABLES } from './layout';
import { TYPOGRAPHY_CONFIG, TYPOGRAPHY_CSS_VARIABLES } from './typography';

export const theme = createTheme({
  ...TYPOGRAPHY_CONFIG,
  ...LAYOUT_CONFIG,
});

export const resolver: CSSVariablesResolver = (theme: MantineTheme) => ({
  variables: {
    ...TYPOGRAPHY_CSS_VARIABLES(theme),
    ...LAYOUT_CSS_VARIABLES(theme),
  },
  dark: {},
  light: {},
});
