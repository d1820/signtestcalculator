import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'

import {App} from './app.component';
import {Calculator} from './caclulator/calculator.component';




@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ App , Calculator],
  bootstrap: [ App ]
})
export class AppModule {}