/**
 * Represents a merged evaluation item
 */
export interface PerformanceRawMergedItem {
  /**
   * Key of the metric, i.e. recall
   */
  metric: string;
  /**
   * Value for JavaScript evaluation
   */
  score_js: number;
  /**
   * Value for Python evaluation
   */
  score_python: number;
  /**
   * Class ID
   */
  class: number;
}
