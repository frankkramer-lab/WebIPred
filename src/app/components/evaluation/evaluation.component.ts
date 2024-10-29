import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetricDescription } from '../../data/schema/metric-description';
import { ChartTypeEnum } from '../../core/enum/chart-type.enum';
import { ModelEvaluation } from '../../data/schema/model-evaluation';
import { ConfusionMatrixModeEnum } from '../../core/enum/confusion-matrix-mode.enum';
import { ModelSummary } from '../../data/schema/model-summary';

/**
 * Component visualizing a model's evaluation with Python and Node.js
 */
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
})
export class EvaluationComponent {
  @Input() activeModel!: ModelSummary | null;
  /**
   * Evaluation object
   */
  @Input() evaluation!: ModelEvaluation | null;
  /**
   * User's preferences for bar charts
   */
  @Input() barTypeMetrics!: ChartTypeEnum | null;
  /**
   * User's preferences for confusion matrix
   */
  @Input() confusionMatrixType!: ConfusionMatrixModeEnum | null;
  /**
   * Current metric of interest
   */
  @Input() metricOfInterest!: MetricDescription | null;
  /**
   * Metric displaying the class distribution, which was used during evaluation
   */
  @Input() metricDistribution!: MetricDescription | null;
  /**
   * Metric displaying the time in milliseconds for preprocessing and prediction during evaluation
   */
  @Input() metricDuration!: MetricDescription | null;
  /**
   * Emits a signal, when the metric of interest is changing
   */
  @Output() evaluationMetricChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  /**
   * Emits a signal, when the evaluation is to be exported as CSV
   */
  @Output() exportEvaluationEmitter: EventEmitter<void> =
    new EventEmitter<void>();
  /**
   * Emits a signal, when the confusion matrix preference is changing
   */
  @Output() confusionMatrixModeChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
}
