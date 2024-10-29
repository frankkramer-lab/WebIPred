import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictHistoryContainerComponent } from './predict-history-container.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../data/state/reducers';
import { PredictHistoryComponent } from '../predict-history/predict-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../core/core.module';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { PredictHistoryDetailsComponent } from '../predict-history-details/predict-history-details.component';

describe('PredictHistoryContainerComponent', () => {
  let component: PredictHistoryContainerComponent;
  let fixture: ComponentFixture<PredictHistoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {}),
        BrowserAnimationsModule,
        CoreModule,
        FontAwesomeTestingModule,
      ],
      declarations: [
        PredictHistoryContainerComponent,
        PredictHistoryComponent,
        PredictHistoryDetailsComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictHistoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
