import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHbarComponent } from './chart-hbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('ChartHbarComponent', () => {
  let component: ChartHbarComponent;
  let fixture: ComponentFixture<ChartHbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxChartsModule],
      declarations: [ChartHbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartHbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
