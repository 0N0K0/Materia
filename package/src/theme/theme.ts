import { createTheme, type CSSVariablesResolver, type MantineTheme } from '@mantine/core';
import { LAYOUT_CONFIG, LAYOUT_CSS_VARIABLES } from './layout';
import { COLOR_CONFIG, COLOR_SCHEME_PALETTE_RESOLVER } from './palette';
import { SHAPES_CONFIG } from './shapes';
import { TRANSITIONS_CONFIG, TRANSITIONS_CSS_VARIABLES } from './transitions';
import { TYPOGRAPHY_CONFIG, TYPOGRAPHY_CSS_VARIABLES } from './typography';

export const theme = createTheme({
  ...TYPOGRAPHY_CONFIG,
  ...LAYOUT_CONFIG,
  ...SHAPES_CONFIG,
  ...COLOR_CONFIG,
  ...TRANSITIONS_CONFIG,
});

export const resolver: CSSVariablesResolver = (theme: MantineTheme) => ({
  variables: {
    ...TYPOGRAPHY_CSS_VARIABLES(theme),
    ...LAYOUT_CSS_VARIABLES(theme),
    ...TRANSITIONS_CSS_VARIABLES(theme),
  },
  ...COLOR_SCHEME_PALETTE_RESOLVER(theme),
});
