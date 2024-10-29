import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { reducers } from 'src/app/data/state/reducers';
import { StoreModule } from '@ngrx/store';
import { NavbarComponent } from '../navbar/navbar.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {}),
        RouterTestingModule,
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
      ],
      declarations: [ContainerComponent, NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
