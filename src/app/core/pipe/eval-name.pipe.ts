import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns the specified metric's name
 */
@Pipe({ name: 'evalName' })
export class EvalNamePipe implements PipeTransform {
  /**
   * Applying the evalName pipe, requires the key of the metric. By default, the key is simply stripped of underscores.
   * @param key Key of the metric
   */
  transform(key: string): string {
    switch (key) {
      case 'fdr':
        return 'False Discovery Rate (FDR)';
      case 'fnr':
        return 'False Negative Rate (FNR)';
      case 'fpr':
        return 'False Positive Rate (FPR)';
      case 'auc':
        return 'Area Under ROC curve (AUC)';
      case 'roc':
        return 'Receiver Operator Curve (ROC)';
      default:
        return key.replace('_', ' ');
    }
  }
}
