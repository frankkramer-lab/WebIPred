import { createAction, props } from '@ngrx/store';
import { ActionFailure } from '../../schema/action-failure';
import { ModelSummary } from '../../schema/model-summary';

/**
 * Calling the {@link loadModelSummaries} action in a cycle is not allowed, this bridge action simply calls the {@link loadModelSummaries} after the timer has ended.
 */
export const bridge = createAction(
  '[Model Effects] Bridge the gap between timer ending and re-starting the timer'
);

/**
 * Action to load summaries of available models. This action is being called regularly.
 */
export const loadModelSummaries = createAction(
  '[Model Effects] Fetching summaries of available models regularly'
);

/**
 * If {@link loadModelSummaries} is successful, this action carries the list of fetched model summaries as list of {@link "app/data/schema/model-summary"!ModelSummary}
 */
export const loadModelSummariesSuccess = createAction(
  '[Model Effects] Success: Fetching summaries of available models',
  props<{ availableModels: ModelSummary[] }>()
);

/**
 * If {@link loadModelSummaries} is not successful, this action carries information about the most likely failure reason as instance of {@link "app/core/enum/failure-reason.enum"!FailureReason}
 */
export const loadModelSummariesFailure = createAction(
  '[Model Effects] Failure: Fetching summaries of available models',
  props<{ failedAction: ActionFailure }>()
);
/**
 * Action to set the value of the filter term. Selecting models with the {@link "app/data/state/model/model.selectors"!selectAvailableModels} selector will return all models,
 * but selecting models with the {@link "app/data/state/model/model.selectors"!selectFilteredModels} selector will return only matches to the filter term.
 */
export const setModelFilterTerm = createAction(
  '[Predict Component] Set model filter term',
  props<{ filterTerm: string }>()
);

/**
 * Action to copy a model's ID to clipboard.
 */
export const copyModelId = createAction(
  '[Predict New Component] Copy model ID to clipboard',
  props<{ modelId: number }>()
);
/**
 * Action to show details for one model in the models overview
 */
export const setActiveModel = createAction(
  '[Models Component] Set active model',
  props<{ activeModel: ModelSummary }>()
);
