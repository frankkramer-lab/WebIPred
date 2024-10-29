import { LinkCollection } from './link-collection';

/**
 * Represents a model available in the backend
 */
export interface ModelSummary {
  /**
   * Unique identifier to load the model file from backend
   */
  id: number;
  /**
   * Human-readable name to identify the model by
   */
  name: string;
  /**
   * Description about this model, which may contain `HTML` tags
   */
  description: string;
  /**
   * The model's expected input image width
   */
  resizeWidth: number;
  /**
   * The model's expected input image height
   */
  resizeHeight: number;
  /**
   * The necessary standardize algorithm, applied before image prediction
   */
  standardizeMode: string;
  /**
   * The necessary resize algorithm, applied before image prediction
   */
  resizeMode: number;
  /**
   * List of class names, reflecting the model's output classes
   */
  classNames: string[];
  /**
   * Original class names, including their index
   */
  classes: { index: number; name: string }[];
  /**
   * Name of the medical discipline, the model's use case belongs to
   */
  medicalDiscipline: string;
  /**
   * Name of the medical procedure, the model's use case belongs to
   */
  medicalProcedure: string;
  /**
   * True, if the model represents a multi-label classification task
   */
  isMultiLabel: boolean;
  /**
   * True, if the model represents a multi-class classification task
   */
  isMultiClass: boolean;

  /**
   * Collection of frontend-relevant links
   */
  links: LinkCollection;
}
