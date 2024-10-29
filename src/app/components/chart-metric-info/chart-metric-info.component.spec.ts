import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMetricInfoComponent } from './chart-metric-info.component';

describe('ChartMetricInfoComponent', () => {
  let component: ChartMetricInfoComponent;
  let fixture: ComponentFixture<ChartMetricInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartMetricInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartMetricInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
