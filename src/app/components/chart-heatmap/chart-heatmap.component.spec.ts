import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHeatmapComponent } from './chart-heatmap.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('ChartHeatmapComponent', () => {
  let component: ChartHeatmapComponent;
  let fixture: ComponentFixture<ChartHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxChartsModule],
      declarations: [ChartHeatmapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
