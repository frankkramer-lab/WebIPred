import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns the specified metric's description
 */
@Pipe({ name: 'evalDescription' })
export class EvalDescriptionPipe implements PipeTransform {
  /**
   * Applying the evalDescription pipe, requires the key of the metric.
   * @param key Key of the metric
   */
  transform(key: string): string {
    switch (key) {
      case 'confusion_matrix_all':
      case 'confusion_matrix_cols':
      case 'confusion_matrix_raw':
      case 'confusion_matrix_rows':
        return '<p>A <b>confusion matrix</b> (also called error matrix) is frequently employed to assess the thematic accuracy of a classification. It can serve as a basis for further calculations, because it contains information regarding true positives, false negatives, true negatives and false positives. The cells on the diagonal represent correctly identified class instances (i.e. true positives).</p><p>Read more about confusion matrix on <a href="https://en.wikipedia.org/wiki/Confusion_matrix" target="_blank">Wikipedia</a>.</p>';
      case 'recall':
        return '<p>Recall (which is called sensitivity or True Positive Rate) describes the fraction of items, correctly identified as such (true positives) to all items, which should have been assigned this class (true positives and false negatives).</p><img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Precisionrecall.svg/495px-Precisionrecall.svg.png"><p>Read more about precision and recall on <a href="https://en.wikipedia.org/wiki/Precision_and_recall" target="_blank">Wikipedia</a>.</p>';
      case 'specificity':
        return '<p>Specificity (also called True Negative Rate) describes the fraction of items, which were not assigned the class in question correctly (true negatives) to all items, that do not belong to the class in question (true negatives and false positives).</p>';
      case 'precision':
        return '<p>Precision (also called Positive Predictive Value) describes the fraction of items, which were correctly assigned the class in question (true positives) to the items which were assigned the class (true positives and false positives).</p><img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Precisionrecall.svg/495px-Precisionrecall.svg.png"><p>Read more about precision and recall on <a href="https://en.wikipedia.org/wiki/Precision_and_recall" target="_blank">Wikipedia</a>.</p>';
      case 'accuracy':
        return '<p>Accuracy is a fundamental metric that indicates how a model performs per class. It describes the relation between correctly assigned classes (true positives and true negatives) to all samples (true positives, true negatives, false positives and false negatives).</p><p>Read more about accuracy on <a href="https://developers.google.com/machine-learning/crash-course/classification/accuracy" target="_blank">Google</a></p>';
      case 'f1':
        return '<p>F1 score is the harmonic mean of precision and recall.</p><img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Precisionrecall.svg/495px-Precisionrecall.svg.png"><p>Read more about F1 on <a href="https://en.wikipedia.org/wiki/F-score" target="_blank">Wikipedia</a>.</p>';
      case 'fdr':
        return '<p>False Discovery Rate (FDR) is a metric, which sets samples, which were falsely assigned the class in question, into relation to any sample, which was classified as the class in question (false positive and true positive).</p><p>Read more about FDR on <a href="https://en.wikipedia.org/wiki/False_discovery_rate" target="_blank">Wikipedia</a>.</p>';
      case 'fnr':
        return '<p>False negative Rate (FNR) describes the relation between samples, which were incorrectly not identified as the class in question (false negatives), to samples which belong to the class in question (false negatives and true positives).</p><p>Read more about FNR on <a href="https://en.wikipedia.org/wiki/Type_I_and_type_II_errors#False_positive_and_false_negative_rates" target="_blank">Wikipedia</a>.</p>';
      case 'fpr':
        return '<p>False Positive Rate (FPR) describes the relation between samples, which were falsely identified as the class in question (false positives), and the samples which belong to other classes (false positives and true negatives).</p><p>Read more about FPR on <a href="https://en.wikipedia.org/wiki/False_positive_rate" target="_blank">Wikipedia</a>.</p>';
      case 'auc':
        return '<p>AUC stands for "Area under the ROC Curve." That is, AUC measures the entire two-dimensional area underneath the entire ROC curve (think integral calculus) from (0,0) to (1,1).</p><p>Read more about AUC on <a href="https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc" target="_blank">Google</a>.</p>';
      case 'distribution':
        return "<p>This chart shows the class distribution for the evaluation. It displays, which class was tested with how many images. If there is an imbalance, that may be due to the fact, that sampling was done to reflect the dataset 's original class imbalance.</p>";
      case 'duration':
        return '<p>This chart visualizes the milliseconds required during the evaluation. Each platform contains a bar for preprocessing and prediction. Preprocessing includes resizing and standardization of images. The durations relate to the whole dataset and are not averaged per image.</p>';
      case 'roc':
        return '<p>An ROC curve (receiver operating characteristic curve) is a graph showing the performance of a classification model at all classification thresholds. This curve plots True Positive Rate (TPR) and False Positive Rate(FPR). Lowering the classification threshold classifies more items as positive, thus increasing both False Positives and True Positives.</p><p>Read more about ROC on <a href="https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc" target="_blank">Google</a>.</p>';
      case null:
      default:
        return '';
    }
  }
}
