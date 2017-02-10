import { Component, OnInit } from '@angular/core';
import { CalculatorService } from './services/calculator.service';

@Component({
  selector: 'my-app',
  templateUrl: 'src/app.template.html',
  styleUrls: ['src/app.css'],
  providers: [CalculatorService]
})
export class App implements OnInit {
  constructor() { }

  ngOnInit() { }
}
