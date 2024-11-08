import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ModelSummary } from '../../data/schema/model-summary';
import { MetricDescription } from '../../data/schema/metric-description';

/**
 * Component containing both the list of all available models and the description of the currently selected model
 */
@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss'],
})
export class ModelsComponent{
  /**
   * List of available models
   */
  @Input() availableModels!: ModelSummary[] | null;
  /**
   * Currently selected model: 16
   */
  @Input() activeModel!: ModelSummary | null;
  protected activeModelNr = 4;
  /**
   * Term to filter the available models by
   */
  @Input() filterTerm!: string | null;
  /**
   * Emits a signal, when the model selection changes
   */
  @Output() setModelEmitter: EventEmitter<ModelSummary> =
    new EventEmitter<ModelSummary>();
  /**
   * Emits a signal, when the filter term changes
   */
  @Output() filterTermChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  /**
   * Emits a signal, when the user copies a model's ID
   */
  @Output() copyModelIdEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  /**
   * Emits a signal, when the active evaluation metric changes
   */
  @Output() setMetricEmitter: EventEmitter<MetricDescription> =
    new EventEmitter<MetricDescription>();
}
