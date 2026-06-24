import type { ActionnableFactory } from '@0n0k0/materia';
import type { StylesApiData } from '../components/styles-api.types';

export const ActionnableStylesApi: StylesApiData<ActionnableFactory> = {
  selectors: {
    root: 'Root element — wraps surface and children',
    surface: 'Absolute overlay that holds the ripple elements',
    hoverRipple: 'Ripple rendered on pointer hover',
    focusRipple: 'Ripple rendered on keyboard focus',
    touchRipple: 'Ripple rendered on pointer down / touch',
  },

  vars: {
    root: {
      '--actionnable-radius': 'Controls `border-radius` of the root element',
      '--actionnable-fz': 'Controls `font-size` of the root element',
      '--actionnable-lh': 'Controls `line-height` of the root element',
      '--actionnable-color': 'Controls text `color` (filled and gradient variants)',
      '--actionnable-hover-color': 'Controls hover background color',
      '--actionnable-bg': 'Controls `background` of the root element',
      '--actionnable-bd': 'Controls `border` of the root element',
    },
  },

  modifiers: [
    {
      modifier: 'data-elevation-disabled',
      selector: 'root',
      condition: '`disableElevation` prop is set',
    },
  ],
};
