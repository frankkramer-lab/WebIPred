import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  exportEvaluation,
  exportEvaluationFailure,
  exportEvaluationSuccess,
} from '../evaluation/evaluation.actions';
import { selectActiveEvaluation } from '../evaluation/evaluation.selectors';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  exportPrediction,
  exportPredictionFailure,
  exportPredictionSuccess,
} from '../predict-history/predict-history.actions';

/**
 * Local function to concatenate CSV content
 * @param rows List of rows
 * @param keys List of keys for each row
 * @param separator CSV cell separator
 */
export const mapContent = (
  rows: any[],
  keys: string[],
  separator: string
): string => {
  return rows
    .map((row) => {
      return keys
        .map((k) => {
          return row[k] === undefined || row[k] === null ? '' : row[k];
        })
        .join(separator);
    })
    .join('\n');
};

/**
 * Local function to start the download of the built CSV file
 * @param blob CSV file content
 * @param filename Name of the file
 */
export const triggerDownload = (blob: Blob, filename: string) => {
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Effects related to CSV file exports
 */
@Injectable()
export class ExportEffects {
  /**
   * Exports a model's merged evaluation to CSV
   */
  exportEvaluationToCsv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exportEvaluation),
      concatLatestFrom(() => [this.store.select(selectActiveEvaluation)]),
      map(([, evaluation]) => {
        if (
          !evaluation ||
          !evaluation.raw ||
          Object.keys(evaluation.raw).length === 0
        ) {
          return exportEvaluationFailure({
            failedAction: {
              failureDescription:
                'Export evaluation failed! Evaluation does not exist.',
            },
          });
        }

        const filename = `model-evaluation.csv`;
        const rows = Object.values(evaluation.raw);
        const keys = Object.keys(rows[0]); // metric, score_python, score_js, class
        const separator = ',';

        const content = `${keys.join(separator)}\n${mapContent(
          rows,
          keys,
          separator
        )}`;

        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        triggerDownload(blob, filename);

        return exportEvaluationSuccess();
      })
    );
  });

  /**
   * Exports a prediction to CSV
   */
  exportPredictionToCsv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(exportPrediction),
      map((action) => {
        const result = action.prediction.result;
        const model = action.prediction.model;

        if (
          !result ||
          !model ||
          !model.classNames ||
          model.classNames.length !== result.length
        ) {
          return exportPredictionFailure({
            failedAction: { failureDescription: 'Export prediction failed!' },
          });
        }

        // build CSV from results + classnames
        const keys = ['image', ...model.classNames];
        const separator = ',';
        const results = result.join(separator);
        console.log(results);

        const content = `${keys.join(separator)}\n${[
          action.prediction.filename,
        ].concat(results)}`;

        console.log(content);

        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        triggerDownload(
          blob,
          `prediction-${action.prediction.createdOn.toLocaleString()}`
        );
        return exportPredictionSuccess();
      })
    );
  });

  /**
   * Constructor
   * @param actions$ Necessary to dispatch actions
   * @param store Necessary to select data from store
   */
  constructor(private actions$: Actions, private store: Store) {}
}
