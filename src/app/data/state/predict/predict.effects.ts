import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { predictSuccess, predictFailure, predict } from './predict.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { PredictService } from '../../../core/service/predict.service';
import { environment } from '../../../../environments/environment';
import { Prediction } from '../../schema/prediction';
import { WorkerResult } from '../../schema/worker-result';
import { Store } from '@ngrx/store';

/**
 * Effects related to the creation of predictions
 */
@Injectable()
export class PredictEffects {
  /**
   * Effect to predict a number of images.
   * Returns:
   * <ul>
   *  <li>{@link "app/data/state/predict/predict.actions"!predictSuccess}, if the call is successful</li>
   *  <li>{@link "app/data/state/predict/predict.actions"!predictFailure}, if the call is not successful</li>
   * </ul>
   */
  predicting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(predict),
      mergeMap((action) => {
        // start worker with the given list of predictions

        if (action.predictions.length === 0) {
          throwError(() => 'There is nothing to predict');
        }

        const model = action.predictions[0].model;

        const modelLink = `${environment.backendPath}${
          environment.backendPath.endsWith('/') ? '' : '/'
        }${model.links.convertedModel}`;

        return this.predictService.start(modelLink, action.predictions).pipe(
          map((data: WorkerResult) => {
            const predictionsWithResults: Prediction[] = [];

            for (let i = 0; i < action.predictions.length; i++) {
              predictionsWithResults.push({
                ...action.predictions[i],
                result: data.probabilities[i],
              });
            }

            return predictSuccess({
              predictions: predictionsWithResults,
            });
          }),
          catchError((e) => throwError(() => e.message))
        );

        // return observable with results
      }),
      catchError((e) => {
        console.warn(e);
        return of(
          predictFailure({
            failedAction: {
              failureDescription:
                e.message ?? 'An unknown error occurred during prediction',
            },
          })
        );
      })
    );
  });

  /**
   * Constructor
   * @param actions$ Necessary, to dispatch actions
   * @param store Necessary, to pull information from store
   * @param predictService Necessary, to create predictions
   */
  constructor(
    private actions$: Actions,
    private store: Store,
    private predictService: PredictService
  ) {}
}
