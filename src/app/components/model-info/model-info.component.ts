import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModelSummary } from '../../data/schema/model-summary';

/**
 * Component containing information about a model
 */
@Component({
  selector: 'app-model-info',
  templateUrl: './model-info.component.html',
  styleUrls: ['./model-info.component.scss'],
})
export class ModelInfoComponent {
  /**
   * Information about a model
   */
  @Input() model!: ModelSummary | null;
  /**
   * Emits a signal, when the user copies the model's ID
   */
  @Output() copyModelIdEmitter: EventEmitter<number> =
    new EventEmitter<number>();
}
