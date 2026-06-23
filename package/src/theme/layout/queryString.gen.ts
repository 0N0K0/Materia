import { type MantineTheme } from '@mantine/core';
import { toNumberRem } from './dimension.utils';

export interface GetQueryStringProps {
  axis: 'width' | 'height';
  value:
    | string
    | number
    | {
        min: string | number;
        max: string | number;
      };
  operator?: 'up' | 'down' | 'between' | 'only' | 'not';
  theme: MantineTheme;
}

/**
 * Génère une chaîne de requête média CSS basée sur les paramètres fournis, en utilisant les breakpoints définis dans le thème.
 * @param {"width" | "height"} params.axis L'axe pour lequel générer la requête (largeur ou hauteur).
 * @param {string | number | { min: string | number; max: string | number }} params.value La valeur ou les valeurs de dimension à utiliser pour la requête. Peut être une valeur de breakpoint du thème, une chaîne avec des unités, un nombre représentant des pixels, ou un objet avec des propriétés "min" et "max".
 * @param {"up" | "down" | "between" | "only" | "not"} [params.operator="down"] L'opérateur à utiliser pour la requête média. Défaut = "down".
 * @param {MantineTheme} params.theme Le thème Mantine à utiliser pour résoudre les breakpoints et les valeurs de dimension.
 * @returns {string} La chaîne de requête média CSS générée.
 * @throws {Error} Si les paramètres sont invalides ou si les unités ne sont pas prises en charge.
 */
export function getQueryString({
  axis,
  value,
  operator = 'down',
  theme,
}: GetQueryStringProps): string {
  let resolvedValue: number | { min: number; max: number };

  if (typeof value === 'object') {
    resolvedValue = {
      min: toNumberRem({ value: value.min, rootFontSize: theme.fontSize, theme }),
      max: toNumberRem({ value: value.max, rootFontSize: theme.fontSize, theme }),
    };
  } else {
    resolvedValue = toNumberRem({ value, rootFontSize: theme.fontSize, theme });
  }

  const allValues = (
    Object.values(axis === 'width' ? theme.breakpoints : theme.heightBreakpoints) as string[]
  ).map((v) => toNumberRem({ value: v, rootFontSize: theme.fontSize, theme }));

  let previousValue = 0;

  if (typeof resolvedValue === 'number') {
    previousValue = Math.max(...allValues.filter((v) => v < resolvedValue)) || 0;
  }

  let query = '';

  const min = `(min-${axis}: ${resolvedValue}rem)`;
  const max = `(max-${axis}: calc(${resolvedValue}rem - 0.5px))`;

  switch (operator) {
    case 'up':
      query = min;
      break;
    case 'down':
      query = max;
      break;
    case 'between':
      if (typeof resolvedValue === 'object') {
        query = `${min}, ${max}`;
      }
      break;
    case 'only':
      if (typeof resolvedValue === 'number') {
        query = `(min-${axis}: ${previousValue}rem), ${max}`;
      }
      break;
    case 'not':
      if (typeof resolvedValue === 'number') {
        query = `(max-${axis}: calc(${previousValue}rem - 0.5px)), ${min}`;
      }
      break;
  }

  return query;
}
