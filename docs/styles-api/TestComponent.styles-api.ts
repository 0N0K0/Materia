import type { TestComponentFactory } from "@0n0k0/materia";
import type { StylesApiData } from "../components/styles-api.types";

export const TestComponentStylesApi: StylesApiData<TestComponentFactory> = {
  selectors: {
    root: "Root element",
  },

  vars: {
    root: {
      "--test-component-color": "Controls root element `background-color`",
    },
  },

  modifiers: [
    {
      modifier: "data-centered",
      selector: "root",
      condition: "`centered` prop is set",
    },
  ],
};
