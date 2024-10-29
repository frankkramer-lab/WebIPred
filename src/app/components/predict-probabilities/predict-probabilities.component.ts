import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prediction } from '../../data/schema/prediction';
import { ProbabilitiesOrderEnum } from '../../core/enum/probabilities-order.enum';
import { ChartTypeEnum } from '../../core/enum/chart-type.enum';
import { XaiReference } from '../../data/schema/xai-reference';

/**
 * Component containing prediction probabilities
 */
@Component({
  selector: 'app-predict-probabilities',
  templateUrl: './predict-probabilities.component.html',
  styleUrls: ['./predict-probabilities.component.scss'],
})
export class PredictProbabilitiesComponent {
  /**
   * Prediction to show the probabilities for
   */
  @Input() prediction!: Prediction;
  /**
   * Order, in which probabilities are to be visualized
   */
  @Input() preferredProbabilitiesOrder!: ProbabilitiesOrderEnum | null;
  /**
   * User preference for result bar charts
   */
  @Input() preferredChartType!: ChartTypeEnum | null;
  /**
   * Reference to the class being processed for XAI
   */
  @Input() xaiClassInProcess!: number | null;
  /**
   * Reference to the prediction being processed for XAI
   */
  @Input() xaiPredictionInProcess!: number | null;
  /**
   * Emits a signal, if the prediction is to be exported as CSV
   */
  @Output() exportPredictionEmitter: EventEmitter<Prediction> =
    new EventEmitter<Prediction>();
  /**
   * Emits a signal, if the order to visualize the predictions in, changes
   */
  @Output() probabilitiesChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  /**
   * Emits a signal, when [GradCAM](https://arxiv.org/abs/1610.02391) is to be calculated for a class.
   */
  @Output() generateGradCamEmitter: EventEmitter<XaiReference> =
    new EventEmitter<XaiReference>();
  /**
   * Emits a signal, when [GradCAM](https://arxiv.org/abs/1610.02391) is to be displayed
   */
  @Output() showGradCamEmitter: EventEmitter<XaiReference> =
    new EventEmitter<XaiReference>();
  /**
   * True, if the assigned class is to be marked in the table of probabilities
   */
  markAssignedClass = true;
  /**
   * Multi-label predictions need a threshold to be highlightable by {@link markAssignedClass}
   */
  multilabelThreshold = 0.8;
}
