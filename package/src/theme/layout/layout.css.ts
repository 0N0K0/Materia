import { rem, type MantineTheme } from '@mantine/core';

export const LAYOUT_CSS_VARIABLES = (theme: MantineTheme) => ({
  '--onoko-horizontal-rhythm': rem(theme.layout.horizontalRhythm),
  '--onoko-vertical-rhythm': rem(theme.layout.verticalRhythm),
  '--onoko-max-full-width': rem(theme.layout.maxFullWidth),
  '--onoko-max-full-height': rem(theme.layout.maxFullHeight),
  '--onoko-default-column-gap': rem(theme.layout.columnGap),
});
