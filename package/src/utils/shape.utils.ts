/**
 * Détermine si un élément est circulaire ou presque en fonction de son aspect ratio et de son border-radius.
 * Un élément est considéré comme circulaire s'il a un aspect ratio proche de 1 (entre 0.9 et 1.1)
 * et si son border-radius est au moins égal à 40% de sa plus petite dimension (largeur ou hauteur).
 * @param {HTMLElement | null | undefined} target L'élément à évaluer.
 * @returns {boolean} true si l'élément est circulaire ou presque, sinon false.
 */
export function isRoundLike(target: HTMLElement | null | undefined): boolean {
  const rect = target?.getBoundingClientRect();
  const aspectRatio = rect ? rect.width / rect.height : 1;
  const minSize = rect ? Math.min(rect.width, rect.height) : 0;

  const style = target ? getComputedStyle(target) : null;
  const borderRadius = style ? parseFloat(style.borderRadius) : 0;

  return (
    aspectRatio > 0.9 && aspectRatio < 1.1 && borderRadius >= minSize * 0.4 && borderRadius > 0
  );
}

/**
 * Calcule la distance maximale entre le pointeur et les coins d'un élément.
 * @param {DOMRect} props.rect Les dimensions et la position de l'élément.
 * @param {number} props.pointerX La position X du pointeur relative à l'élément.
 * @param {number} props.pointerY La position Y du pointeur relative à l'élément.
 * @returns {number} La distance maximale entre le pointeur et les coins de l'élément.
 */
export const getMaxDistanceFromPointer = ({
  rect,
  pointerX,
  pointerY,
}: {
  rect: DOMRect;
  pointerX: number;
  pointerY: number;
}): number => {
  const distanceX = rect.width - pointerX;
  const distanceY = rect.height - pointerY;

  const topLeft = Math.hypot(pointerX, pointerY);
  const topRight = Math.hypot(distanceX, pointerY);
  const bottomLeft = Math.hypot(pointerX, distanceY);
  const bottomRight = Math.hypot(distanceX, distanceY);

  return Math.max(topLeft, topRight, bottomLeft, bottomRight);
};
