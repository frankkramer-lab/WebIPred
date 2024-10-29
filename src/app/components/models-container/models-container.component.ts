import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModelSummary } from '../../data/schema/model-summary';
import { Observable } from 'rxjs';
import {
  selectActiveModel,
  selectFilteredModels,
  selectModelFilterTerm,
} from '../../data/state/model/model.selectors';
import {
  copyModelId,
  setActiveModel,
  setModelFilterTerm,
} from '../../data/state/model/model.actions';
import { ChartTypeEnum } from '../../core/enum/chart-type.enum';
import { selectBarChartTypeMetrics } from '../../data/state/settings/settings.selectors';
import { MetricDescription } from '../../data/schema/metric-description';
import {
  selectActiveEvaluation,
  selectActiveEvaluationMetric,
  selectConfusionMatrixMode,
  selectMetricDistribution,
  selectMetricDuration,
} from '../../data/state/evaluation/evaluation.selectors';
import { ModelEvaluation } from '../../data/schema/model-evaluation';
import {
  exportEvaluation,
  setConfusionMatrixMode,
  setMetricOfInterest,
} from '../../data/state/evaluation/evaluation.actions';
import { ConfusionMatrixModeEnum } from '../../core/enum/confusion-matrix-mode.enum';

/**
 * Wrapper component for {@link "app/components/models/models.component"!ModelsComponent}
 */
@Component({
  selector: 'app-models-container',
  templateUrl: './models-container.component.html',
  styleUrls: ['./models-container.component.scss'],
})
export class ModelsContainerComponent implements OnInit {
  /**
   * Observable holding list of available models
   */
  availableModels$!: Observable<ModelSummary[]>;
  /**
   * Observable holding currently selected model
   */
  activeModel$!: Observable<ModelSummary | null>;
  /**
   * Observable holding the currently selected model's evaluation
   */
  activeModelEvaluation$!: Observable<ModelEvaluation | null>;
  /**
   * Observable holding the term to filter available models by
   */
  filterTerm$!: Observable<string>;
  /**
   * Observable holding the metric, which is displayed for the currently active model's evaluation
   */
  activeEvaluationMetric$!: Observable<MetricDescription | null>;
  /***
   * Observable holding selected model's evaluation class distribution
   */
  metricDistribution$!: Observable<MetricDescription | null>;
  /**
   * Observable holding selected model's evaluation duration
   */
  metricDuration$!: Observable<MetricDescription | null>;
  /**
   * Observable holding user's bar chart preference
   */
  barChartType$!: Observable<ChartTypeEnum>;
  /**
   * Observable holding user's confusion matrix preference
   */
  confusionMatrixType$!: Observable<ConfusionMatrixModeEnum>;

  /**
   * Constructor
   * @param store Necessary to select relevant observables
   */
  constructor(private store: Store) {}

  /**
   * [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks)
   */
  ngOnInit(): void {
    this.availableModels$ = this.store.select(selectFilteredModels);
    this.activeModel$ = this.store.select(selectActiveModel);
    this.activeModelEvaluation$ = this.store.select(selectActiveEvaluation);
    this.filterTerm$ = this.store.select(selectModelFilterTerm);
    this.activeEvaluationMetric$ = this.store.select(
      selectActiveEvaluationMetric
    );
    this.metricDistribution$ = this.store.select(selectMetricDistribution);
    this.metricDuration$ = this.store.select(selectMetricDuration);
    this.barChartType$ = this.store.select(selectBarChartTypeMetrics);
    this.confusionMatrixType$ = this.store.select(selectConfusionMatrixMode);
  }

  /**
   * Dispatches a store action to update the model selection
   * @param activeModel Newly selected model
   */
  setActiveModel(activeModel: ModelSummary) {
    this.store.dispatch(setActiveModel({ activeModel }));
  }

  /**
   * Dispatches a store action to filter the list of available models
   * @param filterTerm New filter term
   */
  filterModels(filterTerm: string) {
    this.store.dispatch(setModelFilterTerm({ filterTerm }));
  }

  /**
   * Dispatches a store action to copy the model's ID
   * @param modelId ID to copy
   */
  copyModelId(modelId: number) {
    this.store.dispatch(copyModelId({ modelId }));
  }

  /**
   * Dispatches a store action to show a new metric
   * @param metricKey Newly selected metric
   */
  setMetric(metricKey: string) {
    this.store.dispatch(setMetricOfInterest({ metricKey }));
  }

  /**
   * Dispatches a store action to export the evaluation
   */
  exportEvaluation() {
    this.store.dispatch(exportEvaluation());
  }

  /**
   * Dispatches a store action to change the user's confusion matrix preference
   * @param mode New confusion matrix preference
   */
  changeConfusionMatrixMode(mode: string) {
    this.store.dispatch(
      setConfusionMatrixMode({ mode: mode as ConfusionMatrixModeEnum })
    );
  }
}
