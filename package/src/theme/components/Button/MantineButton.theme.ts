import {
  Button,
  ButtonGroup,
  ButtonGroupSection,
  getLineHeight,
  getSize,
} from "@mantine/core";
import classes from "./MantineButton.module.css";
import { buildContrastColorVar, buildGroupSectionVars } from "../ButtonBase/ButtonBase.helpers";

export const BUTTON_CONFIG = Button.extend({
  classNames: {
    root: classes.root,
    inner: classes.inner,
    label: classes.label,
    section: classes.section,
    loader: classes.loader,
  },

  vars: (theme, props) => {
    const vars: {
      root: Record<string, string | undefined>;
      inner: Record<string, string | undefined>;
    } = {
      root: {
        // Espacement
        "--button-padding-y": getSize(props.size || "sm", "button-padding-y"),
        // Typographie
        "--button-lh": props.size?.includes("compact")
          ? getLineHeight(props.size.replace("compact-", "")) || "1.5"
          : getLineHeight(props.size) || "1.5",
      },
      inner: {
        // Espacement
        "--button-gap": getSize(props.size || "sm", "button-padding-y"),
      },
    };

    // Espacement
    if (props.size === "xxs") {
      vars.root["--button-padding-x"] = "var(--button-padding-x-xxs)";
    }

    Object.assign(vars.root, buildContrastColorVar(theme, props, "--button-color"));

    return vars;
  },
});

export const BUTTON_GROUP_CONFIG = ButtonGroup.extend({
  classNames: {
    group: classes.group,
  },
});

export const BUTTON_GROUP_SECTION_CONFIG = ButtonGroupSection.extend({
  classNames: {
    groupSection: classes.groupSection,
  },
  vars: (theme, props) => ({
    groupSection: buildGroupSectionVars(theme, props),
  }),
});
