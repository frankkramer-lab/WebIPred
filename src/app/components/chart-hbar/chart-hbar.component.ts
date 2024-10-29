import { Component, Input } from '@angular/core';
import { ChartItem } from '../../data/schema/chart-item';
import { ChartItemValue } from '../../data/schema/chart-item-value';
import { LegendPosition } from '@swimlane/ngx-charts';

/**
 * Component representing horizontal bar charts. Please note: This visualization is tailored to [ngx-charts](https://github.com/swimlane/ngx-charts).
 */
@Component({
  selector: 'app-chart-hbar',
  templateUrl: './chart-hbar.component.html',
  styleUrls: ['./chart-hbar.component.scss'],
})
export class ChartHbarComponent {
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
  /**
   * Legend position
   */
  legendPosition: LegendPosition = LegendPosition.Right;
}
