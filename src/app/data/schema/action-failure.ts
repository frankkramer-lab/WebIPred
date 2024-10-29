/**
 * If an action fails, we inform the user using an instance of this interface
 */
export interface ActionFailure {
  /**
   * Human-readable description, why the action failed
   */
  failureDescription?: string;
}
