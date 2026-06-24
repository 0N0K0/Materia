import { type MantineColorsTuple, type MantineColorScheme } from '@mantine/core';
import chroma from 'chroma-js';
import { Hsluv } from 'hsluv';

type ColorMode = 'linear' | 'perceived';

type OutputMode = 'array' | 'map';

export interface PaletteConfig {
  value: string;
  valueStop?: number;
  colorMode?: ColorMode;
  h?: number;
  s?: number;
  lMin?: number;
  lMax?: number;
  steps?: number[];
  outputMode?: OutputMode;
}

// Étapes de la palette
export const STEPS: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * Génère une palette de couleurs à partir d'une couleur de base en utilisant les principes de la théorie des couleurs et de la perception humaine.
 * @param {string} props.value La couleur de base à partir de laquelle la palette sera générée. Doit être une valeur hexadécimale valide.
 * @param {number} [props.valueStop=500] L'étape de la palette (50, 100, 200, etc.) qui correspond à la couleur de base. Doit être un nombre entre 0 et 1000. Défaut: 500.
 * @param {ColorMode} [props.colorMode="perceived"] Le mode de couleur à utiliser pour les calculs de luminosité. "linear" pour une approche linéaire, "perceived" pour une approche basée sur la perception humaine. Défaut: "perceived".
 * @param {number} [props.h=0] La quantité de variation de teinte à appliquer à chaque étape de la palette. Doit être un nombre entre 0 et 360. Défaut: 0.
 * @param {number} [props.s=0] La quantité de variation de saturation à appliquer à chaque étape de la palette. Doit être un nombre entre 0 et 100. Défaut: 0.
 * @param {number} [props.lMin=0] La luminosité minimale pour les couleurs les plus sombres de la palette. Doit être un nombre entre 0 et 100. Défaut: 0.
 * @param {number} [props.lMax=100] La luminosité maximale pour les couleurs les plus claires de la palette. Doit être un nombre entre 0 et 100. Défaut: 100.
 * @param {number[]} [props.steps=[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]] Les étapes de la palette à générer. Chaque étape doit être un nombre entre 0 et 1000. Défaut: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].
 * @param {OutputMode} [props.outputMode="array"] Le format de sortie de la palette. "array" pour un tableau de couleurs, "map" pour une map avec les étapes comme clés. Défaut: "array".
 * @returns {MantineColorsTuple[] | Record<number, string>} Une palette de couleurs générée sous forme de tableau ou de map, selon le mode de sortie spécifié.
 * @throws {Error} Si la configuration est invalide.
 */
