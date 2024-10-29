import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsContainerComponent } from './models-container.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../data/state/reducers';
import { ModelsComponent } from '../models/models.component';
import { ModelListComponent } from '../model-list/model-list.component';
import { EvaluationComponent } from '../evaluation/evaluation.component';

describe('ModelsContainerComponent', () => {
  let component: ModelsContainerComponent;
  let fixture: ComponentFixture<ModelsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, {})],
      declarations: [
        ModelsContainerComponent,
        ModelsComponent,
        ModelListComponent,
        EvaluationComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
