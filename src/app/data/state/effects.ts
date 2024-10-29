import { ModelEffects } from './model/model.effects';
import { ToastEffects } from './toast/toast.effects';
import { SetupEffects } from './setup/setup.effects';
import { PredictEffects } from './predict/predict.effects';
import { EvaluationEffects } from './evaluation/evaluation.effects';
import { ExportEffects } from './export/export.effects';
import { PredictHistoryEffects } from './predict-history/predict-history.effects';

export const effects: any[] = [
  ModelEffects,
  ToastEffects,
  SetupEffects,
  PredictEffects,
  PredictHistoryEffects,
  EvaluationEffects,
  ExportEffects,
];