export function createPalette({
  value,
  valueStop = 500,
  colorMode = 'perceived',
  h = 0,
  s = 0,
  lMin = 0,
  lMax = 100,
  steps = STEPS,
  outputMode = 'array',
}: PaletteConfig): MantineColorsTuple[] | Record<number, string> {
  if (
    !value ||
    !value.startsWith('#') ||
    chroma.valid(value) === false ||
    valueStop === undefined ||
    !steps ||
    steps.length < 10 ||
    !steps.includes(valueStop) ||
    valueStop < 0 ||
    valueStop > 1000 ||
    lMin === undefined ||
    lMin < 0 ||
    lMin > 100 ||
    lMax === undefined ||
    lMax < 0 ||
    lMax > 100 ||
    !outputMode ||
    (outputMode !== 'array' && outputMode !== 'map') ||
    h === undefined ||
    h < 0 ||
    h > 360 ||
    s === undefined ||
    s < 0 ||
    s > 100
  ) {
    throw new Error('Invalid palette configuration. Please check your inputs.');
  }

  // All available steps (including 0 and 1000 for calculation)
  const allSteps: number[] = Array.from(new Set<number>([0, ...steps, 1000])).sort((a, b) => a - b);

  // Create base color from input
  const baseColor = chroma(value);
  const [baseH, baseS, baseL] = baseColor.hsl();

  // Handle grayscale colors (NaN hue) by setting a default hue
  const normalizedBaseH = isNaN(baseH) ? 0 : baseH;

  // 1. Create hue scale
  const valueStopIndex = allSteps.indexOf(valueStop);
  if (valueStopIndex === -1) {
    throw new Error(`Invalid valueStop: ${valueStop}`);
  }

  const hueScale = allSteps.map((step) => {
    const stopIndex = allSteps.indexOf(step);
    const diff = Math.abs(stopIndex - valueStopIndex);
    const tweakValue = h ? diff * h : 0;
    return { step, tweak: tweakValue };
  });

  // 2. Create saturation scale
  const saturationScale = allSteps.map((step) => {
    const stopIndex = allSteps.indexOf(step);
    const diff = Math.abs(stopIndex - valueStopIndex);
    const tweakValue = s ? Math.round((diff + 1) * s * (1 + diff / 10)) : 0;
    return { step, tweak: Math.min(tweakValue, 100) };
  });

  // 3. Create lightness distribution
  const baseHsluv = new Hsluv();
  baseHsluv.hex = value;
  baseHsluv.hexToHsluv();

  const baseHsluvH = isNaN(baseHsluv.hsluv_h) ? 0 : baseHsluv.hsluv_h;

  const baseHsluvS = baseHsluv.hsluv_s;
  const baseHsluvL = baseHsluv.hsluv_l;

  const lightnessValue = colorMode === 'linear' ? baseL * 100 : baseHsluvL;

  // Create the three anchor points
  const distributionAnchors = [
    { step: 0, tweak: lMax },
    { step: valueStop, tweak: lightnessValue },
    { step: 1000, tweak: lMin },
  ];

  // Interpolate for missing steps
  const distributionScale = allSteps.map((step) => {
    // If it's an anchor point, use the anchor value
    const anchor = distributionAnchors.find((a) => a.step === step);
    if (anchor) {
      return anchor;
    }

    // Otherwise interpolate between anchor points
    let leftAnchor, rightAnchor;

    if (step < valueStop) {
      leftAnchor = distributionAnchors[0]; // step 0
      rightAnchor = distributionAnchors[1]; // valueStop
    } else {
      leftAnchor = distributionAnchors[1]; // valueStop
      rightAnchor = distributionAnchors[2]; // step 1000
    }

    // Linear interpolation
    const range = rightAnchor.step - leftAnchor.step;
    const position = step - leftAnchor.step;
    const ratio = position / range;
    const tweak = leftAnchor.tweak + (rightAnchor.tweak - leftAnchor.tweak) * ratio;

    return { step, tweak: Math.round(tweak) };
  });

  const entries = allSteps.map((step, stepIndex) => {
    if (step === valueStop) {
      return {
        step,
        hex: value.toUpperCase(),
      };
    }

    // Get tweaks for this step
    const hTweak = hueScale[stepIndex].tweak;
    const sTweak = saturationScale[stepIndex].tweak;
    const lTweak = distributionScale[stepIndex].tweak;

    let newColor: chroma.Color;

    if (colorMode === 'linear') {
      // Direct HSL manipulation for linear mode
      const newH = (normalizedBaseH + hTweak) % 360;
      const newS = Math.max(0, Math.min(100, baseS * 100 + sTweak));
      const newL = Math.max(0, Math.min(100, lTweak));

      newColor = chroma.hsl(newH, newS / 100, newL / 100);
    } else {
      const hsluv = new Hsluv();

      hsluv.hsluv_h = (baseHsluvH + hTweak) % 360;
      hsluv.hsluv_s = Math.max(0, Math.min(100, baseHsluvS + sTweak));
      hsluv.hsluv_l = Math.max(0, Math.min(100, lTweak));

      hsluv.hsluvToHex();

      newColor = chroma(hsluv.hex);
    }

    return {
      step,
      hex: newColor.hex().toUpperCase(),
    };
  });

  const filteredEntries = entries.filter(
    (entry) =>
      (steps.includes(0) ? true : entry.step !== 0) &&
      (steps.includes(1000) ? true : entry.step !== 1000)
  );

  if (outputMode === 'array') {
    return filteredEntries.map((entry) => entry.hex);
  }

  return Object.fromEntries(filteredEntries.map((entry) => [entry.step, entry.hex]));
}

/**
 * Récupère le schéma de couleurs actuel.
 * @returns {MantineColorScheme} Le schéma de couleurs actuel, qui peut être "light" ou "dark".
 */
export function getColorScheme(): Exclude<MantineColorScheme, 'auto'> {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const value = document.documentElement.getAttribute(
    'data-mantine-color-scheme'
  ) as MantineColorScheme | null;

  if (value === 'auto' || !value) {
    return typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  return value;
}
