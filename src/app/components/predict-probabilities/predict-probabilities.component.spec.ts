import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictProbabilitiesComponent } from './predict-probabilities.component';
import { FormsModule } from '@angular/forms';
import { PredictProbabilitiesChartComponent } from '../predict-probabilities-chart/predict-probabilities-chart.component';
import { PredictProbabilitiesTableComponent } from '../predict-probabilities-table/predict-probabilities-table.component';

describe('PredictProbabilitiesComponent', () => {
  let component: PredictProbabilitiesComponent;
  let fixture: ComponentFixture<PredictProbabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        PredictProbabilitiesComponent,
        PredictProbabilitiesChartComponent,
        PredictProbabilitiesTableComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictProbabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
