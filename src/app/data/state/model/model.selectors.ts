import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModelState } from './model.state';
import { ModelSummary } from '../../schema/model-summary';

/**
 * Select the entire {@link "app/data/state/model/model.state"!ModelState}
 */
export const selectModelState = createFeatureSelector<ModelState>('model');

/**
 * Select available models from {@link "app/data/state/model/model.state"!ModelState}
 */
export const selectAvailableModels = createSelector(
  selectModelState,
  (state: ModelState) => state.availableModels
);

/**
 * Select the current model filter term
 */
export const selectModelFilterTerm = createSelector(
  selectModelState,
  (state: ModelState) => state.modelFilterTerm
);
/**
 * Select the list of models, that seem to match the model filter term
 */
export const selectFilteredModels = createSelector(
  selectModelState,
  selectModelFilterTerm,
  (state: ModelState, filterTerm: string) =>
    state.availableModels.filter((a: ModelSummary) =>
      a.name.toLowerCase().includes(filterTerm.toLowerCase())
    )
);

/**
 * Select the flag, if models are being fetched, from {@link "app/data/state/model/model.state"!ModelState}
 */
export const selectIsFetchingModels = createSelector(
  selectModelState,
  (state: ModelState) => state.fetchingModelSummaries
);
/**
 * Select the model for which details are to be displayed
 */
export const selectActiveModel = createSelector(
  selectModelState,
  (state: ModelState) => state.activeModel
);
