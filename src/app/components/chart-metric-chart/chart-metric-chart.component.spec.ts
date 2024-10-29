import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMetricChartComponent } from './chart-metric-chart.component';

describe('ChartMetricChartComponent', () => {
  let component: ChartMetricChartComponent;
  let fixture: ComponentFixture<ChartMetricChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartMetricChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartMetricChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
