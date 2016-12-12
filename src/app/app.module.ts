import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Journey } from '../pages/journey/journey';
import { Stage } from '../pages/stage/stage';
import { stageDescription } from '../pages/stageDescription/stageDescription';
import { stageHospitality } from '../pages/stageHospitality/stageHospitality';
import { stageMap } from '../pages/stageMap/stageMap';

@NgModule({
  declarations: [
    MyApp,
    Journey,
    Stage,
    stageDescription,
    stageHospitality,
    stageMap
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Journey,
    Stage,
    stageDescription,
    stageHospitality,
    stageMap
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
