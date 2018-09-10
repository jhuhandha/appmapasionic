import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";

import { Geolocation } from "@ionic-native/geolocation";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  MarkerCluster,
  GoogleMapsAnimation
} from "@ionic-native/google-maps";

import { ImagenPage } from "../imagen/imagen";
import { ImagenProvider } from "../../providers/imagen/imagen";
import { VerimagenPage } from "../verimagen/verimagen";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public modalCtrl: ModalController, 
    public _providerImagen : ImagenProvider
  ) {}

  ionViewDidLoad() {
    this.loadMap();

    this.map.one(GoogleMapsEvent.MAP_READY).then(data => {

      this._providerImagen.listar().subscribe(data => {

        let datos = [];
        data.forEach(element => {
          let latlng = new LatLng(element.lat, element.lng);
          datos.push({
            position: latlng,
            codigo : element._id,
            name: element._id,
            icon: "blue",
            nombre_imagen: element.ruta
          });
        });

        this.map.addMarkerCluster({
          boundsDraw: false,
          maxZoomLevel: 12,
          markers: datos,
          icons: [
            {
              min: 3,
              url: "./assets/img/logo.png",
              anchor: { x: 16, y: 16 },
              size: {
                width: 37,
                height: 37
              }
            }
          ]
        }).then((markerCluster: MarkerCluster) => {
    
          markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
            let latLng: LatLng = params[0];
            let marker: Marker = params[1];

            const modal = this.modalCtrl.create(VerimagenPage , {imagen: marker.get("nombre_imagen") });
            modal.present();
    
            marker.setAnimation(GoogleMapsAnimation.BOUNCE);
          });
    
        });

      }, err => {

      });


      // this.geolocation
      //   .getCurrentPosition()
      //   .then(resp => {
      //     // resp.coords.latitude
      //     // resp.coords.longitude

      //     console.log(resp.coords);

      //     let latlng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      //     this.map.addMarker({
      //       title: "Yo",
      //       icon: "blue",
      //       animation: "DROP",
      //       position: latlng
      //     });
      //   })
      //   .catch(error => {
      //     console.log("Error getting location", error);
      //   });

    });
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 6.255874,
          lng: -75.5744286
        },
        zoom: 18,
        tilt: 30
      }
    };

    let div_mapa = <HTMLElement>document.getElementById("mapa");
    this.map = GoogleMaps.create(div_mapa, mapOptions);

    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   alert('clicked');
    // });
  }


  abrir_modal(){
    const modal = this.modalCtrl.create(ImagenPage);
    modal.present();
  }
}
