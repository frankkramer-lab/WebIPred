/**
 * Type of confusion matrix
 */
export enum ConfusionMatrixModeEnum {
  /**
   * Absolute values
   */
  ABSOLUTE = 'raw',
  /**
   * Normalized over both columns and rows
   */
  RELATIVE = 'all',
  /**
   * Normalized over rows
   */
  ROWS = 'rows',
  /**
   * Normalized over columns
   */
  COLS = 'cols',
}
