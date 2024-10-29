import { createAction, props } from '@ngrx/store';
import { Prediction } from '../../schema/prediction';
import { ActionFailure } from '../../schema/action-failure';
import { ProbabilitiesOrderEnum } from '../../../core/enum/probabilities-order.enum';
import { XaiReference } from '../../schema/xai-reference';

/**
 * Action to select a prediction.
 */
export const setActivePrediction = createAction(
  '[Predict History Container] Set active prediction',
  props<{ activePrediction: Prediction | null }>()
);
/**
 * Action to export a prediction
 */
export const exportPrediction = createAction(
  '[Predict History] Prediction export',
  props<{ prediction: Prediction }>()
);
/**
 * If {@link "app/data/state/predict-history/predict-history.actions"!setActivePrediction} is successful, this action is triggered.
 */
export const exportPredictionSuccess = createAction(
  '[Export Effects] Prediction export success'
);
/**
 * If {@link "app/data/state/predict-history/predict-history.actions"!setActivePrediction} fails, this action is triggered.
 */
export const exportPredictionFailure = createAction(
  '[Export Effects] Prediction export failure',
  props<{ failedAction: ActionFailure }>()
);
/**
 * Action to change the order of probabilities in the results chart.
 */
export const setProbabilitiesChartOrder = createAction(
  '[Predict History] Set probabilities chart',
  props<{ chartType: ProbabilitiesOrderEnum }>()
);
/**
 * Action to generate a [GradCAM](https://arxiv.org/abs/1610.02391) markup for a prediction and class.
 */
export const generateGradCam = createAction(
  '[Predict History] Generate Grad CAM visualization for a class',
  props<{ xaiReference: XaiReference }>()
);
/**
 * If {@link "app/data/state/predict-history/predict-history.actions"!generateGradCamSuccess} is successful, this action is triggered.
 */
export const generateGradCamSuccess = createAction(
  '[Predict Effects] Generate Grad CAM visualization success',
  props<{ xaiReference: XaiReference; base64: string }>()
);
/**
 * If {@link "app/data/state/predict-history/predict-history.actions"!generateGradCamSuccess} fails, this action is triggered.
 */
export const generateGradCamFailure = createAction(
  '[Predict Effects] Generate Grad CAM visualization failure',
  props<{ failedAction: ActionFailure }>()
);
/**
 * Action to show a [GradCAM](https://arxiv.org/abs/1610.02391) visualization
 */
export const showGradCam = createAction(
  '[Predict History] Show Grad CAM visualization',
  props<{ xaiReference: XaiReference }>()
);
