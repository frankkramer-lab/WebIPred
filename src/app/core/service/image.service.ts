import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as cv from '@techstark/opencv-js';
import { Mat } from '@techstark/opencv-js';
import { ImageDimensions } from '../../data/schema/image-dimensions';
import { StandardizeMats } from '../../data/schema/standardize-mats';
import * as tf from '@tensorflow/tfjs';
import { Tensor, Tensor3D, Tensor4D } from '@tensorflow/tfjs';
import { Prediction } from '../../data/schema/prediction';
import { ModelSummary } from '../../data/schema/model-summary';
import { environment } from '../../../environments/environment';

/**
 * Service responsible for image-related operations
 */
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  /**
   * [Parula color map](https://de.mathworks.com/help/matlab/ref/parula.html)
   * @private
   */
  private readonly RGB_COLORMAP = [
    0.2422, 0.1504, 0.6603, 0.25039, 0.165, 0.70761, 0.25777, 0.18178, 0.75114,
    0.26473, 0.19776, 0.79521, 0.27065, 0.21468, 0.83637, 0.27511, 0.23424,
    0.87099, 0.2783, 0.25587, 0.89907, 0.28033, 0.27823, 0.9221, 0.28134,
    0.3006, 0.94138, 0.28101, 0.32276, 0.95789, 0.27947, 0.34467, 0.97168,
    0.27597, 0.36668, 0.9829, 0.26991, 0.3892, 0.9906, 0.26024, 0.41233,
    0.99516, 0.24403, 0.43583, 0.99883, 0.22064, 0.46026, 0.99729, 0.19633,
    0.48472, 0.98915, 0.1834, 0.50737, 0.9798, 0.17864, 0.52886, 0.96816,
    0.17644, 0.5499, 0.95202, 0.16874, 0.57026, 0.93587, 0.154, 0.5902, 0.9218,
    0.14603, 0.60912, 0.90786, 0.13802, 0.62763, 0.89729, 0.12481, 0.64593,
    0.88834, 0.11125, 0.6635, 0.87631, 0.09521, 0.67983, 0.85978, 0.068871,
    0.69477, 0.83936, 0.029667, 0.70817, 0.81633, 0.0035714, 0.72027, 0.7917,
    0.0066571, 0.73121, 0.76601, 0.043329, 0.7411, 0.73941, 0.096395, 0.75,
    0.71204, 0.14077, 0.7584, 0.68416, 0.1717, 0.76696, 0.65544, 0.19377,
    0.77577, 0.6251, 0.21609, 0.7843, 0.5923, 0.24696, 0.7918, 0.55674, 0.29061,
    0.79729, 0.51883, 0.34064, 0.8008, 0.47886, 0.3909, 0.80287, 0.43545,
    0.44563, 0.80242, 0.39092, 0.5044, 0.7993, 0.348, 0.56156, 0.79423, 0.30448,
    0.6174, 0.78762, 0.26124, 0.67199, 0.77927, 0.2227, 0.7242, 0.76984,
    0.19103, 0.77383, 0.7598, 0.16461, 0.82031, 0.74981, 0.15353, 0.86343,
    0.7406, 0.15963, 0.90354, 0.73303, 0.17741, 0.93926, 0.72879, 0.20996,
    0.97276, 0.72977, 0.23944, 0.99565, 0.74337, 0.23715, 0.99699, 0.76586,
    0.21994, 0.9952, 0.78925, 0.20276, 0.9892, 0.81357, 0.18853, 0.97863,
    0.83863, 0.17656, 0.96765, 0.8639, 0.16429, 0.96101, 0.88902, 0.15368,
    0.95967, 0.91346, 0.14226, 0.9628, 0.93734, 0.12651, 0.96911, 0.96063,
    0.10636, 0.9769, 0.9839, 0.0805,
  ];
  /**
   * Color-channel specific constants, required for diverse standardization functions.
   */
  private readonly MEAN_RGB = {
    red: 0.485,
    green: 0.456,
    blue: 0.406,
  };

  /**
   * Color-channel specific constants, required for diverse standardization functions.
   */
  private readonly STD_RGB = {
    red: 0.229,
    green: 0.224,
    blue: 0.225,
  };
  /**
   * True, if openCV is ready for use
   * @private
   */
  private cvReady = false;
  /**
   * Collection of matrices used during torch standardization
   * @private
   */
  private standardizeMats: StandardizeMats | null = null;
  /**
   * @deprecated
   * Initializes standardize matrices
   * @param mat Matrix used as a reference in size and type
   */
  private initStandardizeMats = (mat: Mat): void => {
    // Matrix: mean
    const dataMean = Array.from({ length: mat.cols * mat.rows }, () => [
      this.MEAN_RGB.red,
      this.MEAN_RGB.green,
      this.MEAN_RGB.blue,
    ]);
    const matMean = cv.matFromArray(
      mat.rows,
      mat.cols,
      mat.type(),
      dataMean.flat()
    );

    // Matrix: std
    const dataStd = Array.from({ length: mat.cols * mat.rows }, () => [
      this.STD_RGB.red,
      this.STD_RGB.green,
      this.STD_RGB.blue,
    ]);
    const matStd = cv.matFromArray(
      mat.rows,
      mat.cols,
      mat.type(),
      dataStd.flat()
    );

    // Matrix: shift
    const dataShift = Array.from({ length: mat.cols * mat.rows }, () => [
      255, 255, 255,
    ]);
    const matShift = cv.matFromArray(
      mat.rows,
      mat.cols,
      mat.type(),
      dataShift.flat()
    );
    this.standardizeMats = {
      mean: matMean,
      std: matStd,
      shift: matShift,
    };
  };

  /**
   * @deprecated
   * Standardize using the torch algorithm
   * @param mat Matrix to standardize
   */
  private standardizeTorch = (mat: Mat): Mat => {
    if (!this.standardizeMats) {
      this.initStandardizeMats(mat);
    }
    if (this.standardizeMats) {
      mat.convertTo(mat, cv.CV_32FC3); // convert to 3 channel float
      cv.divide(mat, this.standardizeMats.shift, mat); // shift to [0:1]
      cv.subtract(mat, this.standardizeMats.mean, mat); // subtract mean
      cv.divide(mat, this.standardizeMats.std, mat); // divide by std
    }

    return mat;
  };
  /**
   * @deprecated
   * Extracts image data from an openCV matrix
   * @param mat OpenCV matrix
   */
  private getImageData = (mat: Mat) => {
    let imageData;
    switch (mat.type()) {
      case cv.CV_32FC4:
      case cv.CV_32FC3:
      case cv.CV_32FC1:
      case cv.CV_32F:
        imageData = mat.data32F;
        break;

      case cv.CV_8UC4:
      case cv.CV_8UC3:
      case cv.CV_8UC1:
      case cv.CV_8U:
      default:
        imageData = mat.data;
        break;
    }
    return imageData;
  };

  /**
   * Indicates, if openCV is ready to be used. Since the library needs a few seconds to setup on app load, this function should be called on application start-up.
   */
  getCvSetupSuccessful(): Observable<boolean> {
    return new Observable((subscriber) => {
      try {
        cv.getBuildInformation();
        this.cvReady = true;
        subscriber.next(true);
      } catch (e) {
        subscriber.next(false);
      } finally {
        subscriber.complete();
      }
    });
  }

  /**
   * Takes a list of files and creates a list of {@link "app/data/schema/prediction"!Prediction}s
   * @param files List of files, chosen in the prediction form
   * @param nextId Next ID available for the predictions
   * @param model Model to link to the predictions
   */
  filesToPredictions(
    files: File[],
    nextId: number,
    model: ModelSummary
  ): Observable<Prediction[]> {
    return new Observable<Prediction[]>((subscriber) => {
      let id = nextId;
      const observables$ = files.map((file: File) => this.getFileData(file));
      const filenames = files.map((file: File) => file.name);

      return forkJoin(observables$).subscribe((base64Files) => {
        const predictions = base64Files.map(
          (
            fileData: { data: string; imageDimensions: ImageDimensions } | null,
            index: number
          ): Prediction => {
            id += 1;
            return {
              id,
              filename: filenames[index],
              imageDimensions: fileData
                ? fileData.imageDimensions
                : { width: 1, height: 1 },
              createdOn: new Date(),
              inProcessing: true,
              model,
              base64: fileData ? fileData.data : '',
            };
          }
        );
        subscriber.next(predictions);
        subscriber.complete();
      });
    });
  }

  /**
   * Extracts base64 encoded image data and its dimensions from an image file
   * @param file Image file
   */
  getFileData(
    file: File
  ): Observable<{ data: string; imageDimensions: ImageDimensions } | null> {
    return new Observable<{
      data: string;
      imageDimensions: ImageDimensions;
    } | null>((subscriber) => {
      const image = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          image.onload = () => {
            subscriber.next({
              data: reader.result as string,
              imageDimensions: {
                width: image.width,
                height: image.height,
              },
            });
            subscriber.complete();
          };
          image.src = reader.result as string;
        } else {
          subscriber.next(null);
          subscriber.complete();
        }
      };

      reader.onerror = (e) => {
        console.warn(e);
        subscriber.next(null);
        subscriber.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Converts a tensor to its base64 image representation
   * @param tensor Tensor of three dimensions, which should be rendered
   * @param imageDimensions Width, height and optionally number of channels for the image
   */
  tensorToBase64 = (
    tensor: Tensor3D,
    imageDimensions: ImageDimensions
  ): Observable<string> => {
    return new Observable<string>((subscriber) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      tf.browser.toPixels(tensor).then((data) => {
        const imgData = new ImageData(
          data,
          imageDimensions.width,
          imageDimensions.height
        );
        canvas.width = imageDimensions.width;
        canvas.height = imageDimensions.height;

        ctx.putImageData(imgData, 0, 0);
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              subscriber.next((reader.result as string) ?? null);
              subscriber.complete();
            };

            reader.onerror = (e) => {
              console.warn(e);
              subscriber.next('');
              subscriber.complete();
            };

            reader.readAsDataURL(blob);
          }
        });
      });
    });
  };

  /**
   * @deprecated
   * Extracts an image file's base64 encoded image data
   * @param file Image file
   */
  getBase64(file: File): Observable<string | null> {
    return new Observable<string | null>((subscriber) => {
      const reader = new FileReader();
      reader.onload = () => {
        subscriber.next((reader.result as string) ?? null);
        subscriber.complete();
      };

      reader.onerror = (e) => {
        console.warn(e);
        subscriber.next(null);
        subscriber.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * @deprecated
   * Infers how many channels an image has, based on its dimensions and number of data points
   * @param dataLength Number of data points (aka pixel values)
   * @param imageDimensions Width and height of the image
   */
  inferChannels = (
    dataLength: number,
    imageDimensions: ImageDimensions
  ): number => {
    if (imageDimensions.width === 0 || imageDimensions.height === 0) {
      console.log(
        'Image has width or height of 0! Falling back to three channels ...'
      );
      return 3;
    }
    return dataLength / (imageDimensions.width * imageDimensions.height);
  };

  /**
   * @deprecated
   * Converts a list of pixel values to an openCV matrix
   * @param imageData List of pixel values
   * @param imageDimensions Width, height and number of channels
   */
  createMatrixFromImageData = (
    imageData: number[],
    imageDimensions: ImageDimensions
  ): Mat => {
    let type: number;
    switch (imageDimensions.channels) {
      case 1:
        type = cv.CV_32FC1;
        break;
      case 4:
        type = cv.CV_32FC4;
        break;
      case 3:
      default:
        type = cv.CV_32FC3;
        break;
    }
    return cv.matFromArray(
      imageDimensions.height,
      imageDimensions.width,
      type,
      imageData
    );
  };
  /**
   * @deprecated
   * Resize an openCV matrix to the specified target dimensions, using the specified interpolation algorithm
   * @param mat Matrix to resize
   * @param targetDimensions Target dimensions for the image
   * @param mode Interpolation algorithm, see [OpenCV documentation for details](https://docs.opencv.org/2.4/modules/imgproc/doc/geometric_transformations.html#void%20resize(InputArray%20src,%20OutputArray%20dst,%20Size%20dsize,%20double%20fx,%20double%20fy,%20int%20interpolation))
   */
  resize = (mat: Mat, targetDimensions: ImageDimensions, mode: number): Mat => {
    if (mat.channels() === 4) {
      cv.cvtColor(mat, mat, cv.COLOR_RGBA2RGB);
    }
    cv.resize(
      mat,
      mat,
      new cv.Size(targetDimensions.width, targetDimensions.height),
      0,
      0,
      mode
    );
    return mat;
  };
  /**
   * @deprecated
   * Standardize an image, by the specified mode. As of right now, only "torch" is supported.
   * @param mat Image matrix to standardize
   * @param mode Mode to standardize by, i.e. "torch"
   */
  standardize = (mat: Mat, mode: string) => {
    switch (mode) {
      case 'torch':
      default:
        return this.standardizeTorch(mat);
    }
  };
  /**
   * @deprecated
   * Converts an openCV matrix to a tensor
   * @param mat Image matrix
   */
  matToTensor = (mat: Mat): Tensor3D => {
    const imageData = this.getImageData(mat);
    return tf.tensor3d(imageData, [mat.rows, mat.cols, mat.channels()]);
  };
  /**
   * @deprecated
   * Destroys standardize matrices, which are required for the standardization process.
   */
  cleanupStandardizeMats = () => {
    if (this.standardizeMats !== null) {
      this.standardizeMats.mean.delete();
      this.standardizeMats.std.delete();
      this.standardizeMats.shift.delete();
      this.standardizeMats = null;
    }
  };
  /**
   * @deprecated
   * Destroys the specified matrix
   * @param mat Matrix to destroy
   */
  cleanupMat = (mat: Mat) => {
    if (mat) {
      mat.delete();
    }
  };

  /**
   * @deprecated
   * Destroys each matrix in the list of matrices
   * @param mats List of matrices to destroy
   */
  cleanupMats = (mats: Mat[]) => {
    mats.forEach((mat) => mat.delete());
  };
  /**
   * Converts a base64 encoded image to a tensor
   * @param inputBase64 Image, base64 encoded
   */
  private imageToTensor = (inputBase64: string): Observable<Tensor3D> => {
    return new Observable<Tensor3D>((subscriber) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();

      // maximum length for image height or width
      const maxLength = 500;

      image.onload = () => {
        if (ctx) {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const originalTensor = tf.browser.fromPixels(image);
          let tensor: Tensor3D;

          if (
            originalTensor.shape[0] <= maxLength &&
            originalTensor.shape[1] <= maxLength
          ) {
            tensor = originalTensor;
          } else if (originalTensor.shape[0] > originalTensor.shape[1]) {
            const scale = maxLength / originalTensor.shape[0];
            const newShape: [number, number] = [
              maxLength,
              Math.round(scale * originalTensor.shape[1]),
            ];

            tensor = tf.image.resizeBilinear<Tensor3D>(
              originalTensor,
              newShape
            );
          } else {
            const scale = maxLength / originalTensor.shape[1];
            const newShape: [number, number] = [
              Math.round(scale * originalTensor.shape[0]),
              maxLength,
            ];
            tensor = tf.image.resizeBilinear<Tensor3D>(
              originalTensor,
              newShape
            );
          }

          subscriber.next(tensor);
          subscriber.complete();
        }
      };
      image.src = inputBase64;
    });
  };

  /**
   * Splits the given model into two sub-models:
   * <ul>
   *   <li>Sub-model 1: First part of the model, until the last layer with a four-dimensional output</li>
   *   <li>Sub-model 2: All layers after that</li>
   * </ul>
   *
   * @param modelSummary Original model
   */
  private getSubmodels = (
    modelSummary: ModelSummary
  ): Observable<{ modelOne: any; modelTwo: any }> => {
    return new Observable<{ modelOne: any; modelTwo: any }>((subscriber) => {
      if (modelSummary.links.convertedModel) {
        // Load model
        const modelLink = `${environment.backendPath}${
          environment.backendPath.endsWith('/') ? '' : '/'
        }${modelSummary.links.convertedModel}`;

        tf.loadLayersModel(modelLink).then((model) => {
          // Submodel 1

          let lastConvLayerIndex = model.layers.length - 1;
          while (lastConvLayerIndex >= 0) {
            const layer = model.layers[lastConvLayerIndex];

            if (layer.outputShape.length === 4) {
              break;
            }

            lastConvLayerIndex--;
          }

          const lastConvLayer = model.layers[lastConvLayerIndex];
          const lastConvLayerOutput: tf.SymbolicTensor =
            lastConvLayer.output as tf.SymbolicTensor;

          const modelOne = tf.model({
            inputs: model.inputs,
            outputs: lastConvLayerOutput,
          });

          // Submodel 2
          const subModel2Input: tf.SymbolicTensor = tf.input({
            shape: lastConvLayerOutput.shape.slice(1),
          });

          lastConvLayerIndex++;

          let currentOutput: tf.SymbolicTensor = subModel2Input;

          while (lastConvLayerIndex < model.layers.length) {
            currentOutput = model.layers[lastConvLayerIndex].apply(
              currentOutput as tf.SymbolicTensor
            ) as tf.SymbolicTensor;

            lastConvLayerIndex++;
          }

          const modelTwo = tf.model({
            inputs: subModel2Input,
            outputs: currentOutput,
          });

          subscriber.next({
            modelOne,
            modelTwo,
          });
          subscriber.complete();
        });
      }
    });
  };

  /**
   * Creates a class activation map for the given image and class. The models to do that, are created in the {@link getSubmodels} function.
   * This code is based on the [official tensorflow.js example to visualize a Conv2D output](https://github.com/tensorflow/tfjs-examples/blob/master/visualize-convnet/cam.js#L49).
   *
   * @param imageTensor Image to create class activation map for
   * @param label Class label to create class activation map for
   * @param models Sub-models, created by {@link getSubmodels}
   * @param imageDimensions Dimensions of the original input image
   */
  private buildHeatmap = (
    imageTensor: Tensor<tf.Rank>,
    label: number,
    models: { modelOne: any; modelTwo: any },
    imageDimensions: ImageDimensions
  ) => {
    let x: Tensor4D;
    if (imageTensor.shape.length === 3) {
      x = imageTensor.expandDims<Tensor4D>(0);
    } else {
      x = imageTensor as Tensor4D;
    }

    return tf.tidy(() => {
      // run the sub-model 2 and extract the slice of the probability output that corresponds to the desired class
      const convOutput2ClassOutput = (input: any) => {
        return models.modelTwo
          .apply(input, { training: true })
          .gather([label], 1);
      };

      // This is the gradient function of the output corresponding to the desired class with respect to its input (i.e., the output of the last convolutional layer of the original model)
      const gradFunction = tf.grad(convOutput2ClassOutput);

      // Calculate the values of the last conv layer's output
      const lastConvLayerOutputValues: tf.Tensor<tf.Rank> =
        models.modelOne.apply(x) as tf.Tensor<tf.Rank>;

      // Calculate the values of gradients of the class output w.r.t. the output of the last convolutional layer
      const gradValues = gradFunction(lastConvLayerOutputValues);

      // Calculate the weights of the feature maps
      const weights = tf.mean(gradValues, [0, 1, 2]);
      const weightedFeatures = lastConvLayerOutputValues.mul(weights);
      weights.dispose();

      // Create heat map by averaging and collapsing over all filters.
      let heatMap: Tensor4D = weightedFeatures.mean(-1);

      // apply ReLu to the weighted features
      heatMap = heatMap.relu();
      weightedFeatures.dispose();

      // normalize the heat map
      heatMap = heatMap.div(heatMap.max()).expandDims(-1);

      // should fit the original image, not the potentially resized input tensor
      heatMap = tf.image.resizeBilinear<Tensor4D>(heatMap, [
        imageDimensions.height,
        imageDimensions.width,
      ]);

      // Apply an RGB colormap on the heatMap to convert to grey scale heatmap into a RGB one
      const gradCAM: Tensor4D = this.applyColorMap(heatMap) as Tensor4D;
      heatMap.dispose();

      return gradCAM.squeeze<Tensor3D>();
    });
  };

  /**
   * Applies a color mark-up to the generated heatmap. The color map for highlighting is [MATLAB's parula](https://de.mathworks.com/help/matlab/ref/parula.html).
   * This code is based on the [official tensorflow.js example to visualize a Conv2D output](https://github.com/tensorflow/tfjs-examples/blob/1f6209de0bb9c198addc7bc13372259591aa7928/visualize-convnet/utils.js#L138).
   *
   * @param grayscaleMap Uncolored heatmap
   */
  private applyColorMap = (grayscaleMap: any): Tensor<tf.Rank> => {
    return tf.tidy(() => {
      const EPSILON = 1e-5;
      const xRange = grayscaleMap.max().sub(grayscaleMap.min());
      const xNorm = grayscaleMap
        .sub(grayscaleMap.min())
        .div(xRange.add(EPSILON));
      const xNormData = xNorm.dataSync();

      const height: number = grayscaleMap.shape[1] as number;
      const width: number = grayscaleMap.shape[2] as number;
      const buffer = tf.buffer([1, height, width, 3]);

      const colorMapSize = this.RGB_COLORMAP.length / 3;
      for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
          const pixelValue = xNormData[i * width + j];
          const row = Math.floor(pixelValue * colorMapSize);
          buffer.set(this.RGB_COLORMAP[3 * row], 0, i, j, 0);
          buffer.set(this.RGB_COLORMAP[3 * row + 1], 0, i, j, 1);
          buffer.set(this.RGB_COLORMAP[3 * row + 2], 0, i, j, 2);
        }
      }
      return buffer.toTensor();
    });
  };

  /**
   * Takes a model, class label and input image to create a colored class activation map.
   * @param model Model
   * @param label Class label
   * @param inputBase64 Input image, base64 encoded
   * @param imageDimensions Dimensions of the original input image
   */
  buildGradCam = (
    model: ModelSummary,
    label: number,
    inputBase64: string,
    imageDimensions: ImageDimensions
  ): Observable<Tensor3D> => {
    return new Observable<Tensor3D>((subscriber) => {
      // Image to tensor
      this.imageToTensor(inputBase64).subscribe((tensor) => {
        // Build sub-models
        this.getSubmodels(model).subscribe((models) => {
          // Build heatmap
          const heatmap = this.buildHeatmap(
            tensor,
            label,
            models,
            imageDimensions
          );
          subscriber.next(heatmap);
          subscriber.complete();
        });
      });
    });
  };
}
