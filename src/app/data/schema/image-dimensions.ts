/**
 * Describes an image's dimensions
 */
export interface ImageDimensions {
  /**
   * Image width
   */
  width: number;
  /**
   * Image height
   */
  height: number;
  /**
   * Image channels, should be 1, 3 or 4
   */
  channels?: number;
}
