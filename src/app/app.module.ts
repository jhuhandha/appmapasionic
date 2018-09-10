import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Plugins
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ImagenPage } from '../pages/imagen/imagen';
import { ImagenProvider } from '../providers/imagen/imagen';
import { HttpClientModule } from '@angular/common/http';
import { VerimagenPage } from '../pages/verimagen/verimagen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ImagenPage,
    VerimagenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ImagenPage,
    VerimagenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    ImagenProvider,
    FileTransfer
  ]
})
export class AppModule {}
