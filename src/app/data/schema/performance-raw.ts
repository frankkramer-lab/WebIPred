import { PerformanceRawItem } from './performance-raw-item';
import { PerformanceRawMergedItem } from './performance-raw-merged-item';

/**
 * Contains the performance evaluation
 */
export interface PerformanceRaw {
  [key: string]: PerformanceRawItem | PerformanceRawMergedItem;
}
