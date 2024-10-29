import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMetricComponent } from './chart-metric.component';

describe('ChartMetricComponent', () => {
  let component: ChartMetricComponent;
  let fixture: ComponentFixture<ChartMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartMetricComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
