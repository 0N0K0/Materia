import type {
  DefaultMantineColor,
  DefaultMantineSize,
  MantineBreakpoint,
  MantineColorsTuple,
} from '@mantine/core';
import { Layout } from './layout';

type typographyStyle = {
  fontFamily: string;
  fontWeight: number | string;
  fontStyle?: string;
  letterSpacing?: string;
  textTransform?: string;
};

type ExtendedXXS = 'xxs' | DefaultMantineSize;
type ExtendedXXL = DefaultMantineSize | 'xxl';
type ExtendedShadows = ExtendedXXS & ExtendedXXL;

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

type ExtendedCustomColors =
  | 'deepOrange'
  | 'amber'
  | 'lightBlue'
  | 'fuchsia'
  | 'strawberry'
  | 'golden'
  | 'core'
  | 'support'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'darkElevations'
  | DefaultMantineColor;

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

    opacities: {
      text: {
        primary: number;
        secondary: number;
        disabled: number;
      };
      divider: number;
      states: {
        hover: number;
        selected: number;
        disabled: number;
        focus: number;
        active: number;
      };
    };
  }

  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }

  export interface MantineThemeSizesOverride {
    fontSizes: Record<ExtendedXXS, string>;
    lineHeights: Record<ExtendedXXS, string>;
    fontWeights: Record<ExtendedFontWeights, string>;

    spacing: Record<ExtendedXXL, string>;

    shadows: Record<ExtendedShadows, string>;
  }
}

export {};
