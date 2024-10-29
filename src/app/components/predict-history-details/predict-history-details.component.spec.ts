import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictHistoryDetailsComponent } from './predict-history-details.component';

describe('PredictHistoryDetailsComponent', () => {
  let component: PredictHistoryDetailsComponent;
  let fixture: ComponentFixture<PredictHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PredictHistoryDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
