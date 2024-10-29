import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImageService } from '../../../core/service/image.service';
import { initApp, initAppFailure, initAppSuccess } from './setup.actions';
import { catchError, of, retry, switchMap, throwError } from 'rxjs';

/**
 * Class for setup-related effects
 */
@Injectable()
export class SetupEffects {
  /**
   * Setting up the application requires openCV to be available to the browser.
   * We check its availability in intervals of 2 seconds, for a total maximum
   * of 20 seconds after app start.
   * See {@link "app/core/service/predict.service"!PredictService#getCvSetupSuccessful} for implementation details.
   */
  isOpenCvAvailable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initApp),
      switchMap(() => {
        return this.imageService.getCvSetupSuccessful().pipe(
          switchMap((result: boolean) => {
            if (!result) {
              return throwError(() => 'OpenCV is not available!');
            }
            return of(initAppSuccess());
          }),
          retry({ count: 10, delay: 2000 }),
          catchError((e) =>
            of(initAppFailure({ failedAction: { failureDescription: e } }))
          )
        );
      })
    );
  });

  /**
   * Constructor
   * @param actions$ Necessary to dispatch actions
   * @param imageService Necessary to check [openCV](https://github.com/TechStark/opencv-js) availability
   */
  constructor(private actions$: Actions, private imageService: ImageService) {}
}
