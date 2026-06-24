import { useEffect, useRef, useState } from 'react';
import { getAutoDimensionDuration } from '../../theme';
import { getMaxDistanceFromPointer } from '../../utils';

export interface ActionState {
  hovered: boolean;
  focused: boolean;
  touchRipples: string[];

  pointerX: number;
  pointerY: number;

  radius: number;
  duration: number;
}

export type ActionPhase = 'entering' | 'entered' | 'leaving' | 'idle';

export interface ActionPhaseControls {
  onEnter: () => void;
  onEntered: () => void;
  onExit: () => void;
  onExited: () => void;
}

/**
 * Gère les interactions d'une action (hover, touch, focus) et fournit les coordonnées du pointeur.
 * @param {HTMLElement | null | undefined} rippleTarget L'élément cible sur lequel les interactions sont suivies.
 * @param {HTMLElement | null | undefined} focusTarget L'élément cible sur lequel le focus est suivi.
 * @returns {{ state: ActionState; phaseControls: ActionPhaseControls }} L'état actuel de l'action et les contrôles pour les phases d'animation.
 */
export function useActionEffect(
  rippleTarget: HTMLElement | null | undefined,
  focusTarget: HTMLElement | null | undefined
): {
  state: ActionState;
  phaseControls: ActionPhaseControls;
} {
  // Etat de l'action et phases d'animation
  const [state, setState] = useState<ActionState>({
    hovered: false,
    focused: false,
    touchRipples: [],
    pointerX: 0,
    pointerY: 0,
    radius: 0,
    duration: 0,
  });

  const [phase, setPhase] = useState<ActionPhase>('idle');
  const phaseRef = useRef(phase);
  const touchTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Gestion des événements pour les interactions de l'utilisateur
  useEffect(() => {
    const getRect = () => rippleTarget?.getBoundingClientRect();

    /**
     * Gère l'entrée du pointeur sur l'élément, en mettant à jour l'état pour refléter le survol et les coordonnées du pointeur.
     * @param {PointerEvent} event L'événement de pointeur déclenché lors de l'entrée du pointeur sur l'élément.
     */
    const handlePointerEnter = (event: PointerEvent) => {
      const rect = getRect();
      if (!rect) {
        return;
      }

      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      const radius = getMaxDistanceFromPointer({ rect, pointerX, pointerY }) * 2;

      setState((current) => ({
        ...current,
        hovered: true,
        pointerX: phaseRef.current === 'idle' ? pointerX - radius / 2 : current.pointerX,
        pointerY: phaseRef.current === 'idle' ? pointerY - radius / 2 : current.pointerY,
        radius: radius,
      }));
    };
    /**
     * Gère la sortie du pointeur de l'élément, en mettant à jour l'état pour refléter la fin du survol et les coordonnées du pointeur.
     * @param {PointerEvent} event L'événement de pointeur déclenché lors de la sortie du pointeur de l'élément.
     */
    const handlePointerLeave = (event: PointerEvent) => {
      const rect = getRect();
      if (!rect) {
        return;
      }

      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      const radius = getMaxDistanceFromPointer({ rect, pointerX, pointerY }) * 2;
      const duration = getAutoDimensionDuration({ dimension: radius });

      setState((current) => ({
        ...current,
        hovered: false,
        pointerX: phaseRef.current === 'entered' ? pointerX - radius / 2 : current.pointerX,
        pointerY: phaseRef.current === 'entered' ? pointerY - radius / 2 : current.pointerY,
        radius,
        duration,
      }));
    };

    /**
     * Gère le clic sur l'élément, en mettant à jour l'état pour refléter le clic et les coordonnées du pointeur.
     * @param {PointerEvent} event L'événement de pointeur déclenché lors du clic sur l'élément.
     */
    const handlePointerDown = (event: PointerEvent) => {
      const rect = getRect();
      if (!rect) {
        return;
      }

      const id = String(Date.now()) + String(Math.random());

      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      const radius = getMaxDistanceFromPointer({ rect, pointerX, pointerY }) * 2;

      setState((current) => ({
        ...current,
        touchRipples: [...current.touchRipples, id],
        pointerX: pointerX - radius / 2,
        pointerY: pointerY - radius / 2,
        radius,
      }));

      const t = setTimeout(() => {
        setState((current) => ({
          ...current,
          touchRipples: current.touchRipples.filter((rippleId) => rippleId !== id),
        }));
        touchTimeouts.current = touchTimeouts.current.filter((x) => x !== t);
      }, 600);
      touchTimeouts.current.push(t);
    };

    /** Gère le focus de l'élément, en mettant à jour l'état pour refléter le focus. */
    const handleFocus = (event: FocusEvent) => {
      if (!(event.currentTarget as HTMLElement)?.matches(':focus-visible')) {
        return;
      }

      setState((current) => ({ ...current, focused: true }));
    };
    /** Gère la perte de focus de l'élément, en mettant à jour l'état pour refléter la fin du focus. */
    const handleBlur = () => setState((current) => ({ ...current, focused: false }));

    // Attache les gestionnaires d'événements pour les interactions de l'utilisateur
    if (!rippleTarget || !focusTarget) {
      return;
    }
    rippleTarget.addEventListener('pointerenter', handlePointerEnter);
    rippleTarget.addEventListener('pointerleave', handlePointerLeave);
    rippleTarget.addEventListener('pointerdown', handlePointerDown);
    focusTarget.addEventListener('focus', handleFocus);
    focusTarget.addEventListener('blur', handleBlur);

    // Nettoie les gestionnaires d'événements lors du démontage ou du changement de cible
    return () => {
      rippleTarget.removeEventListener('pointerenter', handlePointerEnter);
      rippleTarget.removeEventListener('pointerleave', handlePointerLeave);
      rippleTarget.removeEventListener('pointerdown', handlePointerDown);
      focusTarget.removeEventListener('focus', handleFocus);
      focusTarget.removeEventListener('blur', handleBlur);
      touchTimeouts.current.forEach(clearTimeout);
      touchTimeouts.current = [];
    };
  }, [rippleTarget, focusTarget]);

  // Contrôles pour les phases d'animation du ripple, permettant de synchroniser les transitions avec les changements d'état
  const onEnter = () => setPhase('entering');
  const onEntered = () => setPhase('entered');
  const onExit = () => setPhase('leaving');
  const onExited = () => setPhase('idle');

  return {
    state,
    phaseControls: {
      onEnter,
      onEntered,
      onExit,
      onExited,
    },
  };
}
