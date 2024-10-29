import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMetricInfoCmComponent } from './chart-metric-info-cm.component';

describe('ChartMetricInfoCmComponent', () => {
  let component: ChartMetricInfoCmComponent;
  let fixture: ComponentFixture<ChartMetricInfoCmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartMetricInfoCmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartMetricInfoCmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
