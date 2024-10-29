import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconItemComponent } from './icon-item.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('IconItemComponent', () => {
  let component: IconItemComponent;
  let fixture: ComponentFixture<IconItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeTestingModule],
      declarations: [IconItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
