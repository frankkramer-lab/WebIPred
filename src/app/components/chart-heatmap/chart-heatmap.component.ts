import { Component, Input } from '@angular/core';
import { ChartItem } from '../../data/schema/chart-item';
import { ChartItemValue } from '../../data/schema/chart-item-value';
/**
 * Component for heatmaps, used to represent confusion matrices. Please note: This visualization is tailored to [ngx-charts](https://github.com/swimlane/ngx-charts).
 */
@Component({
  selector: 'app-chart-heatmap',
  templateUrl: './chart-heatmap.component.html',
  styleUrls: ['./chart-heatmap.component.scss'],
})
export class ChartHeatmapComponent {
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
