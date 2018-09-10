import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerimagenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verimagen',
  templateUrl: 'verimagen.html',
})
export class VerimagenPage {

  imagen : String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imagen = "https://insons.serveo.net/api/imagen/"+navParams.get('imagen')
  }
}
