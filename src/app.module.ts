import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

import {App} from './app.component';
import {Calculator} from './calculator/calculator.component';




@NgModule({
  imports: [ BrowserModule, FormsModule,ChartsModule ],
  declarations: [ App , Calculator],
  bootstrap: [ App ]
})
export class AppModule {}