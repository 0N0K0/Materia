import {
  ActionIcon,
  ActionIconGroup,
  ActionIconGroupSection,
  getFontSize,
  getLineHeight,
  rem,
} from "@mantine/core";
import classes from "./ActionIcon.module.css";
import clsx from "clsx";
import { buildContrastColorVar, buildGroupSectionVars } from "../ButtonBase/ButtonBase.helpers";

export const ACTION_ICON_CONFIG = ActionIcon.extend({
  classNames: (_theme, props) => ({
    root: clsx(
      classes.root,
      props.variant === "transparent" && classes["root--transparent"],
      props.variant === "subtle" && classes["root--subtle"],
    ),
    loader: classes.loader,
    icon: classes.icon,
  }),

  defaultProps: { variant: "subtle", radius: "50%" },

  vars: (theme, props) => {
    const vars: {
      root: Record<string, string>;
    } = {
      root: {
        // Espacement
        "--button-padding": `var(--button-padding-${props.size || "sm"})`,
        // Typographie
        "--button-fz":
          typeof props.size === "number"
            ? rem(props.size)
            : props.size?.includes("compact")
            ? getFontSize(props.size.replace("compact-", "")) || rem("1rem")
            : getFontSize(props.size) || rem("1rem"),
        "--button-lh":
          typeof props.size === "number"
            ? "1"
            : props.size?.includes("compact")
            ? getLineHeight(props.size.replace("compact-", "")) || "1.5"
            : getLineHeight(props.size) || "1.5",
      },
    };

    Object.assign(vars.root, buildContrastColorVar(theme, props, "--button-color"));

    return vars;
  },
});

export const ACTION_ICON_GROUP_CONFIG = ActionIconGroup.extend({
  classNames: {
    group: classes.group,
  },
});

export const ACTION_ICON_GROUP_SECTION_CONFIG = ActionIconGroupSection.extend({
  classNames: {
    groupSection: classes.section,
  },
  vars: (theme, props) => ({
    groupSection: buildGroupSectionVars(theme, props),
  }),
});
