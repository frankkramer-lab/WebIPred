# What is MedIPred?

Integrating deep learning into clinical workflows for medical image analysis holds promise for improving diagnostic accuracy. However, strict data privacy regulations and the sensitivity of clinical IT infrastructure limit the deployment of cloud-based solutions. This is WebIPred, a web-based application that loads deep learning models directly within the client’s web browser, protecting patient privacy while maintaining compatibility with clinical IT environments. WebIPred supports the application of pre-trained models published on Zenodo and other repositories, allowing clinicians to apply these models to real patient data without the need for extensive technical knowledge. This paper outlines WebIPred’s model integration system, prediction workflow, and privacy features. Our results show that WebIPred offers a privacy-protecting and flexible application for image classification, only relying on client-side processing. WebIPred combines its strong commitment to data privacy and security with a user-friendly interface that makes it easy for clinicians to integrate AI into their workflows.

A live version with full functionality is hosted on GitHub Pages at [https://frankkramer-lab.github.io/WebIPred](https://frankkramer-lab.github.io/WebIPred) and the corresponding source code for deploying own instances is available within the repository.

## Dataset and Model Training

We utilized the Chest X-Ray Images (Pneumonia) dataset, which consists of anterior-posterior chest X-rays of pediatric patients aged one to five years from Guangzhou Women and Children’s Medical Center. The dataset contains two classes: NORMAL and PNEUMONIA. All images were initially screened for quality control to remove low-quality or unreadable scans. Diagnoses were annotated by two expert physicians, and a third expert reviewed the evaluation set to account for any grading errors.

The dataset was split into training, validation, and test sets, and the model was trained using the AUCMEDI framework. AUCMEDI has been successfully applied to a variety of medical imaging datasets, achieving high classification performance, and demonstrating strong accuracy in distinguishing between healthy and pneumonia-affected patients.

## Application Architecture

WebIPred is built using the Angular web framework \[5\] and relies on Tensorflow.js to load and apply pre-trained deep learning classifiers. The application runs entirely in the web browser, ensuring no patient data is transmitted to external servers. The web application is set up to download the trained model from Zenodo, a platform for sharing and preserving research data, including deep learning models.

Tensorflow.js requires the deep learning models to be stored in TensorFlow.js Layers format. This specific format consists of a JSON file that defines the model's architecture and a set of binary files containing the model's weights. Through Zenodo the models are provided in a compressed format (zip) to reduce the transmission load. This requires decompression within the web browser using the Javascript library JSZip. Once loaded, models are applied to medical images selected by the user, with all processing handled client-side through dedicated process workers. Angular web workers are a mechanism in Angular that allows for offloading CPU-intensive tasks to a separate thread, improving application performance and maintaining responsiveness.

## Privacy Considerations

The primary design goal of WebIPred is to conform to stringent data protection regulations, such as GDPR in Europe, which impose strict limitations on how patient data can be handled. To achieve this, all image data is processed locally in the browser. WebIPred does not store any data on servers, and once a session is closed, all data - images, predictions, and model metadata - is deleted from the browser’s memory. This architecture ensures that sensitive medical data remains secure, and there is no risk of data leakage to third-party servers.

## Model Management and Loading

WebIPred supports a wide range of pre-trained models available from Zenodo or other repositories. These models must be compatible with the Tensorflow.js format. Users can filter models based on specific needs, and once selected, the model’s binary files are loaded into the browser’s runtime memory. The loaded model can then be applied to patient images, generating predictions directly on the client’s device.

## Prediction Workflow

WebIPred is designed to be user-friendly, even for clinicians with limited technical expertise. The prediction process is guided through a three-step form.

1.  Model Selection:

    Users select a classifier from the available models, with descriptions provided to facilitate decision-making.

2.  Image Selection:

    CUsers upload one or more medical images, which are validated for format compatibility.

3.  Prediction and Visualization:

    After confirming the selected model and images, WebIPred processes the images, generating class probabilities for each image. Results are visualized using bar charts and tabulated data and can be exported as CSV files for further analysis.
