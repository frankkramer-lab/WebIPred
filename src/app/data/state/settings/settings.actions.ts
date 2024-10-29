import { createAction } from '@ngrx/store';

/**
 * Action to make changes to the settings form.
 */
export const editSettingsForm = createAction(
  '[Settings Component] Enable the settings form to allow user-made changes'
);

/**
 * Action to submit changes to the settings form.
 */
export const submitSettingsForm = createAction(
  '[Settings Component] Disable the settings form to disallow user-made changes'
);

/**
 * Action to discard changes to the settings form.
 */
export const discardSettingsFormChanges = createAction(
  '[Settings Component] Discard changes made to the settings form'
);
