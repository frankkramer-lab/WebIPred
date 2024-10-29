import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { SettingsState } from './settings.state';

/**
 * Select the entire {@link "app/data/state/settings/settings.state"!SettingsState}
 */
export const selectSettingsState =
  createFeatureSelector<FormGroupState<SettingsState>>('settings');

/**
 * Select the path to the backend
 */
export const selectBackendPath = createSelector(
  selectSettingsState,
  (state: FormGroupState<SettingsState>) => state.value.backendPath
);

/**
 * Select the interval, in which model summaries are being fetched from backend.
 */
export const selectFetchInterval = createSelector(
  selectSettingsState,
  (state: FormGroupState<SettingsState>) => state.value.fetchModelsInterval
);

/**
 * Select, if the user can make changes to the settings
 */
export const selectIsInEditing = createSelector(
  selectSettingsState,
  (state: FormGroupState<SettingsState>) => state.isEnabled
);
/**
 * Select the user's preferences for bar charts to display metrics
 */
export const selectBarChartTypeMetrics = createSelector(
  selectSettingsState,
  (state: FormGroupState<SettingsState>) => state.value.chartTypeMetrics
);
/**
 * Select the user's preferences for bar charts to display results
 */
export const selectBarChartTypeResults = createSelector(
  selectSettingsState,
  (state: FormGroupState<SettingsState>) => state.value.chartTypeResults
);
