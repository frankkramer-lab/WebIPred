import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsContainerComponent } from './components/settings-container/settings-container.component';
import { ModelsContainerComponent } from './components/models-container/models-container.component';
import { PredictContainerComponent } from './components/predict-container/predict-container.component';
import { PredictNewContainerComponent } from './components/predict-new-container/predict-new-container.component';
import { PredictHistoryContainerComponent } from './components/predict-history-container/predict-history-container.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'predict',
    component: PredictContainerComponent,
    children: [
      {
        path: 'new',
        component: PredictNewContainerComponent,
      },
      {
        path: 'history',
        component: PredictHistoryContainerComponent,
      },
    ],
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
  },
  {
    path: 'models',
    component: ModelsContainerComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
