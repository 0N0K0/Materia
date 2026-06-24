import {
  Box,
  BoxProps,
  createVarsResolver,
  MantineColor,
  PolymorphicFactory,
  polymorphicFactory,
  StylesApiProps,
  Transition,
  useProps,
  useStyles,
} from '@mantine/core';
import React from 'react';
import classes from './Ripple.module.css';

export type RippleStylesNames = 'root';

export type RippleCssVariables = {
  root:
    | '--ripple-y'
    | '--ripple-x'
    | '--ripple-radius'
    | '--ripple-bg'
    | '--ripple-opacity'
    | '--ripple-duration'
    | '--ripple-easing';
};

export interface TransitionPhaseControls {
  onEnter: () => void;
  onEntered: () => void;
  onExit: () => void;
  onExited: () => void;
}

export interface RippleProps extends BoxProps, StylesApiProps<RippleFactory> {
  trigger: 'hover' | 'focus' | 'touch';
  x: number;
  y: number;
  radius: number;
  color: MantineColor;
  opacity: number;
  duration?: number;
  easing?: string;
  mounted?: boolean;
  phaseControls?: TransitionPhaseControls;
}

export type RippleFactory = PolymorphicFactory<{
  props: RippleProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';

  stylesNames: RippleStylesNames;
  vars: RippleCssVariables;
}>;

export const rippleVarsResolver = createVarsResolver<RippleFactory>(
  (theme, { x, y, radius, color, opacity, duration, easing }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      variant: 'filled',
    });

    return {
      root: {
        '--ripple-x': `${x}px`,
        '--ripple-y': `${y}px`,
        '--ripple-radius': `${radius}px`,
        '--ripple-bg': colors.background,
        '--ripple-opacity': opacity.toString(),
        '--ripple-duration': `${duration}ms`,
        '--ripple-easing': easing,
      },
    };
  }
);

/**
 * @description Ripple
 * @see Actionnable qui utilise Ripple sur les éléments interactifs.
 */
export const Ripple = polymorphicFactory<RippleFactory>((_props) => {
  const props = useProps('Ripple', null, _props);

  const {
    style,
    vars,
    className,
    classNames,
    styles,
    unstyled,
    attributes,
    x,
    y,
    radius,
    color,
    opacity,
    duration,
    trigger,
    mod,
    mounted,
    phaseControls,
    ...others
  } = props;

  const getStyles = useStyles<RippleFactory>({
    name: 'Ripple',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: rippleVarsResolver,
  });

  if (trigger === 'hover') {
    if (!phaseControls) {
      return null;
    }
    return (
      <Transition
        mounted={mounted || false}
        transition={{
          in: { opacity: opacity || 1, transform: 'scale(1)' },
          out: { opacity: 0, transform: 'scale(0)' },
          transitionProperty: 'transform, opacity',
        }}
        duration={(duration || 300) * 2}
        {...phaseControls}
      >
        {(transitionStyles) => (
          <Box
            {...getStyles('root', {
              style: transitionStyles,
            })}
            mod={[{ trigger }, mod]}
            {...others}
          />
        )}
      </Transition>
    );
  }

  return <Box {...getStyles('root')} mod={[{ trigger }, mod]} {...others} />;
});

Ripple.classes = classes;
Ripple.varsResolver = rippleVarsResolver;
Ripple.displayName = '@0n0k0/materia/Ripple';
