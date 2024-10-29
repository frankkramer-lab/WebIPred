import { PerformanceRaw } from './performance-raw';
import { ChartItem } from './chart-item';
import { ChartItemValue } from './chart-item-value';

/**
 * Contains charts created during the model evaluation, as well as the raw evaluation data, exportable as CSV
 */
export interface ModelEvaluation {
  /**
   * Confusion matrix, containing relative values, normalized over both rows and columns
   */
  confusion_matrix_all?: ChartItem[];
  /**
   * Confusion matrix, containing relative values, normalized by columns
   */
  confusion_matrix_cols?: ChartItem[];
  /**
   * Confusion matrix, containing absolute numbers
   */
  confusion_matrix_raw?: ChartItem[];
  /**
   * Confusion matrix, containing relative values, normalized by rows
   */
  confusion_matrix_rows?: ChartItem[];
  /**
   * Recall chart
   */
  recall?: ChartItem[];
  /**
   * Specificity chart
   */
  specificity?: ChartItem[];
  /**
   * Precision chart
   */
  precision?: ChartItem[];
  /**
   * Accuracy chart
   */
  accuracy?: ChartItem[];
  /**
   * F1 chart
   */
  f1?: ChartItem[];
  /**
   * FDR chart
   */
  fdr?: ChartItem[];
  /**
   * FNR chart
   */
  fnr?: ChartItem[];
  /**
   * FPR chart
   */
  fpr?: ChartItem[];
  /**
   * AUC chart
   */
  auc?: ChartItem[];
  /**
   * Distribution chart
   */
  distribution?: ChartItemValue[];
  /**
   * Duration chart
   */
  duration?: ChartItem[];
  /**
   * ROC chart
   */
  roc?: ChartItem[];
  /**
   * CSV exportable model evaluation
   */
  raw?: PerformanceRaw;
}
