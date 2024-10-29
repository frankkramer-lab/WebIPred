import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ModelSummary } from '../schema/model-summary';
import { ModelEvaluation } from '../schema/model-evaluation';
import { environment } from '../../../environments/environment';
import { ModelResponse } from '../schema/model-response';

/**
 * Service responsible for making backend calls
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * Constructor
   * @param httpClient Necessary, for making HTTPS requests
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Load available models from the backend
   * @param backendPath Path to the backend
   */
  loadModelSummaries(backendPath: string): Observable<ModelResponse> {
    let url = '';

    if (environment.production) {
      url = `${backendPath}${backendPath.endsWith('/') ? '' : '/'}models`;
    } else {
      url = `${backendPath}${backendPath.endsWith('/') ? '' : '/'}all.json`;
    }

    return this.httpClient.get<ModelResponse>(url);
  }

  /**
   * Load JavaScript model evaluation
   * @param backendPath Path to the backend
   * @param model Model, for which the evaluation is to be loaded
   */
  loadModelEvaluationJs(
    backendPath: string,
    model: ModelSummary
  ): Observable<ModelEvaluation | null> {
    if (model.links.evalJs) {
      return this.httpClient.get<ModelEvaluation>(
        `${backendPath}${backendPath.endsWith('/') ? '' : '/'}${
          model.links.evalJs
        }`
      );
    }
    return of(null);
  }

  /**
   * Load Python model evaluation
   * @param backendPath Path to the backend
   * @param model Model, for which the evaluation is to be loaded
   */
  loadModelEvaluationPy(
    backendPath: string,
    model: ModelSummary
  ): Observable<ModelEvaluation | null> {
    if (model.links.evalPython) {
      return this.httpClient.get<ModelEvaluation>(
        `${backendPath}${backendPath.endsWith('/') ? '' : '/'}${
          model.links.evalPython
        }`
      );
    }
    return of(null);
  }
}
