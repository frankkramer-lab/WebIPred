import { Component, Input } from '@angular/core';
import { MetricDescription } from '../../data/schema/metric-description';
import { ChartTypeEnum } from '../../core/enum/chart-type.enum';

/**
 * Component to visualize a metric chart
 */
@Component({
  selector: 'app-chart-metric-chart',
  templateUrl: './chart-metric-chart.component.html',
  styleUrls: ['./chart-metric-chart.component.scss'],
})
export class ChartMetricChartComponent {
  /**
   * Metric of interest
   */
  @Input() metric!: MetricDescription | null;
  /**
   * User's bar chart preference
   */
  @Input() preferredBarChartFormat!: ChartTypeEnum | null;
}
