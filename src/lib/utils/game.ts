import type { IChord } from 'textalive-app-api';

import type { Char } from '$lib/contexts/game';

export function isIntersecting(first: HTMLElement, second: HTMLElement) {
  const firstRect = first.getBoundingClientRect();
  const secondRect = second.getBoundingClientRect();

  return (
    firstRect.bottom > secondRect.top &&
    firstRect.right > secondRect.left &&
    firstRect.top < secondRect.bottom &&
    firstRect.left < secondRect.right
  );
}

export function calculateCharYPosition(
  amplitude: number,
  maxAmplitude: number,
  cornersPercentage = 0.1,
) {
  const maxPercentage = 1 - cornersPercentage * 2;
  return (cornersPercentage + (amplitude / maxAmplitude) * maxPercentage) * 100;
}

export function calculateActiveColor(
  activeColor: Char['color'],
  previousChord: IChord,
  currentChord: IChord,
): Char['color'] {
  if (!activeColor) {
    return 1;
  }

  if (previousChord === currentChord) {
    return activeColor;
  }

  switch (activeColor) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 1;
  }
}
