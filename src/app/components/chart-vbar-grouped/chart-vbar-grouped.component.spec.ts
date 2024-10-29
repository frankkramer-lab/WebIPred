import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVbarGroupedComponent } from './chart-vbar-grouped.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('ChartVbarGroupedComponent', () => {
  let component: ChartVbarGroupedComponent;
  let fixture: ComponentFixture<ChartVbarGroupedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxChartsModule],
      declarations: [ChartVbarGroupedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartVbarGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
