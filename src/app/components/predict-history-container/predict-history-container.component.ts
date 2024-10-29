import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Prediction } from '../../data/schema/prediction';
import {
  selectActivePrediction,
  selectPredictions,
  selectProbabilitiesChartOrder,
  selectXai,
  selectXaiClassInProcess,
  selectXaiPredictionInProcess,
} from '../../data/state/predict-history/predict-history.selectors';
import {
  exportPrediction,
  generateGradCam,
  setActivePrediction,
  setProbabilitiesChartOrder,
  showGradCam,
} from '../../data/state/predict-history/predict-history.actions';
import { ChartTypeEnum } from '../../core/enum/chart-type.enum';
import { selectBarChartTypeResults } from '../../data/state/settings/settings.selectors';
import { ProbabilitiesOrderEnum } from '../../core/enum/probabilities-order.enum';
import { XaiReference } from '../../data/schema/xai-reference';

/**
 * Wrapper component for {@link "app/components/predict-history/predict-history.component"!PredictHistoryComponent}
 */
@Component({
  selector: 'app-predict-history-container',
  templateUrl: './predict-history-container.component.html',
  styleUrls: ['./predict-history-container.component.scss'],
})
export class PredictHistoryContainerComponent implements OnInit, OnDestroy {
  /**
   * Observable holding the list of all existing predictions
   */
  predictions$!: Observable<Prediction[]>;
  /**
   * Observable holding the currently active prediction
   */
  activePrediction$!: Observable<Prediction | null>;
  /**
   * Observable holding the order in which probabilities are to be visualized in the chart
   */
  probabilitiesChartOrder$!: Observable<ProbabilitiesOrderEnum>;
  /**
   * Observable holding the user's bar chart preferences for results
   */
  preferredBarChartType$!: Observable<ChartTypeEnum>;
  /**
   * Observable holding the index of the class, which is being processed for XAI
   */
  xaiClassInProcess$!: Observable<number | null>;
  /**
   * Observable holding the index of the prediction, which is being processed for XAI
   */
  xaiPredictionInProcess$!: Observable<number | null>;
  /**
   * Observable holding the XAI image, which is to be rendered on top of the image
   */
  xaiClassVisible$!: Observable<string | null>;

  /**
   * Constructor
   * @param store Necessary for selecting data from store
   */
  constructor(private store: Store) {}

  /**
   * [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks)
   */
  ngOnInit(): void {
    this.predictions$ = this.store.select(selectPredictions);
    this.activePrediction$ = this.store.select(selectActivePrediction);
    this.probabilitiesChartOrder$ = this.store.select(
      selectProbabilitiesChartOrder
    );
    this.preferredBarChartType$ = this.store.select(selectBarChartTypeResults);
    this.xaiClassInProcess$ = this.store.select(selectXaiClassInProcess);
    this.xaiPredictionInProcess$ = this.store.select(
      selectXaiPredictionInProcess
    );
    this.xaiClassVisible$ = this.store.select(selectXai);
  }
  /**
   * [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks)
   */
  ngOnDestroy(): void {
    this.store.dispatch(setActivePrediction({ activePrediction: null }));
  }
  /**
   * Dispatches a store action to set the active prediction
   * @param activePrediction Newly set active prediction
   */
  setActivePrediction(activePrediction: Prediction) {
    this.store.dispatch(setActivePrediction({ activePrediction }));
  }

  /**
   * Dispatches a store action to export the prediction result
   * @param prediction Prediction to export
   */
  exportPrediction(prediction: Prediction) {
    this.store.dispatch(exportPrediction({ prediction }));
  }

  /**
   * Dispatches a store action to set the visualization of probabilities
   * @param chartType Type of probabilities order
   */
  setProbabilitiesOrder(chartType: string) {
    this.store.dispatch(
      setProbabilitiesChartOrder({
        chartType: chartType as ProbabilitiesOrderEnum,
      })
    );
  }

  /**
   * Dispatches a store action to generate the [GradCAM](https://arxiv.org/abs/1610.02391) visualization for the specified prediction and class
   * @param xaiReference Contains reference to the prediction and class of interest
   */
  generateGradCam(xaiReference: XaiReference) {
    this.store.dispatch(generateGradCam({ xaiReference }));
  }

  /**
   * Dispatches a store action to show a [GradCAM](https://arxiv.org/abs/1610.02391) result for the specified prediction and class
   * @param xaiReference Contains reference to the prediction and class of interest
   */
  showGradCam(xaiReference: XaiReference) {
    this.store.dispatch(showGradCam({ xaiReference }));
  }
}
