import { ModelSummary } from './model-summary';
import { ImageDimensions } from './image-dimensions';
import { ChartItemValue } from './chart-item-value';

/**
 * Reflects an ongoing or complete prediction instance.
 */
export interface Prediction {
  /**
   * Dimensions of the given image
   */
  imageDimensions: ImageDimensions;
  /**
   * Subsequent IDs to identify a prediction instance
   */
  id: number;
  /**
   * Name of the file being predicted
   */
  filename: string;
  /**
   * References the {@link "app/data/schema/model-summary"}, which was used for prediction
   */
  model: ModelSummary;

  /**
   * [Base 64 encoded](https://de.wikipedia.org/wiki/Base64) image
   */
  base64: string;

  /**
   * Date, the prediction was finished on
   */
  createdOn: Date;

  /**
   * True, if the prediction is still being processed.
   */
  inProcessing: boolean;

  /**
   * Result of the prediction. Please note: In case of a binary classification task, the list contains only one item, not two.
   */
  result?: number[];

  /**
   * Chart representation for the prediction, sorted by original class names order
   */
  resultChartByClass?: ChartItemValue[];
  /**
   * Chart representation for the prediction, sorted by probability descending
   */
  resultChartByProbabilityDesc?: ChartItemValue[];
  /**
   * Chart representation for the prediction, sorted by probability ascending
   */
  resultChartByProbabilityAsc?: ChartItemValue[];
  /**
   * Dictionary of XAI images, contained in base64 encoded images
   */
  xai?: { [key: string]: string };
}
