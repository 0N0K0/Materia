import { useEffect, useState } from 'react';

/**
 * Calcule la taille du ripple de focus en fonction des dimensions et des paddings de l'élément référencé.
 * @param {HTMLElement | null | undefined} rippleTarget L'élément sur lequel le ripple de focus doit être appliqué.
 * @returns {{ radius: number, marginLeft: number, marginTop: number }} Le rayon du ripple de focus et les marges pour le positionnement.
 */
export function useFocusRipple(rippleTarget: HTMLElement | null | undefined): {
  radius: number;
  marginLeft: number;
  marginTop: number;
} {
  const [state, setState] = useState({
    radius: 0,
    marginLeft: 0,
    marginTop: 0,
  });

  useEffect(() => {
    if (!rippleTarget) {
      return;
    }

    const update = () => {
      const rect = rippleTarget.getBoundingClientRect();
      const styles = getComputedStyle(rippleTarget);

      const paddingLeft = parseFloat(styles.paddingLeft);
      const paddingRight = parseFloat(styles.paddingRight);
      const paddingX = paddingLeft + paddingRight;

      const paddingTop = parseFloat(styles.paddingTop);
      const paddingBottom = parseFloat(styles.paddingBottom);
      const paddingY = paddingTop + paddingBottom;

      const innerWidth = rect.width - paddingX;
      const innerHeight = rect.height - paddingY;

      const width = Math.round(innerWidth + Math.min(paddingLeft, paddingRight) * 1.5);
      const height = Math.round(innerHeight + Math.min(paddingTop, paddingBottom) * 1.5);

      setState({
        radius: Math.max(width, height),
        marginLeft: paddingLeft - paddingRight,
        marginTop: paddingTop - paddingBottom,
      });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(rippleTarget);

    return () => observer.disconnect();
  }, [rippleTarget]);

  return state;
}
