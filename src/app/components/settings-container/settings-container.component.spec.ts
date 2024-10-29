import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { reducers } from 'src/app/data/state/reducers';
import { SettingsComponent } from '../settings/settings.component';

import { SettingsContainerComponent } from './settings-container.component';
import { IconItemComponent } from '../icon-item/icon-item.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('SettingsContainerComponent', () => {
  let component: SettingsContainerComponent;
  let fixture: ComponentFixture<SettingsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {}),
        NgrxFormsModule,
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
      ],
      declarations: [
        SettingsContainerComponent,
        SettingsComponent,
        IconItemComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
