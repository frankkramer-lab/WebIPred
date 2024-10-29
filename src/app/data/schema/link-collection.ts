/**
 * Contains all links relevant for using a trained model
 */
export interface LinkCollection {
  /**
   * Link to the Python model
   */
  model: string;
  /**
   * Link to the JavaScript model
   */
  convertedModel: string;
  /**
   * Link to the Python evaluation file
   */
  evalPython: string;
  /**
   * Link to the JavaScript evaluation file
   */
  evalJs: string;
}
