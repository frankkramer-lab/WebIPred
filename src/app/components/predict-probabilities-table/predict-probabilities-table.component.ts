import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prediction } from '../../data/schema/prediction';
import { XaiReference } from '../../data/schema/xai-reference';

/**
 * Component for the probabilities table
 */
@Component({
  selector: 'app-predict-probabilities-table',
  templateUrl: './predict-probabilities-table.component.html',
  styleUrls: ['./predict-probabilities-table.component.scss'],
})
export class PredictProbabilitiesTableComponent {
  /**
   * Active prediction
   */
  @Input() prediction!: Prediction | null;
  /**
   * True, if the assigned class (or classes, for multi-label predictions) should be marked in the table
   */
  @Input() markAssignedClass!: boolean | null;
  /**
   * Threshold to mark multi-label classes by
   */
  @Input() multilabelThreshold!: number | null;
  /**
   * Class, which is currently being processed for XAI
   */
  @Input() xaiClassInProcess!: number | null;
  /**
   * Prediction, which is currently being processed for XAI
   */
  @Input() xaiPredictionInProcess!: number | null;
  /**
   * Emits a signal, when [GradCAM](https://arxiv.org/abs/1610.02391) is to be started
   */
  @Output() generateGradCamEmitter: EventEmitter<XaiReference> =
    new EventEmitter<XaiReference>();
  /**
   * Emits a signal, when [GradCAM](https://arxiv.org/abs/1610.02391) is to be displayed
   */
  @Output() showGradCamEmitter: EventEmitter<XaiReference> =
    new EventEmitter<XaiReference>();

  /**
   * Returns true, if the given row in the probabilities table should be highlighted
   * @param value Probability
   * @param values List of probabilities
   */
  needsHighlighting(value: number, values: number[] | undefined): boolean {
    if (
      !values ||
      !this.markAssignedClass ||
      this.multilabelThreshold === undefined ||
      this.multilabelThreshold === null
    )
      return false;

    if (this.prediction && this.prediction.model) {
      if (this.prediction.model.isMultiLabel) {
        return value >= this.multilabelThreshold;
      } else if (this.prediction.model.isMultiClass) {
        return Math.max(...values) === value;
      } else {
        return false;
      }
    }
    return false;
  }
}
