import { ModelEvaluation } from '../../schema/model-evaluation';
import { MetricDescription } from '../../schema/metric-description';
import { ConfusionMatrixModeEnum } from '../../../core/enum/confusion-matrix-mode.enum';

/**
 * State holding any evaluation-related information
 */
export interface EvaluationState {
  /**
   * Contains the merged evaluation information for a currently selected model. If no evaluation exists, contains null.
   */
  activeEvaluation: ModelEvaluation | null;
  /**
   * Contains the Python evaluation information for a currently selected model. If no evaluation exists, contains null.
   */
  activeEvaluationPy: ModelEvaluation | null;
  /**
   * Contains the JavaScript evaluation information for a currently selected model. If no evaluation exists, contains null.
   */
  activeEvaluationJs: ModelEvaluation | null;
  /**
   * Contains a currently selected metric. If no metric is selected, contains null.
   */
  activeMetric: MetricDescription | null;
  /**
   * Contains the current confusion matrix visualization preference.
   */
  confusionMatrixMode: ConfusionMatrixModeEnum;
}
