import { Injectable } from "@angular/core";

import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ImagenProvider {
  fileTransfer: FileTransferObject;

  constructor(public transfer: FileTransfer, private _http : HttpClient) {
    this.fileTransfer = this.transfer.create();
  }

  listar() : Observable<any>{
    return this._http.get("https://insons.serveo.net/api/imagen");
  }

  subir(imagen, data): Promise<any> {
    let options: FileUploadOptions = {
      chunkedMode: false,
      fileKey: 'imagen',
      fileName: 'filename.jpg',
      params: data
    };

    return this.fileTransfer.upload(
      imagen,
      "https://insons.serveo.net/api/imagen",
      options
    );
  }
}
