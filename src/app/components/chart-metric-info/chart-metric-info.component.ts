import { Component, Input } from '@angular/core';
import { MetricDescription } from '../../data/schema/metric-description';

/**
 * Component holding information regarding a metric
 */
@Component({
  selector: 'app-chart-metric-info',
  templateUrl: './chart-metric-info.component.html',
  styleUrls: ['./chart-metric-info.component.scss'],
})
export class ChartMetricInfoComponent {
  /**
   * Metric of interest
   */
  @Input() metric!: MetricDescription | null;
}
