import { Prediction } from '../../schema/prediction';
import { ProbabilitiesOrderEnum } from '../../../core/enum/probabilities-order.enum';

/**
 * Predict history state
 */
export interface PredictHistoryState {
  /**
   * List of predictions, that were created during this session
   */
  predictions: Prediction[];
  /**
   * Currently selected prediction
   */
  activePrediction: Prediction | null;
  /**
   * ID of the class which is being processed for XAI
   */
  xaiClassInProcess: number | null;
  /**
   * ID of the prediction which is being processed for XAI
   */
  xaiPredictionInProcess: number | null;
  /**
   * ID of the class, whose XAI image is visible
   */
  xaiClassVisible: number | null;
  /**
   * Chart containing probabilities for the currently active prediction
   */
  probabilitiesChart: ProbabilitiesOrderEnum;
}
