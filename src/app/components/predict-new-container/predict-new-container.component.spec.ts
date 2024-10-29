import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictNewContainerComponent } from './predict-new-container.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../data/state/reducers';
import { PredictNewComponent } from '../predict-new/predict-new.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelInfoComponent } from '../model-info/model-info.component';
import { StepperNavigationComponent } from '../stepper-navigation/stepper-navigation.component';
import { CoreModule } from '../../core/core.module';
import { IconItemComponent } from '../icon-item/icon-item.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { ModelListComponent } from '../model-list/model-list.component';

describe('PredictNewContainerComponent', () => {
  let component: PredictNewContainerComponent;
  let fixture: ComponentFixture<PredictNewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {}),
        CoreModule,
        NgrxFormsModule,
        BrowserAnimationsModule,
        NgbAccordionModule,
        FontAwesomeTestingModule,
      ],
      declarations: [
        PredictNewContainerComponent,
        PredictNewComponent,
        ModelInfoComponent,
        ModelListComponent,
        StepperNavigationComponent,
        IconItemComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictNewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
