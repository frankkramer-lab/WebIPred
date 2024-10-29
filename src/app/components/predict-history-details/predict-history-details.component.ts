import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Prediction } from '../../data/schema/prediction';
import { ProbabilitiesOrderEnum } from '../../core/enum/probabilities-order.enum';
import { ChartTypeEnum } from '../../core/enum/chart-type.enum';
import { XaiReference } from '../../data/schema/xai-reference';

/**
 * Component showing details to a selected prediction
 */
@Component({
  selector: 'app-predict-history-details',
  templateUrl: './predict-history-details.component.html',
  styleUrls: ['./predict-history-details.component.scss'],
})
export class PredictHistoryDetailsComponent implements OnChanges {
  /**
   * Selected prediction
   */
  @Input() activePrediction!: Prediction | null;
  /**
   * Current order to show prediction probabilities in
   */
  @Input() probabilitiesChartOrder!: ProbabilitiesOrderEnum | null;
  /**
   * User's bar chart preference for results
   */
  @Input() preferredChartTypeResult!: ChartTypeEnum | null;
  /**
   * ID for a class, that is being processed for XAI
   */
  @Input() xaiClassInProcess!: number | null;
  /**
   * ID for a prediction, that is being processed for XAI
   */
  @Input() xaiPredictionInProcess!: number | null;
  /**
   * Base64 encoded XAI visualization, that is to be rendered on top of the source image
   */
  @Input() xaiClassVisible!: string | null;
  /**
   * Emits a signal, if the result probabilities are to be visualized in a different order
   */
  @Output() chartOrderChangedEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  /**
   * Emits a signal, if the prediction results are to be exported as CSV
   */
  @Output() exportPredictionEmitter: EventEmitter<Prediction> =
    new EventEmitter<Prediction>();
  /**
   * Emits a signal, when a [GradCAM](https://arxiv.org/abs/1610.02391) visualization is to be calculated
   */
  @Output() generateGradCamEmitter: EventEmitter<XaiReference> =
    new EventEmitter<XaiReference>();
  /**
   * Emits a signal, when a [GradCAM](https://arxiv.org/abs/1610.02391) visualization should be displayed
   */
  @Output() showGradCamEmitter: EventEmitter<XaiReference> =
    new EventEmitter<XaiReference>();
  /**
   * XAI image opacity, which can be adjusted via slider
   */
  opacity = 0.5;
  /**
   * DOM reference to the predicted source image
   */
  @ViewChild('predictedImage') predictedImage!: ElementRef;
  /**
   * DOM reference to the XAI heatmap
   */
  @ViewChild('heatmap') heatmap!: ElementRef;

  /**
   * [Angular lifecycle hook](https://angular.io/guide/lifecycle-hooks), which triggers, when one of the defined inputs changes their value
   * @param changes Dictionary containing the occurring changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activePrediction']) {
      const activePredictionChange = changes['activePrediction'];
      if (!activePredictionChange.isFirstChange() && this.predictedImage) {
        this.predictedImage.nativeElement.onerror = (e: any) => console.warn(e);

        this.predictedImage.nativeElement.src =
          activePredictionChange.currentValue.base64;
      }
    }

    if (changes['xaiClassVisible']) {
      const xaiChange = changes['xaiClassVisible'];

      if (!xaiChange.isFirstChange() && this.heatmap && this.predictedImage) {
        const canvas = this.heatmap.nativeElement;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const image = new Image();
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
        };

        image.onerror = (e) => console.warn(e);

        if (xaiChange.currentValue) {
          image.src = xaiChange.currentValue;
        }
      }
    }
  }
}
