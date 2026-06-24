import {
  alpha,
  parseThemeColor,
  useMantineColorScheme,
  useMantineTheme,
  type MantineColor,
  type MantineGradient,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

type ResolvedVariantColors = {
  hoverColor: string;
  focusColor: string;
  touchColor: string;
};

/**
 * Résout les couleurs de hover, focus et touch pour les différents variants d'un composant, en fonction de la couleur, du gradient, du thème et du mode de couleur actuel.
 * @param {MantineColor} color La couleur principale utilisée pour résoudre les couleurs des variants.
 * @param {MantineGradient} gradient Le gradient utilisé pour résoudre les couleurs des variants de type gradient.
 * @param {string} variant Le variant du composant (ex: "filled", "outline", "light", etc.) pour lequel les couleurs doivent être résolues.
 * @returns {ResolvedVariantColors} Un objet contenant les couleurs de hover, focus et touch résolues pour le variant spécifié.
 */
export function useVariantColors(
  color?: MantineColor,
  gradient?: MantineGradient,
  variant?: string
): ResolvedVariantColors {
  const theme = useMantineTheme();

  const { colorScheme } = useMantineColorScheme();
  const resolvedColorScheme = colorScheme === 'auto' ? useColorScheme() : colorScheme;
  const baseShade =
    typeof theme.primaryShade === 'object'
      ? theme.primaryShade[resolvedColorScheme]
      : theme.primaryShade;

  const varPrefix = (color: string, packageName: string = 'mantine') =>
    `--${packageName}-color-${color}`;

  const resolvedColor = color || theme.primaryColor;

  function resolveFilled(): ResolvedVariantColors {
    return {
      hoverColor: `var(${varPrefix(resolvedColor)}-filled-hover)`,
      focusColor: `var(${varPrefix(resolvedColor, 'onoko')}-filled-focus)`,
      touchColor: `var(${varPrefix(resolvedColor, 'onoko')}-filled-touch)`,
    };
  }

  function resolveGradient(): ResolvedVariantColors {
    const parsedFrom = parseThemeColor({
      color: gradient?.from || theme.defaultGradient.from,
      theme,
    });
    const parsedTo = parseThemeColor({
      color: gradient?.to || theme.defaultGradient.to,
      theme,
    });
    const fromShade = parsedFrom.shade !== undefined ? parsedFrom.shade : baseShade;
    const toShade = parsedTo.shade !== undefined ? parsedTo.shade : baseShade;
    const mediumShade = (fromShade + toShade) / 2;

    const hoverColor = alpha(mediumShade >= 3 ? theme.white : theme.colors.gray[5], 0.2);
    const focusColor = alpha(mediumShade >= 3 ? theme.white : theme.colors.gray[6], 0.3);
    const touchColor = alpha(mediumShade >= 3 ? theme.white : theme.colors.gray[7], 0.4);

    return {
      hoverColor,
      focusColor,
      touchColor,
    };
  }

  function resolveDefault(): ResolvedVariantColors {
    return {
      hoverColor: `var(${varPrefix('default')}-hover)`,
      focusColor: `var(${varPrefix('default', 'onoko')}-focus)`,
      touchColor: `var(${varPrefix('default', 'onoko')}-touch)`,
    };
  }

  function resolveLight(): ResolvedVariantColors {
    return {
      hoverColor: `var(${varPrefix(resolvedColor)}-light-hover)`,
      focusColor: `var(${varPrefix(resolvedColor, 'onoko')}-light-focus)`,
      touchColor: `var(${varPrefix(resolvedColor, 'onoko')}-light-touch)`,
    };
  }

  function resolveOutline(): ResolvedVariantColors {
    return {
      focusColor: `var(${varPrefix(resolvedColor, 'onoko')}-outline-focus)`,
      touchColor: `var(${varPrefix(resolvedColor, 'onoko')}-outline-touch)`,
      hoverColor: `var(${varPrefix(resolvedColor)}-outline-hover)`,
    };
  }

  function resolveSubtle(): ResolvedVariantColors {
    const { focusColor, touchColor } = resolveOutline();
    return {
      hoverColor: `var(${varPrefix(resolvedColor)}-outline-hover)`,
      focusColor,
      touchColor,
    };
  }

  function resolveTransparent(): ResolvedVariantColors {
    const { focusColor, touchColor } = resolveOutline();
    return {
      hoverColor: 'none',
      focusColor,
      touchColor,
    };
  }

  function resolveWhite(): ResolvedVariantColors {
    return {
      hoverColor: `var(${varPrefix(resolvedColor, 'onoko')}-white-hover)`,
      focusColor: `var(${varPrefix(resolvedColor, 'onoko')}-outline-focus)`,
      touchColor: `var(${varPrefix(resolvedColor, 'onoko')}-outline-touch)`,
    };
  }

  const variantStrategies = {
    gradient: resolveGradient,
    default: resolveDefault,
    filled: resolveFilled,
    outline: resolveOutline,
    light: resolveLight,
    subtle: resolveSubtle,
    transparent: resolveTransparent,
    white: resolveWhite,
  };

  return (
    variantStrategies[(variant || 'filled') as keyof typeof variantStrategies] ?? resolveFilled
  )();
}
