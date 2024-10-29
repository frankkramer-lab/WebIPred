import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictProbabilitiesChartComponent } from './predict-probabilities-chart.component';

describe('PredictProbabilitiesChartComponent', () => {
  let component: PredictProbabilitiesChartComponent;
  let fixture: ComponentFixture<PredictProbabilitiesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PredictProbabilitiesChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictProbabilitiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
