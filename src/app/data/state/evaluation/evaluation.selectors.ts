import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EvaluationState } from './evaluation.state';
import { MetricDescription } from '../../schema/metric-description';
import { ModelEvaluation } from '../../schema/model-evaluation';
import { ChartItem } from '../../schema/chart-item';
import { ChartItemValue } from '../../schema/chart-item-value';
import { ConfusionMatrixModeEnum } from '../../../core/enum/confusion-matrix-mode.enum';

/**
 * Select the whole evaluation state
 */
export const selectEvaluationState =
  createFeatureSelector<EvaluationState>('evaluation');

/**
 * Select the currently active evaluation
 */
export const selectActiveEvaluation = createSelector(
  selectEvaluationState,
  (state: EvaluationState) => state.activeEvaluation
);

/**
 * Select the current confusion matrix preference, see {@link "app/core/enum/confusion-matrix-mode.enum"!ConfusionMatrixModeEnum} for details
 */
export const selectConfusionMatrixMode = createSelector(
  selectEvaluationState,
  (state: EvaluationState) => state.confusionMatrixMode
);

/**
 * Select the selected metric to display
 */
export const selectActiveEvaluationMetric = createSelector(
  selectEvaluationState,
  selectConfusionMatrixMode,
  (state: EvaluationState, confusionMatrixMode: ConfusionMatrixModeEnum) => {
    let metric: any | null = null;
    if (!state.activeMetric) return metric;

    const key = state.activeMetric.key;
    const evalJs = state.activeEvaluationJs;
    const evalPy = state.activeEvaluationPy;
    const evalAll = state.activeEvaluation;

    if (key.startsWith('confusion_matrix')) {
      let cmKey = 'confusion_matrix';
      switch (confusionMatrixMode) {
        case ConfusionMatrixModeEnum.ABSOLUTE:
          cmKey = `${cmKey}_raw`;
          break;
        case ConfusionMatrixModeEnum.RELATIVE:
          cmKey = `${cmKey}_all`;
          break;
        case ConfusionMatrixModeEnum.COLS:
          cmKey = `${cmKey}_cols`;
          break;
        case ConfusionMatrixModeEnum.ROWS:
        default:
          cmKey = `${cmKey}_rows`;
          break;
      }
      metric = {
        key: cmKey,
        chartJs: evalJs ? evalJs[cmKey as keyof ModelEvaluation] : null,
        chartPy: evalPy ? evalPy[cmKey as keyof ModelEvaluation] : null,
        chartGrouped: evalAll ? evalAll[cmKey as keyof ModelEvaluation] : null,
      };
    } else {
      metric = {
        key,
        chartJs: evalJs ? evalJs[key as keyof ModelEvaluation] : null,
        chartPy: evalPy ? evalPy[key as keyof ModelEvaluation] : null,
        chartGrouped: evalAll ? evalAll[key as keyof ModelEvaluation] : null,
      };
    }

    return metric as MetricDescription;
  }
);
/**
 * Select the class distribution chart for the selected model, if it exists
 */
export const selectMetricDistribution = createSelector(
  selectEvaluationState,
  (state: EvaluationState) => {
    const metric =
      state.activeEvaluationJs && state.activeEvaluationJs.distribution
        ? state.activeEvaluationJs.distribution
        : state.activeEvaluationPy && state.activeEvaluationPy.distribution
        ? state.activeEvaluationPy.distribution
        : null;

    if (!metric) return null;

    return {
      key: 'distribution',
      chartPy: metric as ChartItemValue[],
      chartJs: metric as ChartItemValue[],
    } as MetricDescription;
  }
);
/**
 * Select the evaluation duration chart for the selected model, if it exists
 */
export const selectMetricDuration = createSelector(
  selectActiveEvaluation,
  (metric: ModelEvaluation | null) => {
    if (!metric || !metric.duration) return null;
    return {
      key: 'duration',
      chartGrouped: metric.duration as ChartItem[],
    } as MetricDescription;
  }
);
