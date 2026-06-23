export const TYPOGRAPHY_CONFIG = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontFamilyInterface: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
  fontFamilyEditorial: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
  fontFamilyAccent: '"La Belle Aurore", "cursive"',
  fontFamilyMonospace: '"Roboto Mono", "Courier New", monospace',
  fontSizes: {
    xxs: '0.625rem',
    xs: '0.75rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.875rem',
    xl: '2.5rem',
  },
  lineHeights: {
    xxs: '1.2',
    xs: String((1 / 3) * 4),
    sm: '1.5',
    md: '1.2',
    lg: '1.2',
    xl: '1.2',
  },
  headingFontSizes: {
    sm: '1.25rem',
    md: '1.875rem',
    lg: '2.5rem',
    xl: '3.125rem',
    xxl: '5rem',
  },
  headingLineHeights: {
    sm: '1.2',
    md: '1.2',
    lg: '1.2',
    xl: '1.2',
    xxl: '1.2',
  },
  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  get typography() {
    const headingInterface = {
      fontWeight: this.fontWeights.black,
      letterSpacing: '-0.05em',
      textTransform: 'uppercase',
    };
    return {
      core: {
        body: {
          fontFamily: this.fontFamily,
          fontWeight: this.fontWeights.light,
        },
        subtitle: {
          fontFamily: this.fontFamily,
          fontWeight: this.fontWeights.extralight,
          fontStyle: 'italic',
        },
        tech: {
          fontFamily: this.fontFamilyMonospace,
          fontWeight: this.fontWeights.regular,
          letterSpacing: '-0.05em',
        },
      },
      editorial: {
        heading: {
          xxl: { fontFamily: this.fontFamilyEditorial, ...headingInterface },
          xl: {
            fontFamily: this.fontFamilyEditorial,
            fontWeight: this.fontWeights.extralight,
          },
          lg: {
            fontFamily: this.fontFamilyEditorial,
            fontWeight: this.fontWeights.extralight,
          },
          md: {
            fontFamily: this.fontFamilyEditorial,
            fontWeight: this.fontWeights.light,
          },
          sm: {
            fontFamily: this.fontFamilyEditorial,
            fontWeight: this.fontWeights.light,
          },
          xs: {
            fontFamily: this.fontFamilyEditorial,
            fontWeight: this.fontWeights.regular,
          },
        },
        accent: {
          fontFamily: this.fontFamilyAccent,
          fontWeight: this.fontWeights.regular,
        },
      },
      interface: {
        heading: { fontFamily: this.fontFamilyInterface, ...headingInterface },
        meta: {
          fontFamily: this.fontFamilyInterface,
          fontWeight: this.fontWeights.medium,
        },
      },
    };
  },
  get headings() {
    return {
      fontFamily: this.fontFamilyEditorial,
      fontWeight: this.fontWeights.extralight,
      textWrap: 'balance' as const,
      sizes: {
        h1: {
          fontSize: this.headingFontSizes.xxl,
          lineHeight: this.headingLineHeights.xxl,
        },
        h2: {
          fontSize: this.headingFontSizes.xl,
          lineHeight: this.headingLineHeights.xl,
        },
        h3: {
          fontSize: this.headingFontSizes.lg,
          lineHeight: this.headingLineHeights.lg,
        },
        h4: {
          fontSize: this.headingFontSizes.md,
          lineHeight: this.headingLineHeights.md,
        },
        h5: {
          fontSize: this.headingFontSizes.sm,
          lineHeight: this.headingLineHeights.sm,
        },
        h6: {
          fontSize: this.headingFontSizes.sm,
          lineHeight: this.headingLineHeights.sm,
        },
      },
    };
  },
};
