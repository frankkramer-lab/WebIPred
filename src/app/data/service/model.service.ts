import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JSZip from "jszip";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as JSZipUtils from "jszip-utils";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  loadModel(path: string): string[]{
    // this.http.get('https://zenodo.org/records/7785993/files/257299_model_converted.zip')
    new JSZip.external.Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent('https://zenodo.org/records/7785993/files/257299_model_converted.zip', (err: any, data: PromiseLike<T> | T) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }).then(function (data) {
      return JSZip.loadAsync(<InputFileFormat>data);
    }).then(function (zip) {
      // let files = zip.files;
      console.log(zip.files)
      return [''];
    })

    return [''];
  }
}
