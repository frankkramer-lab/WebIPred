import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setActiveModel } from '../model/model.actions';
import { catchError, forkJoin, map, mergeMap, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ModelEvaluation } from '../../schema/model-evaluation';
import { ApiService } from '../../service/api.service';
import {
  loadActiveModelEvaluationFailure,
  loadActiveModelEvaluationSuccess,
} from './evaluation.actions';
import { Store } from '@ngrx/store';

/**
 * Effects relevant to the evaluation of a model
 */
@Injectable()
export class EvaluationEffects {
  /**
   * This effect loads both Python and JavaScript based evaluation data.
   */
  fetchModelEvaluation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setActiveModel),
      mergeMap((action) => {
        // Load both JS and Python evaluation using forkjoin and save both to reducer
        const observables$ = {
          py: this.apiService.loadModelEvaluationPy(
            environment.backendPath,
            action.activeModel
          ),
          js: this.apiService.loadModelEvaluationJs(
            environment.backendPath,
            action.activeModel
          ),
        };

        return forkJoin(observables$).pipe(
          map(
            (data: {
              py: ModelEvaluation | null;
              js: ModelEvaluation | null;
            }) => {
              if (!data.py) throwError(() => 'Missing Python evaluation!');
              if (!data.js) throwError(() => 'Missing JavaScript evaluation!');

              return loadActiveModelEvaluationSuccess({
                data: {
                  js: data.js as ModelEvaluation,
                  py: data.py as ModelEvaluation,
                },
              });
            }
          ),
          catchError((e) =>
            of(
              loadActiveModelEvaluationFailure({
                failedAction: { failureDescription: e.message ? e.message : e },
              })
            )
          )
        );
      })
    );
  });

  /**
   * Constructor
   * @param actions$ Necessary to dispatch actions
   * @param store Necessary to select data from store
   * @param apiService Necessary to make backend calls
   */
  constructor(
    private actions$: Actions,
    private store: Store,
    private apiService: ApiService
  ) {}
}
