import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVbarComponent } from './chart-vbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('ChartVbarComponent', () => {
  let component: ChartVbarComponent;
  let fixture: ComponentFixture<ChartVbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxChartsModule],
      declarations: [ChartVbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartVbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
