import {
  mergeThemeOverrides,
  type MantineTheme,
  type MantineProviderProps,
  MantineProvider,
} from "@mantine/core";
// import "../../styles.css";
import "@mantine/core/styles.layer.css";
import "@mantine/carousel/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/dropzone/styles.layer.css";
import "@mantine/notifications/styles.layer.css";
import { resolver, theme } from "../theme";

export function PublicThemeProvider({
  customTheme,
  ...themeProps
}: {
  customTheme?: MantineTheme;
} & Omit<MantineProviderProps, "theme" | "classNamesPrefix">) {
  const mergedTheme = customTheme
    ? mergeThemeOverrides(theme, customTheme)
    : theme;

  return (
    <MantineProvider
      {...themeProps}
      theme={mergedTheme}
      cssVariablesResolver={resolver}
      classNamesPrefix="onoko"
    >
      {themeProps.children}
    </MantineProvider>
  );
}
