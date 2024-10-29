import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadModelSummariesFailure } from '../model/model.actions';
import { map } from 'rxjs';
import { initAppFailure, initAppSuccess } from '../setup/setup.actions';
import { predictFailure } from '../predict/predict.actions';
import { ToastService } from '../../../core/service/toast.service';
import {
  exportEvaluationFailure,
  loadActiveModelEvaluationFailure,
} from '../evaluation/evaluation.actions';
import {
  generateGradCam,
  generateGradCamFailure,
  generateGradCamSuccess,
} from '../predict-history/predict-history.actions';

/**
 * Class for toast-related effects
 */
@Injectable()
export class ToastEffects {
  /**
   * Effect, which shows a notification, if an error occurs during the prediction process.
   */
  predictionError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(predictFailure),
        map((action) => {
          const message =
            action.failedAction.failureDescription ?? 'Error during prediction';
          this.toastService.showDanger(message);
        })
      );
    },
    { dispatch: false }
  );

  /**
   * Effect, which shows a notification if loading the models via backend failed.
   */
  failedLoadingModelSummaries$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadModelSummariesFailure),
        map((action) => {
          const message =
            action.failedAction.failureDescription ?? 'Fetching models failed';
          this.toastService.showDanger(message);
        })
      );
    },
    { dispatch: false }
  );

  /**
   * Effect, which shows a notification, if app setup was successful.
   */
  initAppSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(initAppSuccess),
        map(() => {
          this.toastService.showSuccess(
            'App setup was successful! You can start predicting now.'
          );
        })
      );
    },
    {
      dispatch: false,
    }
  );

  /**
   * Effect, which shows a notification, if app setup failed.
   */
  initAppFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(initAppFailure),
        map((action) => {
          this.toastService.showDanger(
            `App setup failed! ${action.failedAction.failureDescription}`
          );
        })
      );
    },
    { dispatch: false }
  );
  /**
   * Effect, which shows a notification, if there is an error during the loading of an evaluation.
   */
  visualizeEvaluationError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadActiveModelEvaluationFailure),
        map((action) => {
          this.toastService.showWarn(
            `Loading evaluation failed! ${action.failedAction.failureDescription}`
          );
        })
      );
    },
    { dispatch: false }
  );
  /**
   * Effect, which shows a notification, if there is an error during the export of an evaluation.
   */
  exportEvaluationError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(exportEvaluationFailure),
        map((action) => {
          this.toastService.showDanger(
            `Exporting evaluation failed! ${action.failedAction.failureDescription}`
          );
        })
      );
    },
    { dispatch: false }
  );
  /**
   * Effect, which shows a notification, when the XAI process is started.
   */
  xaiStarted$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(generateGradCam),
        map(() => {
          this.toastService.showWarn('Starting GradCAM ...');
        })
      );
    },
    { dispatch: false }
  );

  /**
   * Effect, which shows a notification, if there is an error during the XAI process.
   */
  xaiFailed$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(generateGradCamFailure),
        map((action) => {
          this.toastService.showDanger(
            `GradCAM failed! ${action.failedAction.failureDescription}`
          );
        })
      );
    },
    { dispatch: false }
  );
  /**
   * Effect, which shows a notification, if and when the XAI process was successfully completed.
   */
  xaiSucceeded$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(generateGradCamSuccess),
        map(() => {
          this.toastService.showSuccess(`GradCAM complete!`);
        })
      );
    },
    { dispatch: false }
  );

  /**
   * Constructor
   * @param actions$ Necessary to dispatch actions
   * @param toastService Necessary to trigger toasts
   */
  constructor(private actions$: Actions, private toastService: ToastService) {}
}
