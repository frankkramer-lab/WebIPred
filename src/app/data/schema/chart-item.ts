import { ChartItemValue } from './chart-item-value';

/**
 * Reflects the data structure required for grouped [ngx-charts](https://github.com/swimlane/ngx-charts) bar charts
 */
export interface ChartItem {
  /**
   * Name of the data point
   */
  name: string;
  /**
   * List of values for all available groups
   */
  series: ChartItemValue[];
}
