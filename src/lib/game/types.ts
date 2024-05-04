import type { CharColor, CharState } from './constants';

/** Represents the char in the word (as a game object) */
export type Char = {
  /** Unique ID */
  id: string;
  /** Character (as a text) */
  text: string;
  /** Vocal amplitude on this character */
  amplitude: number;
  /** Color of the character (associated with chorus) */
  color: CharColor;
  /** Current state of the character (catched, missed, flying) */
  state?: CharState;
};
