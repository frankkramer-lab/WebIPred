import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Prediction } from '../../data/schema/prediction';

/**
 * Component showing the list of all existing predictions
 */
@Component({
  selector: 'app-predict-history',
  templateUrl: './predict-history.component.html',
  styleUrls: ['./predict-history.component.scss'],
})
export class PredictHistoryComponent {
  /**
   * List of existing predictions
   */
  @Input() predictions!: Prediction[] | null;
  /**
   * Currently active prediction
   */
  @Input() activePrediction!: Prediction | null;
  /**
   * Emits a signal, when the active prediction changes
   */
  @Output() activePredictionChangedEmitter: EventEmitter<Prediction> =
    new EventEmitter<Prediction>();
}
