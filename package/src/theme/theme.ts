import { createTheme, type CSSVariablesResolver, type MantineTheme } from '@mantine/core';

export const theme = createTheme({});

export const resolver: CSSVariablesResolver = (_theme: MantineTheme) => ({
  variables: {},
  dark: {},
  light: {},
});
