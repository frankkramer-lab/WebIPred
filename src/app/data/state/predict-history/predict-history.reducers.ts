import { PredictHistoryState } from './predict-history.state';
import { createReducer, on } from '@ngrx/store';
import { predictSuccess, predict } from '../predict/predict.actions';
import {
  generateGradCam,
  generateGradCamFailure,
  generateGradCamSuccess,
  setActivePrediction,
  setProbabilitiesChartOrder,
  showGradCam,
} from './predict-history.actions';
import { ChartItemValue } from '../../schema/chart-item-value';
import { Prediction } from '../../schema/prediction';
import { ProbabilitiesOrderEnum } from '../../../core/enum/probabilities-order.enum';

/**
 * Local function to build a chart for the given prediction's result
 * @param prediction Prediction, whose result should be visualized in a chart
 * @param mode Probabilities order
 */
export const buildChart = (
  prediction: Prediction,
  mode: ProbabilitiesOrderEnum
): ChartItemValue[] => {
  const chart: ChartItemValue[] = [];
  const classNames = prediction.model.classNames;
  const probabilities = prediction.result;

  if (!probabilities) return chart;

  for (let i = 0; i < probabilities.length; i++) {
    chart.push({
      name: classNames[i],
      value: probabilities[i],
    });
  }

  if (mode === ProbabilitiesOrderEnum.BY_PROBABILITY_DESC) {
    chart.sort((a, b) => (a.value < b.value ? 1 : -1));
  } else if (mode === ProbabilitiesOrderEnum.BY_PROBABILITY_ASC) {
    chart.sort((a, b) => (a.value < b.value ? -1 : 1));
  }

  return chart;
};

/**
 * Prediction history's initial state.
 */
const initialState: PredictHistoryState = {
  predictions: [],
  activePrediction: null,
  probabilitiesChart: ProbabilitiesOrderEnum.BY_NAME,
  xaiPredictionInProcess: null,
  xaiClassInProcess: null,
  xaiClassVisible: null,
};

/**
 * When the user starts the prediction of one or multiple images, we dispatch the action {@link "app/data/state/predict/predict.actions"!startPrediction}.
 * This prediction is then pushed into the list of ongoing or finished predictions in this state.
 */
export const _addPrediction = on(
  predict,
  (state: PredictHistoryState, { predictions }): PredictHistoryState => {
    const existingPredictions = [...state.predictions]
      .concat(predictions)
      .sort((a, b) => (a.createdOn < b.createdOn ? 1 : -1));
    return { ...state, predictions: existingPredictions };
  }
);
/**
 * When a prediction is completed (see {@link "app/data/state/predict/predict.actions"!finishPrediction}), we update the prediction item in the state.
 */
export const _addPredictionResult = on(
  predictSuccess,
  (state: PredictHistoryState, { predictions }): PredictHistoryState => {
    const existingPredictions = [...state.predictions];
    const activePredictionId = state.activePrediction
      ? state.activePrediction.id
      : null;

    predictions.forEach((prediction) => {
      const resultChartByClass = buildChart(
        prediction,
        ProbabilitiesOrderEnum.BY_NAME
      );
      const resultChartByProbabilityDesc = buildChart(
        prediction,
        ProbabilitiesOrderEnum.BY_PROBABILITY_DESC
      );
      const resultChartByProbabilityAsc = buildChart(
        prediction,
        ProbabilitiesOrderEnum.BY_PROBABILITY_ASC
      );
      const predictionIndex = existingPredictions.findIndex(
        (p) => p.id === prediction.id
      );

      const newPrediction = {
        ...{
          ...prediction,
          resultChartByProbabilityDesc,
          resultChartByProbabilityAsc,
          resultChartByClass,
        },
        inProcessing: false,
      };

      existingPredictions.splice(predictionIndex, 1, newPrediction);
    });

    const newActivePrediction =
      activePredictionId === null
        ? null
        : existingPredictions.find(
            (p: Prediction) => p.id === activePredictionId
          );
    if (newActivePrediction) {
      return {
        ...state,
        activePrediction: { ...newActivePrediction },
        predictions: existingPredictions,
      };
    }
    return { ...state, predictions: existingPredictions };
  }
);
/**
 * User can select a prediction of interest in the prediction history. The selected element will become the active prediction.
 */
export const _setActivePrediction = on(
  setActivePrediction,
  (state: PredictHistoryState, { activePrediction }): PredictHistoryState => ({
    ...state,
    activePrediction,
    xaiClassVisible: null,
  })
);
/**
 * Set the order for probabilities in the results chart
 */
export const _setProbabilitiesChartOrder = on(
  setProbabilitiesChartOrder,
  (state: PredictHistoryState, { chartType }): PredictHistoryState => ({
    ...state,
    probabilitiesChart: chartType,
  })
);
/**
 * When the generation of a [GradCAM](https://arxiv.org/abs/1610.02391) visualization starts, we store the reference in the state.
 */
export const _generateXai = on(
  generateGradCam,
  (state: PredictHistoryState, { xaiReference }): PredictHistoryState => ({
    ...state,
    xaiClassInProcess: xaiReference.classId,
    xaiPredictionInProcess: xaiReference.predictionId,
  })
);

/**
 * If the [GradCAM](https://arxiv.org/abs/1610.02391) visualization fails, we reset the references in the state.
 */
export const _xaiFailed = on(
  generateGradCamFailure,
  (state: PredictHistoryState): PredictHistoryState => ({
    ...state,
    xaiClassInProcess: null,
    xaiPredictionInProcess: null,
  })
);
/**
 * If the [GradCAM](https://arxiv.org/abs/1610.02391) visualization is complete, we update the prediction with the generated image.
 */
export const _addXaiResult = on(
  generateGradCamSuccess,
  (
    state: PredictHistoryState,
    { xaiReference, base64 }
  ): PredictHistoryState => {
    const predictionId = state.predictions.findIndex(
      (p) => p.id === xaiReference.predictionId
    );
    const prediction = state.predictions[predictionId];

    if (!prediction) return { ...state };

    const xai = prediction.xai ? { ...prediction.xai } : {};

    xai[xaiReference.classId] = base64;

    const predictions = [
      ...state.predictions.slice(0, predictionId),
      { ...prediction, xai },
      ...state.predictions.slice(predictionId + 1),
    ];

    if (
      state.activePrediction &&
      state.activePrediction.id === xaiReference.predictionId
    ) {
      return {
        ...state,
        xaiClassInProcess: null,
        xaiPredictionInProcess: null,
        predictions,
        activePrediction: { ...state.activePrediction, xai },
      };
    }

    return {
      ...state,
      xaiClassInProcess: null,
      xaiPredictionInProcess: null,
      predictions,
    };
  }
);
/**
 * If a [GradCAM](https://arxiv.org/abs/1610.02391) visualization should be displayed, we save the class's ID to the state.
 */
export const _visualizeXai = on(
  showGradCam,
  (state: PredictHistoryState, { xaiReference }): PredictHistoryState => ({
    ...state,
    xaiClassVisible: xaiReference.classId,
  })
);

/**
 * Reacts to actions in {@link "app/data/state/predict-history/predict-history.actions"}
 */
export const predictHistoryReducer = createReducer(
  initialState,
  _addPrediction,
  _addPredictionResult,
  _setActivePrediction,
  _setProbabilitiesChartOrder,
  _generateXai,
  _xaiFailed,
  _addXaiResult,
  _visualizeXai
);
