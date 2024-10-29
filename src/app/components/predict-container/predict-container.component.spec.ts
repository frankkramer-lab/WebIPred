import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/data/state/reducers';

import { PredictContainerComponent } from './predict-container.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('PredictContainerComponent', () => {
  let component: PredictContainerComponent;
  let fixture: ComponentFixture<PredictContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {}),
        RouterTestingModule,
        NgrxFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [PredictContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
