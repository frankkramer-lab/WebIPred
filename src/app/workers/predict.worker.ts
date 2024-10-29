/// <reference lib="webworker" />

import * as tf from '@tensorflow/tfjs';
import { LayersModel, Tensor2D, Tensor4D } from '@tensorflow/tfjs';
import { Observable } from 'rxjs';
import { Prediction } from '../data/schema/prediction';
import { Mat } from '@techstark/opencv-js';
import { StandardizeMats } from '../data/schema/standardize-mats';
import * as cv from '@techstark/opencv-js';
import { ImageDimensions } from '../data/schema/image-dimensions';
import * as JSZip from "jszip";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as JSZipUtils from "jszip-utils";

/**
 * Color-channel specific constants, required for diverse standardization functions.
 */
const MEAN_RGB = {
  red: 0.485,
  green: 0.456,
  blue: 0.406,
};

/**
 * Color-channel specific constants, required for diverse standardization functions.
 */
const STD_RGB = {
  red: 0.229,
  green: 0.224,
  blue: 0.225,
};

/**
 * Collection of matrices required for the torch standardization algorithm
 */
let standardizeMats: StandardizeMats | null = null;

/**
 * On incoming messages, the worker starts predicting the given data
 */
addEventListener('message', (event) => {
  const data = event.data;

  if (!data.modelLink) {
    throw Error('Missing link to model');
  } else if (
    !data.predictions ||
    data.predictions.length === 0 ||
    !data.images ||
    data.images.length === 0
  ) {
    throw Error('List of images missing or empty');
  }

  const modelInfo = data.predictions[0].model;

  // 1: Load model
  loadModel(data.modelLink).subscribe((model: LayersModel) => {
    // 2: Convert all base64 into matrices
    const mats = createMatrices(
      data.images,
      data.predictions.map((p: Prediction) => p.imageDimensions)
    );
    // 3: Resize all
    const resized = resizeMatrices(
      mats,
      {
        width: modelInfo.resizeWidth,
        height: modelInfo.resizeHeight,
      },
      modelInfo.resizeMode
    );
    // 4: Standardize all
    const standardized = standardizeMatrices(
      resized,
      modelInfo.standardizeMode
    );
    // 5: Tensorify all
    const tensor = createTensor(standardized);
    // 6: Predict all
    const predictions = model.predict(tensor) as Tensor2D;

    if (predictions.shape[0] === 1) {
      tf.expandDims(predictions);
    }

    postMessage({
      probabilities: predictions.arraySync(),
      workerId: data.workerId,
    });
  });
});

/**
 * Loads the model
 * @param path Path to the model
 */
export const loadModel = (path: string): Observable<LayersModel> => {
  return new Observable<LayersModel>((subscriber) => {
    console.log("loadLayersModel(path):"+path);

    new JSZip.external.Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent('https://zenodo.org/records/7785993/files/257299_model_converted.zip', (err: any, data: PromiseLike<any>) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }).then(function (data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return JSZip.loadAsync(data);
    }).then(function (zip) {
      // let files = zip.files;
      console.log(zip.files)
    })

    tf.loadLayersModel(path).then((model: LayersModel) => {
      subscriber.next(model);
    });
  });
};

/**
 * Extracts image data from a given matrix
 * @param mat Matrix
 */
