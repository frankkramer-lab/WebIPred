import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupState } from 'ngrx-forms';
import { PredictState } from '../../data/state/predict/predict.state';
import { ModelSummary } from '../../data/schema/model-summary';
import { Prediction } from '../../data/schema/prediction';
import { ImageService } from '../../core/service/image.service';

/**
 * Component to create a new prediction
 */
@Component({
  selector: 'app-predict-new',
  templateUrl: './predict-new.component.html',
  styleUrls: ['./predict-new.component.scss'],
})
export class PredictNewComponent {
  /**
   * [NgRx forms](https://github.com/MrWolfZ/ngrx-forms) reference, containing the complete form state
   */
  @Input() predictForm!: FormGroupState<PredictState> | null;
  /**
   * The next prediction ID to assign
   */
  @Input() predictionId!: number | null;
  /**
   * List of available models
   */
  @Input() availableModels!: ModelSummary[] | null;
  /**
   * Term to filter available models by
   */
  @Input() modelFilterTerm!: string | null;
  /**
   * Emits a signal, when the user progresses through the form
   */
  @Output() stepChangedEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  /**
   * Emits a signal, when the model filter term changes
   */
  @Output() filterTermChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  /**
   * Emits a signal, when the model selection changes
   */
  @Output() modelSelectionChangedEmitter: EventEmitter<ModelSummary> =
    new EventEmitter<ModelSummary>();
  /**
   * Emits a signal, when the model's ID is to be copied
   */
  @Output() copyModelIdEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  /**
   * Emits a signal, when the form is to be reset
   */
  @Output() resetFormEmitter: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Emits a signal, when a prediction is to be created
   */
  @Output() createPredictionEmitter: EventEmitter<Prediction[]> =
    new EventEmitter<Prediction[]>();
  /**
   * DOM reference to the file input dialog
   */
  @ViewChild('imageUpload') htmlFileInput!: ElementRef;
  /**
   * DOM reference to the accordion, representing the form steps
   */
  @ViewChild(NgbAccordion) accordion!: NgbAccordion;
  /**
   * Number of images that are selected
   */
  numImagesSelected = 0;

  /**
   * Constructor
   * @param imageService Necessary, to handle the selected images
   */
  constructor(private imageService: ImageService) {}

  /**
   * Move one step backwards through the form
   */
  previousStep() {
    if (this.accordion) {
      switch (this.predictForm?.value.step) {
        case 2:
          this.accordion.collapse('step2');
          this.accordion.expand('step1');
          this.stepChangedEmitter.emit(1);
          break;
        case 3:
          this.accordion.collapse('step3');
          this.accordion.expand('step2');
          this.stepChangedEmitter.emit(2);
          break;
        case 4:
          this.accordion.collapse('step4');
          this.accordion.expand('step3');
          this.stepChangedEmitter.emit(3);
          break;
        case 1:
        default:
          break;
      }
    }
  }

  /**
   * Move one step forwards through the form
   */
  nextStep() {
    if (this.accordion) {
      switch (this.predictForm?.value.step) {
        case 1:
          this.accordion.collapse('step1');
          this.accordion.expand('step2');
          this.stepChangedEmitter.emit(2);
          break;
        case 2:
          this.accordion.collapse('step2');
          this.accordion.expand('step3');
          this.stepChangedEmitter.emit(3);
          break;
        case 3:
          this.accordion.collapse('step3');
          this.accordion.expand('step4');
          this.stepChangedEmitter.emit(4);
          break;
        case 4:
        default:
          break;
      }
    }
  }

  /**
   * Start the prediction
   * @param model Selected model
   */
  predict(model: ModelSummary | null) {
    if (this.htmlFileInput && model) {
      const input = this.htmlFileInput.nativeElement as HTMLInputElement;
      if (input.files) {
        const fileList: File[] = [];
        for (let i = 0; i < input.files.length; i++) {
          fileList.push(input.files[i]);
        }

        this.imageService
          .filesToPredictions(fileList, this.predictionId ?? -1, model)
          .subscribe((predictions: Prediction[]) => {
            this.createPredictionEmitter.emit(predictions);
          });
      }
    }
  }

  /**
   * Reset the form
   */
  resetForm() {
    this.resetFormEmitter.emit();
    this.accordion.expand('step1');
  }
}
