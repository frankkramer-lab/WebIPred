import { ChartItemValue } from './chart-item-value';
import { ChartItem } from './chart-item';

/**
 * Contains information and chart for a metric
 */
export interface MetricDescription {
  /**
   * ID for a metric
   */
  key: string;
  /**
   * Name for a metric
   */
  name?: string;
  /**
   * Description for a metric
   */
  description?: string;
  /**
   * JavaScript chart, for charts like confusion matrix or ROC curves
   */
  chartJs?: ChartItemValue[];
  /**
   * Python chart, for charts like confusion matrix or ROC curves
   */
  chartPy?: ChartItemValue[];
  /**
   * Grouped chart, containing both JavaScript and Python data
   */
  chartGrouped?: ChartItem[];
}
