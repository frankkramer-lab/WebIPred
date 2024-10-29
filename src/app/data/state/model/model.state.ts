import { ModelSummary } from '../../schema/model-summary';

/**
 * State holding any model-related information
 */
export interface ModelState {
  /**
   * Collection of models that are available for loading from backend
   */
  availableModels: ModelSummary[];
  /**
   * Selected model to show details about,
   */
  activeModel: ModelSummary | null;
  /**
   * Term to filter the models by
   */
  modelFilterTerm: string;

  /**
   * Indicates, if fetching models from backend is in progress
   */
  fetchingModelSummaries: boolean;
}
