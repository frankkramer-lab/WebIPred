import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelInfoComponent } from './model-info.component';
import { CoreModule } from '../../core/core.module';

describe('ModelInfoComponent', () => {
  let component: ModelInfoComponent;
  let fixture: ComponentFixture<ModelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ModelInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
