import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictHistoryComponent } from './predict-history.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../data/state/reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PredictHistoryComponent', () => {
  let component: PredictHistoryComponent;
  let fixture: ComponentFixture<PredictHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, StoreModule.forRoot(reducers, {})],
      declarations: [PredictHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
