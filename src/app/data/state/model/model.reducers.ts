import { createReducer, on } from '@ngrx/store';
import {
  loadModelSummaries,
  loadModelSummariesFailure,
  loadModelSummariesSuccess,
  setActiveModel,
  setModelFilterTerm,
} from './model.actions';
import { ModelState } from './model.state';
import { ModelSummary } from '../../schema/model-summary';

/**
 * Model's initial state
 */
const initialState: ModelState = {
  availableModels: [],
  activeModel: null,
  fetchingModelSummaries: false,
  modelFilterTerm: '',
};

/**
 * @internal
 * With the start of {@link "app/data/state/model/model.actions"!loadModelSummaries}, we set the flag, that indicates, that model loading is in progress, true.
 */
export const _fetchingFlagTrue = on(
  loadModelSummaries,
  (state: ModelState): ModelState => ({
    ...state,
    fetchingModelSummaries: true,
  })
);

/**
 * @internal
 * Action {@link "app/data/state/model/model.actions"!loadModelSummariesFailure} indicates a failure during model loading. We set the flag, that indicates that model loading is in progress, false.
 */
export const _fetchingFlagFalse = on(
  loadModelSummariesFailure,
  (state: ModelState): ModelState => ({
    ...state,
    fetchingModelSummaries: false,
  })
);

/**
 * @internal
 * Action {@link "app/data/state/model/model.actions"!loadModelSummariesSuccess} indicates successful model loading. We set the flag, that indicates that model loading is in progress, false and update the available models.
 */
export const _updateAvailableModels = on(
  loadModelSummariesSuccess,
  (state: ModelState, { availableModels }): ModelState => {
    const modelClasses = availableModels.map((m) =>
      m.classes.map((c) => c.name)
    );
    const models: ModelSummary[] = [];
    availableModels.forEach((m, index) => {
      models.push({ ...m, classNames: modelClasses[index] });
    });

    const activeModel: ModelSummary | undefined = models.find(
      (m) => m.id === state.activeModel?.id
    );

    if (activeModel) {
      return {
        ...state,
        activeModel,
        availableModels: models,
        fetchingModelSummaries: false,
      };
    }

    return {
      ...state,
      availableModels: models,
      fetchingModelSummaries: false,
    };
  }
);

/**
 * @internal
 * Action {@link "app/data/state/model/model.actions"!setModelFilterTerm} sends an updated value for the filter term. We write that value to the state.
 */
export const _filterModels = on(
  setModelFilterTerm,
  (state: ModelState, { filterTerm }): ModelState => ({
    ...state,
    modelFilterTerm: filterTerm,
  })
);
/**
 * @internal
 * Action {@link "app/data/state/model/model.actions"!setActiveModel} selects a model to show its details and evaluation, if it exists.
 */
export const _setActiveModel = on(
  setActiveModel,
  (state: ModelState, { activeModel }): ModelState => ({
    ...state,
    activeModel,
  })
);

/**
 * Reacts to actions in {@link "app/data/state/model/model.actions"}
 */
export const modelReducer = createReducer(
  initialState,
  _fetchingFlagTrue,
  _fetchingFlagFalse,
  _updateAvailableModels,
  _filterModels,
  _setActiveModel
);
