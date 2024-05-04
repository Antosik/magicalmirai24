/**
 * Converts animation duration to user-friendly speed coefficient
 * @param duration Animation duration (ms)
 * @returns User-friendly coefficient
 * @example
 * convertDurationToSpeed(2000) -> (100 / 2000) * 100 = 5
 */
export function convertDurationToSpeed(duration: number): number {
  return (100 / duration) * 100;
}

/**
 * Converts user-friendly speed coefficient to animation duration
 * @param coefficient User-friendly coefficient
 * @returns Animation duration (ms)
 * @example
 * convertDurationToSpeed(5) -> (100 * 100) / 5 = 2000
 */
export function convertSpeedToDuration(coefficient: number): number {
  return (100 * 100) / coefficient;
}
