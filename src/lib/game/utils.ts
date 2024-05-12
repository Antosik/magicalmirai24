import type { IBeat, IChord, Player, ValenceArousalValue } from 'textalive-app-api';

import { color } from 'd3-color';

import {
  AROUSAL_COLOR_MULTIPLIER,
  CLOUD_ANIMATION_DURATION_MULTIPLIER,
  CharColor,
  DEFAULT_VA_COLOR,
  KEYBOARD_POSITION_STEP,
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
 * @param beats Beats info
 * @returns Animation duration (ms)
 */
export function calculateCloudAnimationDuration(beats: IBeat[] = []): number | undefined {
  if (!beats?.length) {
    return;
  }

  const beatsDuration = beats.map((el) => el.duration).filter(Boolean);
  const mediumDuration = beatsDuration.reduce((a, b) => a + b, 0) / beatsDuration.length;
  const duration = Math.floor(mediumDuration * CLOUD_ANIMATION_DURATION_MULTIPLIER);

  // Don't want to be animation too fast or too slow - pick maximum or minimum if needed
  return Math.max(MIN_CLOUD_ANIMATION_DURATION, Math.min(duration, MAX_CLOUD_ANIMATION_DURATION));
}

/** Calculates the step size (in px) for control with keyboard */
export function calculateKeyboardPositioningStep(windowHeight: number): number {
  return windowHeight * (KEYBOARD_POSITION_STEP / 100);
}

function calculateArousalCoefficient(arousal: ValenceArousalValue['a']): number {
  return Math.floor(Math.abs(arousal * AROUSAL_COLOR_MULTIPLIER) * 1000) / 1000;
}

export function calculateVAColor({ a: arousal, v: valence }: ValenceArousalValue): string {
  const arousalCoefficient = calculateArousalCoefficient(arousal);

  const d3color = color(DEFAULT_VA_COLOR);
  if (!d3color) {
    return DEFAULT_VA_COLOR;
  }

  if (valence < -0.1) {
    return d3color.darker(arousalCoefficient).toString();
  }

  if (valence > 0.1) {
    return d3color.brighter(arousalCoefficient).toString();
  }

  return d3color.toString();
}