export const getImageData = (mat: Mat) => {
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
 * Create a tensor for the given list of matrices
 * @param mats List of image matrices
 */
export const createTensor = (mats: Mat[]): tf.Tensor4D => {
  const tensors: any[] = [];
  for (let i = 0; i < mats.length; i++) {
    const mat = mats[i];
    const tensor = tf.tensor3d(getImageData(mat), [
      mat.rows,
      mat.cols,
      mat.channels(),
    ]);
    tensors.push(tensor);
  }
  cleanupMats(mats);
  return tf.stack(tensors) as Tensor4D;
};

/**
 * Infers channels for an image based on the length of data points and the image's dimensions
 * @param dataLength Number of pixel values
 * @param imageDimensions Width and height
 */
export const inferChannels = (
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
 * Create image matrices based on image data
 * @param imageData List of pixel values for all given images
 * @param imageDimensions List of image dimensions for each image
 */
export const createMatrices = (
  imageData: number[][],
  imageDimensions: ImageDimensions[]
): Mat[] => {
  const mats: Mat[] = [];

  for (let i = 0; i < imageData.length; i++) {
    const imageRaw = imageData[i];
    const dimensions = imageDimensions[i];

    const channels = inferChannels(imageRaw.length, dimensions);
    let type;
    switch (channels) {
      case 4:
        type = cv.CV_32FC4;
        break;
      case 1:
        type = cv.CV_32FC1;
        break;
      case 3:
      default:
        type = cv.CV_32FC3;
        break;
    }

    // number[] = ArrayBuffer
    const mat = cv.matFromArray(
      dimensions.height,
      dimensions.width,
      type,
      imageRaw
    );
    mats.push(mat);
  }

  return mats;
};

/**
 * Resize all matrices
 * @param mats List of image matrices
 * @param targetDimensions Target dimensions for all images
 * @param interpolation Interpolation algorithm
 */
export const resizeMatrices = (
  mats: Mat[],
  targetDimensions: ImageDimensions,
  interpolation: number
): Mat[] => {
  for (let i = 0; i < mats.length; i++) {
    const mat = mats[i];
    if (mat.channels() === 4) {
      cv.cvtColor(mat, mat, cv.COLOR_RGBA2RGB);
    }
    cv.resize(
      mat,
      mat,
      new cv.Size(targetDimensions.width, targetDimensions.height),
      0,
      0,
      interpolation
    );
  }
  return mats;
};

/**
 * Standardize a list of matrices using the torch algorithm
 * @param mats List of image matrices
 */
const standardizeMatricesTorch = (mats: Mat[]) => {
  for (let i = 0; i < mats.length; i++) {
    const mat = mats[i];

    if (!standardizeMats) {
      initStandardizeMats(mats[0]);
    }

    if (standardizeMats) {
      mat.convertTo(mat, cv.CV_32FC3); // convert to 3 channel float
      cv.divide(mat, standardizeMats.shift, mat); // shift to [0:1]
      cv.subtract(mat, standardizeMats.mean, mat); // subtract mean
      cv.divide(mat, standardizeMats.std, mat); // divide by std
    }
  }
  cleanupStandardizeMats();
  return mats;
};

/**
 * Standardize a list of matrices
 * @param mats List of image matrices
 * @param mode Mode to standardize the matrices by, defaults to 'torch'
 */
const standardizeMatrices = (mats: Mat[], mode: string): Mat[] => {
  switch (mode) {
    case 'torch':
    default:
      return standardizeMatricesTorch(mats);
  }
};

/**
 * Initializes standardize matrices, which are required for the torch standardization
 * @param mat Matrix that serves as a blueprint for the standardize matrices
 */
const initStandardizeMats = (mat: Mat) => {
  // Matrix: mean
  const dataMean = Array.from({ length: mat.cols * mat.rows }, () => [
    MEAN_RGB.red,
    MEAN_RGB.green,
    MEAN_RGB.blue,
  ]);
  const matMean = cv.matFromArray(
    mat.rows,
    mat.cols,
    mat.type(),
    dataMean.flat()
  );

  // Matrix: std
  const dataStd = Array.from({ length: mat.cols * mat.rows }, () => [
    STD_RGB.red,
    STD_RGB.green,
    STD_RGB.blue,
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
  standardizeMats = {
    mean: matMean,
    std: matStd,
    shift: matShift,
  };
};

/**
 * Cleans up standardize matrices
 */
const cleanupStandardizeMats = () => {
  if (standardizeMats !== null) {
    standardizeMats.mean.delete();
    standardizeMats.std.delete();
    standardizeMats.shift.delete();
    standardizeMats = null;
  }
};

/**
 * Cleans up a list of matrices
 * @param mats List of matrices to destroy
 */
const cleanupMats = (mats: Mat[]) => {
  mats.forEach((mat) => {
    mat.delete();
  });
};
