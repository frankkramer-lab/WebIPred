import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ContainerComponent } from './layout/container/container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from './data/state/reducers';
import { StoreModule } from '@ngrx/store';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {}),
        RouterTestingModule,
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
      ],
      declarations: [
        AppComponent,
        ContainerComponent,
        NavbarComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
