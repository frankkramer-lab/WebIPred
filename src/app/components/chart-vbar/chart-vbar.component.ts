import { Component, Input } from '@angular/core';
import { ChartItemValue } from '../../data/schema/chart-item-value';
import { LegendPosition } from '@swimlane/ngx-charts';
/**
 * Component representing vertical bar charts. Please note: This visualization is tailored to [ngx-charts](https://github.com/swimlane/ngx-charts).
 */
@Component({
  selector: 'app-chart-vbar',
  templateUrl: './chart-vbar.component.html',
  styleUrls: ['./chart-vbar.component.scss'],
})
export class ChartVbarComponent {
  /**
   * Chart instance
   */
  @Input() chart!: ChartItemValue[];
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
