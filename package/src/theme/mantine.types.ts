import type { DefaultMantineSize, MantineBreakpoint } from '@mantine/core';
import { Layout } from './layout';

type typographyStyle = {
  fontFamily: string;
  fontWeight: number | string;
  fontStyle?: string;
  letterSpacing?: string;
  textTransform?: string;
};

type ExtendedXXS = 'xxs' | DefaultMantineSize;

type ExtendedFontWeights =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

// Surcharge le type de thème de Mantine pour y ajouter les propriétés spécifiques au projet Venustas
declare module '@mantine/core' {
  export interface MantineTheme {
    fontSize: number;
    headingFontSizes: Record<string, string>;
    headingLineHeights: Record<string, string>;
    fontFamilyInterface: string;
    fontFamilyEditorial: string;
    fontFamilyAccent: string;
    typography: {
      core: {
        body: typographyStyle;
        subtitle: typographyStyle;
        tech: typographyStyle;
      };
      editorial: {
        heading: {
          xxl: typographyStyle;
          xl: typographyStyle;
          lg: typographyStyle;
          md: typographyStyle;
          sm: typographyStyle;
          xs: typographyStyle;
        };
        accent: typographyStyle;
      };
      interface: {
        heading: typographyStyle;
        meta: typographyStyle;
      };
    };

    layout: Layout;
    heightBreakpoints: Partial<Record<MantineBreakpoint, string>>;
  }

  export interface MantineThemeSizesOverride {
    fontSizes: Record<ExtendedXXS, string>;
    lineHeights: Record<ExtendedXXS, string>;
    fontWeights: Record<ExtendedFontWeights, string>;
  }
}

export {};
