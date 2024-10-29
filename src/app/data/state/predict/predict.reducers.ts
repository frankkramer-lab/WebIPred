import {
  createFormGroupState,
  disable,
  enable,
  FormGroupState,
  onNgrxForms,
} from 'ngrx-forms';
import { PredictState } from './predict.state';
import { createReducer, on } from '@ngrx/store';
import { initAppSuccess } from '../setup/setup.actions';
import {
  resetNewPredictionForm,
  setModelSelection,
  setStep,
  predict,
} from './predict.actions';

/**
 * Prediction's initial state.
 */
const initialState: FormGroupState<PredictState> = disable(
  createFormGroupState<PredictState>('form-predict', {
    model: null,
    images: null,
    openCvAvailable: false,
    predictInProgress: false,
    step: 1,
  })
);

/**
 * Any form interaction will be handled automatically by [ngrx-forms](https://ngrx-forms.readthedocs.io/en/master/)
 */
export const _formsInteraction = onNgrxForms();

/**
 * If setting up [openCV](https://github.com/TechStark/opencv-js) is successful, we enable the prediction form and set the openCV availability flag.
 */
export const _setupSuccessful = on(
  initAppSuccess,
  (state: FormGroupState<PredictState>) => {
    return enable(
      createFormGroupState<PredictState>(initialState.id, {
        ...state.value,
        openCvAvailable: true,
      })
    );
  }
);

/**
 * The user defines, which model to predict with. We save that information to the state.
 */
export const _setModel = on(
  setModelSelection,
  (state: FormGroupState<PredictState>, { model }) => {
    return createFormGroupState<PredictState>(initialState.id, {
      ...state.value,
      model,
    });
  }
);

/**
 * Resetting the form requires resetting any values in the form. We simply re-apply the {@link initialState}'s value to all properties, except the openCV availability.
 */
export const _resetCreatePredictionForm = on(
  resetNewPredictionForm,
  (state: FormGroupState<PredictState>) => {
    return createFormGroupState<PredictState>(initialState.id, {
      ...initialState.value,
      openCvAvailable: state.value.openCvAvailable,
    });
  }
);

/**
 * On the start of the preprocessing, we indicate with a flag, that a prediction is in progress.
 */
export const _startPrediction = on(
  predict,
  (state: FormGroupState<PredictState>) => {
    return createFormGroupState<PredictState>(initialState.id, {
      ...state.value,
      predictInProgress: true,
    });
  }
);
/**
 * During the user's progress through the form to create a new prediction, we increase the track counter to adjust the GUI accordingly.
 */
export const _nextStep = on(
  setStep,
  (state: FormGroupState<PredictState>, { step }) => {
    return createFormGroupState<PredictState>(initialState.id, {
      ...state.value,
      step,
    });
  }
);

/**
 * Reacts to actions in {@link "app/data/state/predict/predict.actions"}
 */
export const predictReducer = createReducer(
  initialState,
  _formsInteraction,
  _setupSuccessful,
  _setModel,
  _resetCreatePredictionForm,
  _startPrediction,
  _nextStep
);
