import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Journey } from '../pages/journey/journey';
import { Stage } from '../pages/stage/stage';
import { stageDescription } from '../pages/stageDescription/stageDescription';
import { stageHospitality } from '../pages/stageHospitality/stageHospitality';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Journey,
    Stage,
    stageDescription,
    stageHospitality
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Journey,
    Stage,
    stageDescription,
    stageHospitality
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
