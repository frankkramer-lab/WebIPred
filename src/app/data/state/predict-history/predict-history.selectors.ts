import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PredictHistoryState } from './predict-history.state';

/**
 * Select the entire {@link "app/data/state/predict-history/predict-history.state"!PredictHistoryState}
 */
export const selectPredictHistoryState =
  createFeatureSelector<PredictHistoryState>('predictHistory');

/**
 * Select all predictions that are still in process or completed.
 */
export const selectPredictions = createSelector(
  selectPredictHistoryState,
  (state: PredictHistoryState) => state.predictions
);

/**
 * Select the currently active prediction object.
 */
export const selectActivePrediction = createSelector(
  selectPredictHistoryState,
  (state: PredictHistoryState) => state.activePrediction
);

/**
 * Select the next id for a prediction
 */
export const selectNextPredictionId = createSelector(
  selectPredictHistoryState,
  (state: PredictHistoryState) => state.predictions.length
);
/**
 * Select the order in which a result's probabilities should be displayed in the chart
 */
export const selectProbabilitiesChartOrder = createSelector(
  selectPredictHistoryState,
  (state: PredictHistoryState) => state.probabilitiesChart
);
/**
 * Select which class is being processed for XAI
 */
export const selectXaiClassInProcess = createSelector(
  selectPredictHistoryState,
  (state: PredictHistoryState) => state.xaiClassInProcess
);
/**
 * Select which prediction is being processed for XAI
 */
export const selectXaiPredictionInProcess = createSelector(
  selectPredictHistoryState,
  (state: PredictHistoryState) => state.xaiPredictionInProcess
);
/**
 * Select the currently visible XAI image
 */
export const selectXai = createSelector(
  selectPredictHistoryState,
  (state: PredictHistoryState) => {
    const classIndex = state.xaiClassVisible;

    if (classIndex === undefined || classIndex === null) return null;

    if (state.activePrediction && state.activePrediction.xai) {
      const availableIndices = Object.keys(state.activePrediction.xai);

      if (!availableIndices.includes(classIndex.toString())) return null;
      return state.activePrediction.xai[classIndex.toString()];
    }
    return null;
  }
);
