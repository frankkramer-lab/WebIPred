import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictProbabilitiesTableComponent } from './predict-probabilities-table.component';

describe('PredictProbabilitiesTableComponent', () => {
  let component: PredictProbabilitiesTableComponent;
  let fixture: ComponentFixture<PredictProbabilitiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PredictProbabilitiesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictProbabilitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
