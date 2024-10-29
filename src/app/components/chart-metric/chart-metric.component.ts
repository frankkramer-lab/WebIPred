import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartTypeEnum } from '../../core/enum/chart-type.enum';
import { MetricDescription } from '../../data/schema/metric-description';
import { ConfusionMatrixModeEnum } from '../../core/enum/confusion-matrix-mode.enum';

/**
 * Component for displaying a metric and corresponding information.
 */
@Component({
  selector: 'app-chart-metric',
  templateUrl: './chart-metric.component.html',
  styleUrls: ['./chart-metric.component.scss'],
})
export class ChartMetricComponent {
  /**
   * Metric to display
   */
  @Input() metric!: MetricDescription | null;
  /**
   * User's bar chart preference
   */
  @Input() preferredBarChartFormat!: ChartTypeEnum | null;
  /**
   * User's confusion matrix chart preference
   */
  @Input() preferredConfusionMatrixFormat!: ConfusionMatrixModeEnum | null;
  /**
   * Emits a signal, if the user changes the confusion matrix chart preference
   */
  @Output() confusionMatrixModeChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
}
