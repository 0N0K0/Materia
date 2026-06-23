import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { getQueryString } from './queryString.gen';

/**
 * Détermine si l'appareil prend en charge le survol et a une précision de pointeur fine (comme une souris).
 * @returns {boolean} true si l'appareil peut survoler, sinon false.
 */
export const useCanHover = (): boolean => useMediaQuery('(hover: hover) and (pointer: fine)');

export type Density = 'tight' | 'compact' | 'loose';

/**
 * Détermine la densité de l'interface utilisateur en fonction des breakpoints horizontaux et verticaux.
 * @returns {Density} "tight" si la largeur ou la hauteur est en breakpoint "xs", "compact" si en breakpoint "sm", sinon "loose".
 */
export const useDensity = (): Density => {
  const theme = useMantineTheme();

  const queries: Record<string, boolean> = {};

  for (const axis of ['width', 'height'] as const) {
    for (const value of ['xs', 'sm'] as const) {
      queries[`${axis}${value}`] = useMediaQuery(
        getQueryString({
          axis,
          value,
          operator: 'only',
          theme,
        })
      );
    }
  }

  const isTight = queries['widthxs'] || queries['heightxs'];
  const isCompact = queries['widthsm'] || queries['heightsm'];

  return isTight ? 'tight' : isCompact ? 'compact' : 'loose';
};
