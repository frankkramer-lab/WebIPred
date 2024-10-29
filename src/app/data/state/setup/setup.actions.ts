import { createAction, props } from '@ngrx/store';
import { ActionFailure } from '../../schema/action-failure';

/**
 * Action to trigger initial setup, for instance start fetching models from backend (see {@link "app/data/state/model/model.actions"!loadModelSummaries}).
 */
export const initApp = createAction('[Container Component] Initialize the app');
/**
 * If {@link "app/data/state/setup/setup.actions"!initApp} is successful, this action is triggered.
 */
export const initAppSuccess = createAction(
  '[Setup Effects] Initialize the app was successful'
);
/**
 * If {@link "app/data/state/setup/setup.actions"!initApp} fails, this action is triggered.
 */
export const initAppFailure = createAction(
  '[Setup Effects] Initialize the app was not successful',
  props<{ failedAction: ActionFailure }>()
);
