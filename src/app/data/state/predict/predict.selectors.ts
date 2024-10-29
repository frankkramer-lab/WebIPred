import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { PredictState } from './predict.state';

/**
 * Select the entire {@link "app/data/state/predict/predict.state"!PredictState}
 */
export const selectPredictState =
  createFeatureSelector<FormGroupState<PredictState>>('predict');

/**
 * Select if a prediction is in progress
 */
export const selectIsPredictionInProgress = createSelector(
  selectPredictState,
  (state: FormGroupState<PredictState>) => state.value.predictInProgress
);

/**
 * Select the current prediction step
 */
export const selectPredictionStep = createSelector(
  selectPredictState,
  (state: FormGroupState<PredictState>) => state.value.step
);
