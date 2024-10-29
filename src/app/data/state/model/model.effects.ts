import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import { submitSettingsForm } from '../settings/settings.actions';
import {
  selectBackendPath,
  selectFetchInterval,
  selectIsInEditing,
} from '../settings/settings.selectors';
import {
  bridge,
  copyModelId,
  loadModelSummaries,
  loadModelSummariesFailure,
  loadModelSummariesSuccess,
} from './model.actions';
import { ApiService } from '../../service/api.service';
import { initApp } from '../setup/setup.actions';
import { ModelResponse } from '../../schema/model-response';

/**
 * Effects related to models
 */
@Injectable()
export class ModelEffects {
  /**
   * Effect to load model summaries from backend. If the {@link "app/data/state/settings/settings.state"!SettingsState} is being edited, we abort the fetch to avoid reading a false backend URL.
   * Returns:
   * <ul>
   *  <li>{@link "app/data/state/model/model.actions"!loadModelSummariesSuccess}, if the call is successful</li>
   *  <li>{@link "app/data/state/model/model.actions"!loadModelSummariesFailure}, if the call is not successful</li>
   * </ul>
   */
  loadAvailableModels$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initApp, loadModelSummaries),
      concatLatestFrom(() => [
        this.store.select(selectIsInEditing),
        this.store.select(selectBackendPath),
      ]),
      switchMap(([, settingsInEditing, backendPath]) => {
        if (!backendPath) {
          return of(
            loadModelSummariesFailure({
              failedAction: {
                failureDescription:
                  'Cannot load models! Missing path to backend.',
              },
            })
          );
        } else if (settingsInEditing) {
          return of(
            loadModelSummariesFailure({
              failedAction: {
                failureDescription:
                  'Cannot load models! Settings are being edited.',
              },
            })
          );
        }

        return this.apiService.loadModelSummaries(backendPath).pipe(
          map((modelResponse: ModelResponse) => {
            return loadModelSummariesSuccess({
              availableModels: modelResponse.models,
            });
          }),
          catchError((e) => {
            console.warn(e);
            return of(
              loadModelSummariesFailure({
                failedAction: {
                  failureDescription:
                    e.message ??
                    'Cannot load models! Unknown failure occurred.',
                },
              })
            );
          })
        );
      })
    );
  });

  /**
   * Effect to schedule the backend calls to fetch the models (see {@link "app/data/state/model/model.actions"!loadModelSummaries}) by the settings-defined delay (see {@link "app/data/state/settings/settings.state"!SettingsState#fetchModelsInterval}).
   * Returns {@link "app/data/state/model/model.actions"!bridge}
   */
  timeout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        submitSettingsForm,
        loadModelSummariesFailure,
        loadModelSummariesSuccess
      ),
      concatLatestFrom(() => [this.store.select(selectFetchInterval)]),
      switchMap(([, fetchInterval]) => {
        return of(bridge()).pipe(delay(fetchInterval));
      })
    );
  });

  /**
   * Effect to proxy the next {@link "app/data/state/model/model.actions"!loadModelSummaries} backend call, since [cycles are forbidden](https://github.com/cartant/eslint-plugin-rxjs/blob/main/docs/rules/no-cyclic-action.md).
   * Returns {@link "app/data/state/model/model.actions"!loadModelSummaries}
   */
  bridge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(bridge),
      map(() => {
        return loadModelSummaries();
      })
    );
  });

  /**
   * Copies a model's ID to clipboard
   */
  copyToClipboard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(copyModelId),
        map((action) => {
          navigator.clipboard.writeText(action.modelId.toString());
        })
      );
    },
    { dispatch: false }
  );

  /**
   * Constructor
   * @param actions$ Necessary to dispatch actions
   * @param store Necessary to load information from store
   * @param apiService Necessary to make calls to the backend
   */
  constructor(
    private actions$: Actions,
    private store: Store,
    private apiService: ApiService
  ) {}
}
