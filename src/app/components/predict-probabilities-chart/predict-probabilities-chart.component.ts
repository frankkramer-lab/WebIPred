import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartTypeEnum } from '../../core/enum/chart-type.enum';
import { Prediction } from '../../data/schema/prediction';
import { ProbabilitiesOrderEnum } from '../../core/enum/probabilities-order.enum';

/**
 * Component to visualize prediction probabilities as chart
 */
@Component({
  selector: 'app-predict-probabilities-chart',
  templateUrl: './predict-probabilities-chart.component.html',
  styleUrls: ['./predict-probabilities-chart.component.scss'],
})
export class PredictProbabilitiesChartComponent {
  /**
   * Prediction to visualize
   */
  @Input() prediction!: Prediction | null;
  /**
   * User preference for result bar charts
   */
  @Input() preferredChartType!: ChartTypeEnum | null;
  /**
   * User preference for result probabilities order
   */
  @Input() preferredChartOrderType!: ProbabilitiesOrderEnum | null;
  /**
   * Emits a signal, when the user changes the probabilities order
   */
  @Output() chartOrderChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
}
