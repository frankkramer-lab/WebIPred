import { createAction, props } from '@ngrx/store';
import { ModelSummary } from '../../schema/model-summary';
import { Prediction } from '../../schema/prediction';
import { ActionFailure } from '../../schema/action-failure';

/**
 * Action to select a model for prediction
 */
export const setModelSelection = createAction(
  '[Predict New Component] Set model for the prediction',
  props<{ model: ModelSummary }>()
);

/**
 * Tracks the user's progress through the form to create a new prediction
 */
export const setStep = createAction(
  '[Predict New Component] Set the step of the prediction form',
  props<{ step: number }>()
);

/**
 * Action to reset the prediction form
 */
export const resetNewPredictionForm = createAction(
  '[Predict New Component] Reset form to create a new prediction'
);

/**
 * Action to start a prediction. That includes preprocessing by creating [openCV](https://github.com/TechStark/opencv-js) matrices, resizing and standardization according to the model's requirements.
 */
export const predict = createAction(
  '[Predict New Component] Start preprocessing for a prediction',
  props<{ predictions: Prediction[] }>()
);

/**
 * Action that indicates the end of the prediction process.
 */
export const predictSuccess = createAction(
  '[Predict Effects] Predictions are finished',
  props<{ predictions: Prediction[] }>()
);
/**
 * Action to describe an error that occurs during preprocessing or prediction.
 */
export const predictFailure = createAction(
  '[Predict Effects] Error during preprocessing or prediction',
  props<{ failedAction: ActionFailure }>()
);
