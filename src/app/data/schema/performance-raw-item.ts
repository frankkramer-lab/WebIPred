/**
 * Represents an evaluation item
 */
export interface PerformanceRawItem {
  /**
   * Key of the metric, i.e. recall
   */
  metric: string;
  /**
   * Value for the evaluation
   */
  score: number;
  /**
   * Class ID
   */
  class: number;
}
