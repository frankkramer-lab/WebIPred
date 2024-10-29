import { Component, Input } from '@angular/core';
import { ChartItem } from '../../data/schema/chart-item';
import { LegendPosition } from '@swimlane/ngx-charts';
/**
 * Component representing grouped horizontal bar charts. Please note: This visualization is tailored to [ngx-charts](https://github.com/swimlane/ngx-charts).
 */
@Component({
  selector: 'app-chart-hbar-grouped',
  templateUrl: './chart-hbar-grouped.component.html',
  styleUrls: ['./chart-hbar-grouped.component.scss'],
})
export class ChartHbarGroupedComponent {
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
