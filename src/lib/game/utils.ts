import type { IChord, Player } from 'textalive-app-api';

import { CharColor, REAL_PAUSE_DELAY } from './constants';

/**
 * Sometimes browser pause the song on launch,
 * so we need to find the real pause that was triggered by the use
 * @param player TextAlive player instance
 * @returns Is pause triggered by user
 */
export function isRealPause(player: Player): boolean {
  return player.timer.position > REAL_PAUSE_DELAY;
}

/**
 * Checks if two elements are intersecting
 * @param first First element
 * @param second Second element
 * @returns Is elements intersecting
 */
export function isIntersecting(first: HTMLElement, second: HTMLElement): boolean {
  const firstRect = first.getBoundingClientRect();
  const secondRect = second.getBoundingClientRect();

  return (
    firstRect.bottom > secondRect.top &&
    firstRect.right > secondRect.left &&
    firstRect.top < secondRect.bottom &&
    firstRect.left < secondRect.right
  );
}

/**
 * Calculates the y axis position for char by an amplitude
 * @param amplitude Character amplitude
 * @param maxAmplitude Maximum amplitude during the song
 * @param cornersPercentage
 * @returns Y position for current char
 */
export function calculateCharYPosition(
  amplitude: number,
  maxAmplitude: number,
  cornersPercentage = 0.05,
) {
  const maxPercentage = 1 - cornersPercentage * 2;
  return (cornersPercentage + (amplitude / maxAmplitude) * maxPercentage) * 100;
}

/**
 * Calculates the color for char based on chords
 * @param previousColor Previous char color
 * @param previousChord Previous chord data
 * @param currentChord Current chord data
 * @returns Color for current char
 */
export function calculateActiveColor(
  previousColor: CharColor,
  previousChord: IChord,
  currentChord: IChord,
): CharColor {
  // If no color - pick first one
  if (!previousColor) {
    return CharColor.DARK;
  }

  // If chord is not changed - pick the same color as previous
  if (previousChord === currentChord) {
    return previousColor;
  }

  // If chord is changed - pick the next color
  switch (previousColor) {
    case CharColor.DARK:
      return CharColor.RED;
    case CharColor.RED:
      return CharColor.WHITE;
    case CharColor.WHITE:
      return CharColor.DARK;
  }
}
