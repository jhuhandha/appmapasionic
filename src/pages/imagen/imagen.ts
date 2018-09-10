import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";

import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImagenProvider } from "../../providers/imagen/imagen";
import { Geolocation } from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: "page-imagen",
  templateUrl: "imagen.html"
})
export class ImagenPage {
  imagen: String = "";
  lat: Number;
  lng: Number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public pimagen: ImagenProvider,
    private geolocation: Geolocation
  ) {}

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then(resp => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    });
  }

  tomar_foto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        let loading = this.loadingCtrl.create({
          content: "Guardando foto"
        });
        loading.present();

        // this.imagen = "data:image/jpeg;base64," + imageData;

        this.pimagen
          .subir(imageData, { lat: this.lat, lng: this.lng })
          .then(data => {
            console.log(data);
            loading.dismiss();
          })
          .catch(err => {
            console.log(err);
            loading.dismiss();
          });
      },
      err => {}
    );
  }
}
