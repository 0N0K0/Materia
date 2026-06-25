import { type MantineGradient, type MantineTheme } from "@mantine/core";
import { getContrastColor } from "../../../utils";

interface ButtonBaseVarsProps {
  variant?: string;
  color?: string;
  gradient?: MantineGradient;
  size?: string | number;
}

/**
 * Returns `{ [varName]: contrastColor }` for filled/gradient variants, `{}` otherwise.
 */
export function buildContrastColorVar(
  theme: MantineTheme,
  props: Pick<ButtonBaseVarsProps, "variant" | "color" | "gradient">,
  varName: string
): Record<string, string> {
  const variant = props.variant || "filled";
  if (variant !== "gradient" && variant !== "filled") return {};
  return {
    [varName]: getContrastColor({
      theme,
      variant,
      color: props.color,
      gradient: props.gradient,
    }),
  };
}

/**
 * Returns shared GroupSection CSS vars: section-padding-y, section-padding-x (xxs only), section-color.
 */
export function buildGroupSectionVars(
  theme: MantineTheme,
  props: ButtonBaseVarsProps
): Record<string, string> {
  const vars: Record<string, string> = {
    "--section-padding-y": `var(--section-padding-y-${props.size || "sm"})`,
    ...buildContrastColorVar(theme, props, "--section-color"),
  };

  if (props.size === "xxs") {
    vars["--section-padding-x"] = "var(--section-padding-x-xxs)";
  }

  return vars;
}
