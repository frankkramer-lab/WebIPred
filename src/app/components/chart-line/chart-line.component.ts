import { Component, Input } from '@angular/core';
import { ChartItem } from '../../data/schema/chart-item';
import { ChartItemValue } from '../../data/schema/chart-item-value';
/**
 * Component representing ROC curves. Please note: This visualization is tailored to [ngx-charts](https://github.com/swimlane/ngx-charts).
 */
@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
})
export class ChartLineComponent {
  /**
   * Chart instance
   */
  @Input() chart!: ChartItem[] | ChartItemValue[];
  /**
   * Label for x axis
   */
  @Input() xAxisLabel!: string;
  /**
   * Label for y axis
   */
  @Input() yAxisLabel!: string;
  /**
   * Optional chart title
   */
  @Input() title!: string;
}
