import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component holding information about a confusion matrix and allows for changes to confusion matrix format.
 */
@Component({
  selector: 'app-chart-metric-info-cm',
  templateUrl: './chart-metric-info-cm.component.html',
  styleUrls: ['./chart-metric-info-cm.component.scss'],
})
export class ChartMetricInfoCmComponent {
  /**
   * User's preference regarding confusion matrix visualization
   */
  @Input() confusionMatrixFormat!: string | null;
  /**
   * Emits a signal, if the user changes the confusion matrix visualization preference
   */
  @Output() confusionMatrixFormatChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
}
