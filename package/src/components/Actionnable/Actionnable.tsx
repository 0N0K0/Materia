import {
  Box,
  BoxProps,
  ButtonSize,
  ButtonVariant,
  createVarsResolver,
  getFontSize,
  getLineHeight,
  getRadius,
  MantineColor,
  MantineGradient,
  MantineRadius,
  PolymorphicFactory,
  polymorphicFactory,
  StylesApiProps,
  useMantineTheme,
  useProps,
  useStyles,
  type GetStylesApi,
} from '@mantine/core';
import React, { useState } from 'react';
import { useVariantColors } from '../../hooks';
import { getContrastColor } from '../../utils';
import { Ripple } from '../Ripple';
import { useActionEffect } from './useActionEffect';
import { useFocusRipple } from './useFocusRipple';
import classes from './Actionnable.module.css';

export type ActionnableStylesNames =
  | 'root'
  | 'surface'
  | 'focusRipple'
  | 'hoverRipple'
  | 'touchRipple';

export type ActionnableCssVariables = {
  root:
    | '--actionnable-radius'
    | '--actionnable-fz'
    | '--actionnable-lh'
    | '--actionnable-color'
    | '--actionnable-hover-color'
    | '--actionnable-bg'
    | '--actionnable-bd';
};

export type ActionnableVariant = ButtonVariant;

export type ActionnableSize = ButtonSize;

export type ActionRippleProps = {
  color: MantineColor;
  opacity?: number;
  easing?: string;
  duration?: number;
};

export interface ActionnableProps
  extends Omit<BoxProps, 'bdrs'>, StylesApiProps<ActionnableFactory> {
  children: React.ReactNode;
  rippleTarget?: HTMLElement | null | undefined;
  focusTarget?: HTMLElement | null | undefined;
  color?: MantineColor;
  gradient?: MantineGradient;
  size?: ActionnableSize;
  radius?: MantineRadius;
  isActive?: boolean;
  surfaceProps?: BoxProps;
  disableRipples?: boolean;
  disableHoverRipple?: boolean;
  hoverRippleProps?: Omit<ActionRippleProps, 'easing' | 'duration'>;
  disableFocusRipple?: boolean;
  focusRippleProps?: ActionRippleProps;
  disableTouchRipple?: boolean;
  touchRippleProps?: ActionRippleProps;
  disableElevation?: boolean;
}

export type ActionnableFactory = PolymorphicFactory<{
  props: ActionnableProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';

  stylesNames: ActionnableStylesNames;
  vars: ActionnableCssVariables;
  variant: ActionnableVariant;
}>;

export const actionnableVarsResolver = createVarsResolver<ActionnableFactory>(
  (theme, { radius, color, gradient, variant, size }) => {
    const _variant = variant || 'filled';

    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: _variant,
    });

    return {
      root: {
        // Dimensions
        '--actionnable-radius': radius === undefined ? undefined : getRadius(radius),
        // Typographie
        '--actionnable-fz': size?.includes('compact')
          ? getFontSize(size.replace('compact-', ''))
          : getFontSize(size),
        '--actionnable-lh': size?.includes('compact')
          ? getLineHeight(size.replace('compact-', ''))
          : getLineHeight(size),
        '--actionnable-color':
          _variant === 'filled' || _variant === 'gradient'
            ? getContrastColor({
                theme,
                variant: _variant as 'gradient' | 'filled',
                color,
                gradient,
              })
            : undefined,
        // Arrière-plan et bordure
        '--actionnable-bg': color || _variant ? colors.background : undefined,
        '--actionnable-hover-color': color || _variant ? colors.hoverColor : undefined,
        '--actionnable-bd': color || _variant ? colors.border : undefined,
      },
    };
  }
);

/**
 * Surface d'interaction visuelle pour les éléments cibles.
 * Affiche des effets de ripple lors des interactions de l'utilisateur (hover, focus, touch).
 * @param {ActionnableProps} props Les propriétés du composant Actionnable.
 * @see Ripple pour les détails sur les propriétés de chaque type de ripple.
 * @see useActionEffect pour la gestion de l'état des interactions.
 * @see useFocusRipple pour le calcul des dimensions et de la position du ripple de focus.
 * @see useVariantColors pour la détermination des couleurs de ripple en fonction de la variante.
 */
export const Actionnable = polymorphicFactory<ActionnableFactory>((_props) => {
  const props = useProps('Actionnable', null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    attributes,
    vars,
    rippleTarget,
    focusTarget,
    color,
    gradient,
    variant,
    mod,
    isActive,
    surfaceProps,
    disableRipples,
    disableHoverRipple,
    hoverRippleProps,
    disableFocusRipple,
    focusRippleProps,
    disableTouchRipple,
    touchRippleProps,
    disableElevation,
    children,
    ...rootProps
  } = props;

  const getStyles: GetStylesApi<ActionnableFactory> = useStyles<ActionnableFactory>({
    name: 'Actionnable',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: actionnableVarsResolver,
  });

  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);

  const _rippleTarget = rippleTarget === undefined ? rootEl : rippleTarget;
  const _focusTarget = focusTarget === undefined ? _rippleTarget : focusTarget;

  const { state, phaseControls } = useActionEffect(_rippleTarget, _focusTarget);

  const theme = useMantineTheme();
  const isFocused = theme.focusRippleMode === 'focus' ? state.focused : isActive;

  const { radius: focusRippleRadius, marginLeft, marginTop } = useFocusRipple(_rippleTarget);

  const { hoverColor, focusColor, touchColor } = useVariantColors(color, gradient, variant);

  return (
    <Box
      {...getStyles('root', { variant })}
      variant={variant}
      mod={[{ 'elevation-disabled': disableElevation }, mod]}
      ref={setRootEl}
      {...rootProps}
    >
      {!disableRipples && _rippleTarget && (
        <Box {...getStyles('surface')} {...surfaceProps}>
          {!disableHoverRipple && (
            <Ripple
              {...getStyles('hoverRipple')}
              trigger="hover"
              x={state.pointerX}
              y={state.pointerY}
              radius={state.radius}
              color={hoverRippleProps?.color || hoverColor}
              opacity={hoverRippleProps?.opacity || 1}
              mounted={state.hovered}
              phaseControls={phaseControls}
              duration={state.duration}
            />
          )}
          {!disableFocusRipple && isFocused && (
            <Ripple
              {...getStyles('focusRipple')}
              trigger="focus"
              x={marginLeft}
              y={marginTop}
              radius={focusRippleRadius}
              color={focusRippleProps?.color || focusColor}
              opacity={focusRippleProps?.opacity || 1}
              easing={focusRippleProps?.easing || 'linear'}
              duration={focusRippleProps?.duration || 1200}
            />
          )}
          {!disableTouchRipple &&
            state.touchRipples.length > 0 &&
            state.touchRipples.map((rippleId) => (
              <Ripple
                {...getStyles('touchRipple')}
                key={rippleId}
                trigger="touch"
                x={state.pointerX}
                y={state.pointerY}
                radius={state.radius}
                color={touchRippleProps?.color || touchColor}
                opacity={touchRippleProps?.opacity || 1}
                duration={touchRippleProps?.duration || 600}
                easing={touchRippleProps?.easing || theme.transitions.easing.easeOut}
              />
            ))}
        </Box>
      )}
      {children}
    </Box>
  );
});

Actionnable.classes = classes;
Actionnable.varsResolver = actionnableVarsResolver;
Actionnable.displayName = '@0n0k0/materia/Actionnable';
