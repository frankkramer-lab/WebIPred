import { IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Represents a toast to display in the frontend
 */
export interface Toast {
  /**
   * Text to display
   */
  text: string;
  /**
   * Duration of visibility in milliseconds
   */
  delay: number;
  /**
   * True, if the toast should be hidden automatically
   */
  autoHide: boolean;
  /**
   * True, if the toast is hidden
   */
  hidden: boolean;
  /**
   * Icon to show next to the toast's text
   */
  icon: IconProp;
  /**
   * String, encoding the toast's color, i.e. "success" for green
   */
  bg: string;
}
