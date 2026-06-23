import type { MantineTheme } from '@mantine/core';
import { createCssVariables } from '../..';
import { createTypographyVariables } from './typography.utils';

export const TYPOGRAPHY_CSS_VARIABLES = (theme: MantineTheme) => {
  return {
    '--onoko-font-family-interface': theme.fontFamilyInterface,
    '--onoko-font-family-editorial': theme.fontFamilyEditorial,
    '--onoko-font-family-accent': theme.fontFamilyAccent,

    ...createCssVariables(theme.headingFontSizes, '--onoko-heading-font-size'),
    ...createCssVariables(theme.headingLineHeights, '--onoko-heading-line-height'),

    ...createTypographyVariables(theme.typography),
  };
};
