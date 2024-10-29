/**
 * Result sent back from the web worker holding probabilities for a list of predictions
 */
export interface WorkerResult {
  /**
   * List of probabilities for a list of predictions
   */
  probabilities: number[][];
  /**
   * ID for the web worker who processed the task
   */
  workerId: number;
  /**
   * If an error occurs, the message is sent back in this string
   */
  error?: string;
}
