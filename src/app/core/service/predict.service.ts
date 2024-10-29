import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Prediction } from '../../data/schema/prediction';
import { WorkerResult } from '../../data/schema/worker-result';

/**
 * Service responsible for managing web workers. The actual prediction happens in the {@link "app/workers/predict.worker" | web worker}.
 */
@Injectable({
  providedIn: 'root',
})
export class PredictService {
  /**
   * List of web workers
   * @private
   */
  private workers: Worker[] = [];

  /**
   * Extract image data from a base64 encoded image
   * @param encoded Base64 encoded image
   */
  getImageData(encoded: string): Observable<number[]> {
    return new Observable<number[]>((subscriber) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();

      image.onload = () => {
        if (ctx) {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const imgData = ctx.getImageData(
            0,
            0,
            image.width,
            image.height
          ).data;
          subscriber.next(Array.from(imgData));
          subscriber.complete();
        }
      };
      image.src = encoded;
    });
  }

  /**
   * Start prediction by creating a web worker and sending the content to predict
   * @param modelLink Link to the JavaScript model
   * @param predictions List of predictions to process
   */
  start(
    modelLink: string,
    predictions: Prediction[]
  ): Observable<WorkerResult> {
    return new Observable<WorkerResult>((subscriber) => {
      if (typeof Worker !== 'undefined') {
        const worker = new Worker(
          new URL('../../workers/predict.worker', import.meta.url),
          { type: 'module' }
        );

        // Save the worker ID
        const workerId = this.workers.length;
        this.workers.push(worker);

        // convert base64 to arraybuffer
        const bufferObservables$ = predictions.map((p) =>
          this.getImageData(p.base64)
        );
        forkJoin(bufferObservables$).subscribe((imgDataBuffers: number[][]) => {
          worker.postMessage({
            modelLink,
            images: imgDataBuffers,
            predictions,
          });
        });

        worker.onmessage = ({ data }) => {
          subscriber.next({ probabilities: data.probabilities, workerId });
        };

        worker.onerror = (e) => {
          subscriber.next({ probabilities: [], workerId, error: e.message });
        };
      } else {
        subscriber.next({
          probabilities: [],
          workerId: -1,
          error: 'Worker not supported',
        });
      }
    });
  }
}
