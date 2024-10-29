import { FormGroupState } from 'ngrx-forms';
import { ModelState } from './model/model.state';
import { SettingsState } from './settings/settings.state';
import { PredictState } from './predict/predict.state';
import { PredictHistoryState } from './predict-history/predict-history.state';
import { EvaluationState } from './evaluation/evaluation.state';

/**
 * The app state contains all sub-states.
 */
export interface AppState {
  /**
   * Model sub-state, see {@link "app/data/state/model/model.state"!ModelState}
   */
  model: ModelState;

  /**
   * Settings sub-state, see {@link "app/data/state/settings/settings.state"!SettingsState}.
   */
  settings: FormGroupState<SettingsState>;

  /**
   * Predict sub-state, see {@link "app/data/state/predict/predict.state"!PredictState}.
   */
  predict: FormGroupState<PredictState>;

  /**
   * Predict history sub-state, see {@link "app/data/state/predict-history/predict-history.state"!PredictHistoryState}.
   */
  predictHistory: PredictHistoryState;
  /**
   * Evaluation sub-state, see {@link "app/data/state/evaluation/evaluation.state"!EvaluationState}
   */
  evaluation: EvaluationState;
}
