import { EvaluationState } from './evaluation.state';
import { createReducer, on } from '@ngrx/store';
import { ChartItem } from '../../schema/chart-item';
import { ModelEvaluation } from '../../schema/model-evaluation';
import {
  loadActiveModelEvaluationFailure,
  loadActiveModelEvaluationSuccess,
  setConfusionMatrixMode,
  setMetricOfInterest,
} from './evaluation.actions';
import { MetricDescription } from '../../schema/metric-description';
import { ChartItemValue } from '../../schema/chart-item-value';
import { PerformanceRaw } from '../../schema/performance-raw';
import { PerformanceRawItem } from '../../schema/performance-raw-item';
import { ConfusionMatrixModeEnum } from '../../../core/enum/confusion-matrix-mode.enum';

const initialState: EvaluationState = {
  activeEvaluation: null,
  activeEvaluationJs: null,
  activeEvaluationPy: null,
  activeMetric: null,
  confusionMatrixMode: ConfusionMatrixModeEnum.ROWS,
};
/**
 * @internal
 * Local function to merge a JavaScript chart with its Python pendant.
 * @param chartPy Python charts
 * @param chartJs JavaScript charts
 * @param chartName Name of the chart to be merged
 */
export const mergeCharts = (
  chartPy: ChartItem[] | undefined,
  chartJs: ChartItem[] | undefined,
  chartName: string
): ChartItem[] => {
  const chart: ChartItem[] = [];
  if (!chartPy || !chartJs) return chart;

  for (let i = 0; i < chartPy.length; i++) {
    const py = chartPy[i];
    const js = chartJs.find((c) => c.name === py.name);

    if (!js) {
      console.warn(
        `Cannot merge chart ${chartName}! Did not find match for key ${py.name}`
      );
      return chart;
    }

    chart.push({ ...py, series: [...py.series].concat(js.series) });
  }
  return chart;
};

/**
 * @internal
 * Local function to merge CSV evaluation data among JavaScript and Python
 * @param rawPy Raw Python CSV data
 * @param rawJs Raw JavaScript CSV data
 */
export const mergeRaw = (
  rawPy: PerformanceRaw,
  rawJs: PerformanceRaw
): PerformanceRaw => {
  const performanceRaw: PerformanceRaw = {};
  const dataPy = Object.values(rawPy);
  const dataJs = Object.values(rawJs);

  const availableClasses = new Set(dataPy.map((d) => d.class));
  const availableMetrics = new Set(dataPy.map((d) => d.metric));
  let count = 0;

  availableClasses.forEach((c: number) => {
    availableMetrics.forEach((metric: string) => {
      count += 1;

      const scoreJs = dataJs.find((a) => a.class === c && a.metric === metric);
      const scorePy = dataPy.find((a) => a.class === c && a.metric === metric);

      if (!scoreJs || !scorePy) {
        console.warn(
          `Error during merging CSV data! Skipping metric "${metric}" for class ${c}`
        );
      } else {
        performanceRaw[count.toString()] = {
          metric,
          class: c,
          score_js: (scoreJs as PerformanceRawItem).score,
          score_python: (scorePy as PerformanceRawItem).score,
        };
      }
    });
  });

  return performanceRaw;
};

/**
 * @internal
 * Local function to merge all charts among JavaScript and Python
 * @param evalPy Python evaluation, containing all Python charts
 * @param evalJs JavaScript evaluation, containing all JavaScript charts
 */
export const mergeAllCharts = (
  evalPy: ModelEvaluation,
  evalJs: ModelEvaluation
): ModelEvaluation => {
  if (!evalJs || !evalPy) return {};

  // Merge both evaluation objects into one
  const chartKeys = Object.keys(evalPy);
  const evaluationWrapper: any = {};

  for (let i = 0; i < chartKeys.length; i++) {
    const key = chartKeys[i];
    const py = evalPy[key as keyof ModelEvaluation];
    const js = evalJs[key as keyof ModelEvaluation];

    if (key !== 'raw' && key !== 'distribution') {
      evaluationWrapper[key] = mergeCharts(
        py as ChartItem[],
        js as ChartItem[],
        key
      );
    }
  }

  return {
    accuracy: evaluationWrapper.accuracy ?? [],
    confusion_matrix_all: evaluationWrapper.confusion_matrix_all ?? [],
    confusion_matrix_cols: evaluationWrapper.confusion_matrix_cols ?? [],
    confusion_matrix_raw: evaluationWrapper.confusion_matrix_raw ?? [],
    confusion_matrix_rows: evaluationWrapper.confusion_matrix_rows ?? [],
    auc: evaluationWrapper.auc ?? [],
    distribution: evalPy.distribution, // no merging
    duration: evaluationWrapper.duration ?? [],
    f1: evaluationWrapper.f1 ?? [],
    fdr: evaluationWrapper.fdr ?? [],
    fnr: evaluationWrapper.fnr ?? [],
    fpr: evaluationWrapper.fpr ?? [],
    precision: evaluationWrapper.precision ?? [],
    raw: mergeRaw(evalPy.raw ?? {}, evalJs.raw ?? {}),
    recall: evaluationWrapper.recall ?? [],
    roc: evaluationWrapper.roc ?? [],
    specificity: evaluationWrapper.specificity ?? [],
  };
};

