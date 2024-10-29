import { Component, Input } from '@angular/core';
import { ChartItem } from '../../data/schema/chart-item';
import { LegendPosition } from '@swimlane/ngx-charts';
/**
 * Component representing grouped vertical bar charts. Please note: This visualization is tailored to [ngx-charts](https://github.com/swimlane/ngx-charts).
 */
@Component({
  selector: 'app-chart-vbar-grouped',
  templateUrl: './chart-vbar-grouped.component.html',
  styleUrls: ['./chart-vbar-grouped.component.scss'],
})
export class ChartVbarGroupedComponent {
  /**
   * Chart instance
   */
  @Input() chart!: ChartItem[];
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
  /**
   * Legend position
   */
  legendPosition: LegendPosition = LegendPosition.Right;
}
