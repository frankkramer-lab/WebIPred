import { ModelSummary } from '../../schema/model-summary';

/**
 * Prediction state
 */
export interface PredictState {
  /**
   * Model selected for prediction
   */
  model: ModelSummary | null;
  /**
   * List of images to be predicted
   */
  images: string | null;
  /**
   * True, if openCV is available for prediction
   */
  openCvAvailable: boolean;
  /**
   * True, if the prediction is in progress
   */
  predictInProgress: boolean;
  /**
   * Current step in the form
   */
  step: number;
}
