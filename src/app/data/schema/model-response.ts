import { ModelSummary } from './model-summary';

/**
 * API call contains both a list of models and pagination links
 */
export interface ModelResponse {
  /**
   * List of models, available in the backend
   */
  models: ModelSummary[];
  /**
   * Object containing offset and limit for pagination
   */
  pagination_links: any;
}
