import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHbarGroupedComponent } from './chart-hbar-grouped.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('ChartHbarGroupedComponent', () => {
  let component: ChartHbarGroupedComponent;
  let fixture: ComponentFixture<ChartHbarGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxChartsModule],
      declarations: [ChartHbarGroupedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartHbarGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
