import { Pipe, PipeTransform } from '@angular/core';
import { ModelEvaluation } from '../../data/schema/model-evaluation';

/**
 * List of keys which should not be selectable in the evaluation metric dropdown
 */
export const unsuitableKeys = ['duration', 'distribution', 'raw'];

/**
 * Returns a list of metric keys that are viable to render.
 */
@Pipe({ name: 'evalViable' })
export class EvalViablePipe implements PipeTransform {
  /**
   * Applying the evalViable pipe requires the evaluation object containing all available keys and information whether the model is multi-label
   * @param evaluation Evaluation instance
   * @param isMultilabel True, if the model is multi-label
   */
  transform(
    evaluation: ModelEvaluation,
    isMultilabel: boolean | null
  ): string[] {
    const keys = Object.keys(evaluation);

    const pattern = new RegExp(/confusion_matrix_.+/);
    const keysNoCm = keys.filter((key: string) => !pattern.test(key));

    if (
      keys.filter((key: string) => key.startsWith('confusion_matrix')) &&
      !isMultilabel
    ) {
      keysNoCm.push('confusion_matrix');
    }

    return keysNoCm
      .filter((key: string) => !unsuitableKeys.includes(key))
      .sort((a, b) => (a < b ? -1 : 1));
  }
}
