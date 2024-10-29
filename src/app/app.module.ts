import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgrxFormsModule } from 'ngrx-forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { extModules } from './build-specifics';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContainerComponent } from './layout/container/container.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsContainerComponent } from './components/settings-container/settings-container.component';
import { reducers } from './data/state/reducers';
import { effects } from './data/state/effects';
import { PredictContainerComponent } from './components/predict-container/predict-container.component';
import { IconItemComponent } from './components/icon-item/icon-item.component';
import { ModelsContainerComponent } from './components/models-container/models-container.component';
import { ModelsComponent } from './components/models/models.component';
import { PredictNewComponent } from './components/predict-new/predict-new.component';
import { PredictNewContainerComponent } from './components/predict-new-container/predict-new-container.component';
import { PredictHistoryContainerComponent } from './components/predict-history-container/predict-history-container.component';
import { PredictHistoryComponent } from './components/predict-history/predict-history.component';
import { ModelInfoComponent } from './components/model-info/model-info.component';
import { StepperNavigationComponent } from './components/stepper-navigation/stepper-navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './layout/navbar/navbar.component';

import { PredictProbabilitiesComponent } from './components/predict-probabilities/predict-probabilities.component';
import { ToastsComponent } from './layout/toasts/toasts.component';
import { IconsModule } from './icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartHeatmapComponent } from './components/chart-heatmap/chart-heatmap.component';
import { ChartVbarComponent } from './components/chart-vbar/chart-vbar.component';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { ChartHbarComponent } from './components/chart-hbar/chart-hbar.component';
import { ModelListComponent } from './components/model-list/model-list.component';
import { ChartMetricComponent } from './components/chart-metric/chart-metric.component';
import { ChartHbarGroupedComponent } from './components/chart-hbar-grouped/chart-hbar-grouped.component';
import { ChartVbarGroupedComponent } from './components/chart-vbar-grouped/chart-vbar-grouped.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { ChartMetricInfoComponent } from './components/chart-metric-info/chart-metric-info.component';
import { ChartMetricInfoCmComponent } from './components/chart-metric-info-cm/chart-metric-info-cm.component';
import { ChartMetricChartComponent } from './components/chart-metric-chart/chart-metric-chart.component';
import { PredictProbabilitiesChartComponent } from './components/predict-probabilities-chart/predict-probabilities-chart.component';
import { PredictProbabilitiesTableComponent } from './components/predict-probabilities-table/predict-probabilities-table.component';
import { PredictHistoryDetailsComponent } from './components/predict-history-details/predict-history-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HomeComponent,
    SettingsComponent,
    SettingsContainerComponent,
    PredictContainerComponent,
    IconItemComponent,
    ModelsContainerComponent,
    ModelsComponent,
    PredictNewComponent,
    PredictNewContainerComponent,
    PredictHistoryContainerComponent,
    PredictHistoryComponent,
    ModelInfoComponent,
    StepperNavigationComponent,
    NavbarComponent,
    PredictProbabilitiesComponent,
    ToastsComponent,
    ChartHeatmapComponent,
    ChartVbarComponent,
    ChartLineComponent,
    ChartHbarComponent,
    ModelListComponent,
    ChartMetricComponent,
    ChartHbarGroupedComponent,
    ChartVbarGroupedComponent,
    EvaluationComponent,
    ChartMetricInfoComponent,
    ChartMetricInfoCmComponent,
    ChartMetricChartComponent,
    PredictProbabilitiesChartComponent,
    PredictProbabilitiesTableComponent,
    PredictHistoryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    IconsModule,
    CoreModule,
    DataModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    extModules,
    EffectsModule.forRoot(effects),
    NgrxFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