/**
 * @internal
 * Reacts to the {@link "app/data/state/evaluation/evaluation.actions"!loadActiveModelEvaluationFailure} action and resets any metric selection
 */
export const _resetModelEvaluation = on(
  loadActiveModelEvaluationFailure,
  (state: EvaluationState): EvaluationState => ({
    ...state,
    activeMetric: null,
    activeEvaluation: null,
    activeEvaluationPy: null,
    activeEvaluationJs: null,
  })
);

/**
 * @internal
 * Reacts to the {@link "app/data/state/evaluation/evaluation.actions"!loadActiveModelEvaluationSuccess} action: The successfully loaded evaluations are stored and all charts are merged for visualization purposes.
 */
export const _setActiveModelEvaluation = on(
  loadActiveModelEvaluationSuccess,
  (state: EvaluationState, { data }): EvaluationState => {
    const metricsPython = Object.keys(data.py);
    const metricsJs = Object.keys(data.js);

    if (metricsJs.filter((a) => !metricsPython.includes(a)).length > 0) {
      console.warn('Metrics for JS and Python do not align!');
    }
    const activeEvaluation = mergeAllCharts(data.py, data.js);

    return {
      ...state,
      activeEvaluationPy: { ...data.py },
      activeEvaluationJs: { ...data.js },
      activeEvaluation,
    };
  }
);

/**
 * @internal
 * Reacts to the {@link "app/data/state/evaluation/evaluation.actions"!setMetricOfInterest} action, by setting charts for the selected metric.
 */
export const _setActiveMetric = on(
  setMetricOfInterest,
  (state: EvaluationState, { metricKey }): EvaluationState => {
    if (
      !state.activeEvaluation ||
      !state.activeEvaluation[metricKey as keyof ModelEvaluation]
    ) {
      console.warn(`Cannot set metric "${metricKey}": No such metric.`);
      return { ...state };
    }

    const evalTotal = state.activeEvaluation;
    const evalPy = state.activeEvaluationPy;
    const evalJs = state.activeEvaluationJs;

    const activeMetric: MetricDescription = {
      chartGrouped:
        evalTotal && evalTotal[metricKey as keyof ModelEvaluation]
          ? (evalTotal[metricKey as keyof ModelEvaluation] as ChartItem[])
          : ([] as ChartItem[]),
      chartJs:
        evalJs && evalJs[metricKey as keyof ModelEvaluation]
          ? (evalJs[metricKey as keyof ModelEvaluation] as ChartItemValue[])
          : ([] as ChartItemValue[]),
      chartPy:
        evalPy && evalPy[metricKey as keyof ModelEvaluation]
          ? (evalPy[metricKey as keyof ModelEvaluation] as ChartItemValue[])
          : ([] as ChartItemValue[]),
      key: metricKey,
    };
    return {
      ...state,
      activeMetric,
    };
  }
);
/**
 * @internal
 * Reacts to the {@link "app/data/state/evaluation/evaluation.actions"!setConfusionMatrixMode} action, by updating the value in store.
 */
export const _setConfusionMatrixMode = on(
  setConfusionMatrixMode,
  (state: EvaluationState, { mode }): EvaluationState => ({
    ...state,
    confusionMatrixMode: mode,
  })
);

/**
 * Reacts to actions in {@link "app/data/state/evaluation/evaluation.actions"}
 */
export const evaluationReducer = createReducer(
  initialState,
  _resetModelEvaluation,
  _setActiveModelEvaluation,
  _setActiveMetric,
  _setConfusionMatrixMode
);
