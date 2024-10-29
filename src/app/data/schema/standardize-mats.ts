import { Mat } from '@techstark/opencv-js';
/**
 * Collection of [openCV Mats](https://docs.opencv.org/3.4/d3/db2/structCvMat.html), that are necessary during image standardization
 */
export interface StandardizeMats {
  /**
   * [OpenCV Mat](https://docs.opencv.org/3.4/d3/db2/structCvMat.html), that contains mean values per color channel
   */
  mean: Mat;
  /**
   * [OpenCV Mat](https://docs.opencv.org/3.4/d3/db2/structCvMat.html), that contains standard deviation values per color channel
   */
  std: Mat;
  /**
   * [OpenCV Mat](https://docs.opencv.org/3.4/d3/db2/structCvMat.html), that contains 255 for all pixels and color values
   */
  shift: Mat;
}
