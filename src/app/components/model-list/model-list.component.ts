import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModelSummary } from '../../data/schema/model-summary';

/**
 * Component displaying a scrollable list of models
 */
@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss'],
})
export class ModelListComponent {
  /**
   * List of all models to show in the list
   */
  @Input() availableModels!: ModelSummary[] | null;
  /**
   * Currently selected model
   */
  @Input() activeModel!: ModelSummary | null;
  /**
   * Term to filter the available models by
   */
  @Input() modelFilterTerm!: string | null;
  /**
   * Emits a signal, when the filter term changes
   */
  @Output() filterTermChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  /**
   * Emits a signal, when the model selection changes
   */
  @Output() modelSelectionChangedEmitter: EventEmitter<ModelSummary> =
    new EventEmitter<ModelSummary>();
}
