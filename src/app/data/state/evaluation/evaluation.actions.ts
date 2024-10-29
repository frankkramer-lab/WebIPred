import { createAction, props } from '@ngrx/store';
import { ModelEvaluation } from '../../schema/model-evaluation';
import { ActionFailure } from '../../schema/action-failure';
import { ConfusionMatrixModeEnum } from '../../../core/enum/confusion-matrix-mode.enum';

/**
 * Action to set the metric of interest
 */
export const setMetricOfInterest = createAction(
  '[Model Component] Set metric to display',
  props<{ metricKey: string }>()
);

/**
 * When a model is selected (see {@link "app/data/state/model/model.actions"!setActiveModel}), its evaluation is loaded. If it exists, the evaluation data is saved to this state.
 */
export const loadActiveModelEvaluationSuccess = createAction(
  '[Model Effects] Load active model evaluation success',
  props<{ data: { js: ModelEvaluation; py: ModelEvaluation } }>()
);

/**
 * When a model is selected (see {@link "app/data/state/model/model.actions"!setActiveModel}), its evaluation is loaded. If it does not exist, or loading failed, this action is triggered.
 */
export const loadActiveModelEvaluationFailure = createAction(
  '[Model Effects] Load active model evaluation failure',
  props<{ failedAction: ActionFailure }>()
);

/**
 * Action, to export the evaluation
 */
export const exportEvaluation = createAction(
  '[Models Component] Export evaluation'
);
/**
 * Action to reflect a failure during the {@link "app/data/state/evaluation/evaluation.actions"!exportEvaluation} action
 */
export const exportEvaluationFailure = createAction(
  '[Export Effects] Export evaluation failure',
  props<{ failedAction: ActionFailure }>()
);
/**
 * Action representing success during the {@link "app/data/state/evaluation/evaluation.actions"!exportEvaluation} action
 */
export const exportEvaluationSuccess = createAction(
  '[Export Effects] Export evaluation success'
);
/**
 * Action to update the current confusion matrix visualization preference.
 */
export const setConfusionMatrixMode = createAction(
  '[Evaluation Component] Set confusion matrix mode',
  props<{ mode: ConfusionMatrixModeEnum }>()
);
