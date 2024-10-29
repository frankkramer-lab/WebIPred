import { createReducer, on } from '@ngrx/store';
import {
  createFormGroupState,
  disable,
  enable,
  FormGroupState,
  onNgrxForms,
} from 'ngrx-forms';
import {
  discardSettingsFormChanges,
  editSettingsForm,
  submitSettingsForm,
} from './settings.actions';
import { SettingsState } from './settings.state';
import { environment } from '../../../../environments/environment';
import { ChartTypeEnum } from '../../../core/enum/chart-type.enum';

/**
 * Default value: fetchModelsInterval
 */
const defaultFetchModelsInterval = 30000;

/**
 * Settings' initial state. Since all properties have to be editable,
 * we represent them in a form state, using [ngrx-forms](https://ngrx-forms.readthedocs.io/en/master/)
 */
const initialState = disable(
  createFormGroupState<SettingsState>('form-settings', {
    fetchModelsInterval: defaultFetchModelsInterval,
    backendPath: environment.backendPath,
    chartTypeMetrics: ChartTypeEnum.VERTICAL,
    chartTypeResults: ChartTypeEnum.VERTICAL,
    settingsStateSnapshot: {
      fetchModelsInterval: defaultFetchModelsInterval,
      backendPath: environment.backendPath,
      chartTypeMetrics: ChartTypeEnum.VERTICAL,
      chartTypeResults: ChartTypeEnum.VERTICAL,
    },
  })
);

/**
 * Any form interaction will be handled automatically by [ngrx-forms](https://ngrx-forms.readthedocs.io/en/master/)
 */
export const _formsInteraction = onNgrxForms();

/**
 * To make changes to the settings form, we need to enable the form.
 */
export const _enableSettingsForm = on(
  editSettingsForm,
  (state: FormGroupState<SettingsState>) => {
    return enable(
      createFormGroupState<SettingsState>(initialState.id, { ...state.value })
    );
  }
);

/**
 * When the user submits changes to the settings, we lock the form and save the current value to the settings snapshot.
 */
export const _saveChangesToSettingsForm = on(
  submitSettingsForm,
  (state: FormGroupState<SettingsState>) => {
    return disable(
      createFormGroupState<SettingsState>(initialState.id, {
        ...state.value,
        settingsStateSnapshot: {
          fetchModelsInterval: state.value.fetchModelsInterval,
          backendPath: state.value.backendPath,
          chartTypeMetrics: state.value.chartTypeMetrics,
          chartTypeResults: state.value.chartTypeResults,
        },
      })
    );
  }
);

/**
 * When the user discards changes to the settings, we reset the state using the settings snapshot.
 */
export const _discardChangesToSettingsForm = on(
  discardSettingsFormChanges,
  (state: FormGroupState<SettingsState>) => {
    return disable(
      createFormGroupState<SettingsState>(initialState.id, {
        ...state.value,
        fetchModelsInterval:
          state.value.settingsStateSnapshot.fetchModelsInterval,
        backendPath: state.value.settingsStateSnapshot.backendPath,
        chartTypeMetrics: state.value.settingsStateSnapshot.chartTypeMetrics,
        chartTypeResults: state.value.settingsStateSnapshot.chartTypeResults,
      })
    );
  }
);

/**
 * Reacts to actions in {@link "app/data/state/settings/settings.actions"}
 */
export const settingsReducer = createReducer(
  initialState,
  _formsInteraction,
  _enableSettingsForm,
  _saveChangesToSettingsForm,
  _discardChangesToSettingsForm
);
