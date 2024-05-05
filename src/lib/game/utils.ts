import type { IBeat, IChord, Player } from 'textalive-app-api';

import {
  CLOUD_ANIMATION_DURATION_MULTIPLIER,
  CharColor,
  MAX_CLOUD_ANIMATION_DURATION,
  MIN_CLOUD_ANIMATION_DURATION,
  REAL_PAUSE_DELAY,
} from './constants';

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

/**
 * Calculates the duration of cloud animation
 * @param beat Beat info
 * @returns Animation duration (ms)
 */
export function calculateCloudAnimationDuration(beat: IBeat): number | undefined {
  if (!beat?.duration) {
    return;
  }

  const duration = Math.floor(beat.duration * CLOUD_ANIMATION_DURATION_MULTIPLIER);

  // Don't want to be animation too fast or too slow - pick maximum or minimum if needed
  return Math.max(MIN_CLOUD_ANIMATION_DURATION, Math.min(duration, MAX_CLOUD_ANIMATION_DURATION));
}
