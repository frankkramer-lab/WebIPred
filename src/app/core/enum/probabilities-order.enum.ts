/**
 * Order for result probabilities
 */
export enum ProbabilitiesOrderEnum {
  /**
   * Probabilities ordered by the model's output
   */
  BY_NAME = 'name',
  /**
   * Probabilities ordered descending
   */
  BY_PROBABILITY_DESC = 'p_desc',
  /**
   * Probabilities ordered ascending
   */
  BY_PROBABILITY_ASC = 'p_asc',
}
