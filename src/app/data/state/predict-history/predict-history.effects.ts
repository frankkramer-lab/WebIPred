import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ImageService } from '../../../core/service/image.service';
import {
  generateGradCam,
  generateGradCamFailure,
  generateGradCamSuccess,
} from './predict-history.actions';
import { selectPredictions } from './predict-history.selectors';
import { map, of, switchMap } from 'rxjs';

/**
 * Effects related to the creation of predictions
 */
@Injectable()
export class PredictHistoryEffects {
  /**
   * Effect to create a [GradCAM](https://arxiv.org/abs/1610.02391) image for an already predicted image and a specific class.
   * Returns:
   * <ul>
   *  <li>{@link "app/data/state/predict-history/predict-history.actions"!generateGradCamSuccess}, if the call is successful</li>
   *  <li>{@link "app/data/state/predict-history/predict-history.actions"!generateGradCamFailure}, if the call is not successful</li>
   * </ul>
   */
  generateGradCam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(generateGradCam),
      concatLatestFrom(() => [this.store.select(selectPredictions)]),
      switchMap(([action, predictions]) => {
        if (!predictions || predictions.length === 0) {
          return of(
            generateGradCamFailure({
              failedAction: { failureDescription: 'No prediction to explain.' },
            })
          );
        } else {
          const prediction = predictions.find(
            (p) => p.id === action.xaiReference.predictionId
          );
          if (!prediction) {
            return of(
              generateGradCamFailure({
                failedAction: {
                  failureDescription: `Did not find requested prediction ID "${action.xaiReference.predictionId}"`,
                },
              })
            );
          }
          return this.imageService
            .buildGradCam(
              prediction.model,
              action.xaiReference.classId,
              prediction.base64,
              prediction.imageDimensions
            )
            .pipe(
              switchMap((tensor) =>
                this.imageService
                  .tensorToBase64(tensor, prediction.imageDimensions)
                  .pipe(
                    map((base64) =>
                      generateGradCamSuccess({
                        xaiReference: action.xaiReference,
                        base64,
                      })
                    )
                  )
              )
            );
        }
      })
    );
  });

  /**
   * Constructor
   * @param actions$ Necessary, to dispatch actions
   * @param store Necessary, to pull information from store
   * @param imageService Necessary, for image preprocessing
   */
  constructor(
    private actions$: Actions,
    private store: Store,
    private imageService: ImageService
  ) {}
}
