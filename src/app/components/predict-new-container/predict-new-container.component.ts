import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModelSummary } from '../../data/schema/model-summary';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { PredictState } from '../../data/state/predict/predict.state';
import { selectPredictState } from '../../data/state/predict/predict.selectors';
import {
  copyModelId,
  setModelFilterTerm,
} from '../../data/state/model/model.actions';
import {
  resetNewPredictionForm,
  setModelSelection,
  setStep,
  predict,
} from '../../data/state/predict/predict.actions';
import { Prediction } from '../../data/schema/prediction';
import { selectNextPredictionId } from '../../data/state/predict-history/predict-history.selectors';
import {
  selectFilteredModels,
  selectModelFilterTerm,
} from '../../data/state/model/model.selectors';

/**
 * Wrapper component for {@link "app/components/predict-new/predict-new.component"!PredictNewComponent}
 */
@Component({
  selector: 'app-predict-new-container',
  templateUrl: './predict-new-container.component.html',
  styleUrls: ['./predict-new-container.component.scss'],
})
export class PredictNewContainerComponent implements OnInit {
  /**
   * Observable holding the [NgRx-forms](https://github.com/MrWolfZ/ngrx-forms) form state
   */
  predictForm$!: Observable<FormGroupState<PredictState>>;
  /**
   * Observable holding the list of all available models
   */
  availableModels$!: Observable<ModelSummary[]>;
  /**
   * Observable holding the next prediction ID to assign
   */
  predictionId$!: Observable<number>;
  /**
   * Observable holding the current term to filter available models by
   */
  modelFilterTerm$!: Observable<string>;

  /**
   * Constructor
   * @param store Necessary to select data from store
   */
  constructor(private store: Store) {}

  /**
   * [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks)
   */
  ngOnInit(): void {
    this.predictForm$ = this.store.select(selectPredictState);
    this.availableModels$ = this.store.select(selectFilteredModels);
    this.predictionId$ = this.store.select(selectNextPredictionId);
    this.modelFilterTerm$ = this.store.select(selectModelFilterTerm);
    this.store.dispatch(resetNewPredictionForm());
  }

  /**
   * Dispatches a store action to set the current model filter term
   * @param filterTerm Newly set model filter term
   */
  setFilterTerm(filterTerm: string) {
    this.store.dispatch(setModelFilterTerm({ filterTerm }));
  }

  /**
   * Dispatches a store action to set the currently active model
   * @param model Newly selected model
   */
  setModel(model: ModelSummary) {
    this.store.dispatch(setModelSelection({ model }));
  }

  /**
   * Dispatches a store action to copy the model's ID
   * @param modelId Model's ID
   */
  copyModelId(modelId: number) {
    this.store.dispatch(copyModelId({ modelId }));
  }

  /**
   * Dispatches a store action to reset the prediction form state
   */
  resetNewPredictionForm() {
    this.store.dispatch(resetNewPredictionForm());
  }

  /**
   * Dispatches a store action to start predicting the selected images
   * @param predictions List of predictions containing selected images
   */
  startPrediction(predictions: Prediction[]) {
    this.store.dispatch(predict({ predictions }));
  }

  /**
   * Dispatches a store action to set the current step
   * @param step Current step
   */
  changeStep(step: number) {
    this.store.dispatch(setStep({ step }));
  }
}
