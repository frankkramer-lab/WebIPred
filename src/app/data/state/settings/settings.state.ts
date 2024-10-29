import { SettingsStateSnapshot } from '../../schema/settings-state-snapshot';
import { ChartTypeEnum } from '../../../core/enum/chart-type.enum';

/**
 * State holding any model-related information
 */
export interface SettingsState {
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

  /**
   * Snapshot of the state, used to reset the form to a previous value
   */
  settingsStateSnapshot: SettingsStateSnapshot;
}
