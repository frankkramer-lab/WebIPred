import { ChartTypeEnum } from '../../core/enum/chart-type.enum';

/**
 * Snapshot of the {@link "app/data/state/settings/settings.state"!SettingsState}, used to reset the form to a previous value
 */
export interface SettingsStateSnapshot {
  /**
   * Path to the backend
   */
  backendPath: string | null;
  /**
   * Number of milliseconds between fetching models from backend
   */
  fetchModelsInterval: number;
  /**
   * Type of chart for results, can either be 'horizontal' or 'vertical'
   */
  chartTypeResults: ChartTypeEnum;
  /**
   * Type of chart for any other metric, can either be 'horizontal' or 'vertical'
   */
  chartTypeMetrics: ChartTypeEnum;
}
