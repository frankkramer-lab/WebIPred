import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { modelReducer } from './model/model.reducers';
import { settingsReducer } from './settings/settings.reducers';
import { predictReducer } from './predict/predict.reducers';
import { predictHistoryReducer } from './predict-history/predict-history.reducers';
import { evaluationReducer } from './evaluation/evaluation.reducers';

/**
 * For each sub-state in {@link "app/data/state/app.state"!AppState}, there has to be a reducer
 */
export const reducers: ActionReducerMap<AppState> = {
  /**
   * Reducer for the model sub-state, see {@link "app/data/state/model/model.reducers"!modelReducer}
   */
  model: modelReducer,

  /**
   * Reducer for the settings sub-state, see {@link "app/data/state/settings/settings.reducers"!settingsReducer}
   */
  settings: settingsReducer,

  /**
   * Reducer for the predict sub-state, see {@link "app/data/state/predict/predict.reducers"!predictReducer}
   */
  predict: predictReducer,

  /**
   * Reducer for the predict history sub-state, see {@link "app/data/state/predict-history/predict-history.reducers"!predictHistoryReducer}
   */
  predictHistory: predictHistoryReducer,
  /**
   * Reducer for the evaluation sub-state, see {@link "app/data/state/evaluation/evaluation.reducers"!evaluationReducer}
   */
  evaluation: evaluationReducer,
};
