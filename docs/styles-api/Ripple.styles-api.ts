import type { RippleFactory } from '@0n0k0/materia';
import type { StylesApiData } from '../components/styles-api.types';

export const RippleStylesApi: StylesApiData<RippleFactory> = {
  selectors: {
    root: 'Root ripple element',
  },

  vars: {
    root: {
      '--ripple-x': 'Horizontal position of the ripple center (px)',
      '--ripple-y': 'Vertical position of the ripple center (px)',
      '--ripple-radius': 'Diameter of the ripple circle (px)',
      '--ripple-bg': 'Background color of the ripple',
      '--ripple-opacity': 'Opacity of the ripple',
      '--ripple-duration': 'Duration of the ripple animation (ms)',
      '--ripple-easing': 'Easing function of the ripple animation',
    },
  },

  modifiers: [
    { modifier: 'data-trigger="hover"', selector: 'root', condition: '`trigger` is `"hover"`' },
    { modifier: 'data-trigger="focus"', selector: 'root', condition: '`trigger` is `"focus"`' },
    { modifier: 'data-trigger="touch"', selector: 'root', condition: '`trigger` is `"touch"`' },
  ],
};
