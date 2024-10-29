import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictNewComponent } from './predict-new.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../data/state/reducers';
import { StepperNavigationComponent } from '../stepper-navigation/stepper-navigation.component';

describe('PredictNewComponent', () => {
  let component: PredictNewComponent;
  let fixture: ComponentFixture<PredictNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, {})],
      declarations: [PredictNewComponent, StepperNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
