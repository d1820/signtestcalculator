import { Component, OnInit } from '@angular/core';
import { CalculatorService, SignResultSet } from '../services/calculator.service';
import {ChartsModule, Color} from 'ng2-charts';


@Component({
  selector: 'calculator',
  templateUrl: 'src/calculator/calculator.template.html',
  styleUrls: ['src/calculator/calculator.css']
})
export class Calculator implements OnInit {
  result: SignResultSet;
  baseData: string = null;
  changeData: string = null;
  error: string;
  itemMatcher: string = "ignore";

  labels:string[] = ['No Effect', 'An Effect'];
  data:number[] = [];
  type:string = 'pie';

  constructor(private _calculatorService: CalculatorService) {

  }

  ngOnInit() {
  }

  clearForm(): void {
    this.baseData = null;
    this.changeData = null;
    this.error = null;
    this.itemMatcher = "ignore";

  }
  private _validateNumbers(nums): boolean {
    return nums.split(',').every((item) => {
      return !isNaN(Number(item));
    });
  }
  calculate(): boolean {
    this.error = null;
    if (!this.baseData && !this.changeData) {
      this.error = "Base data and Change data are required!";
      return;
    }
    if (!this._validateNumbers(this.baseData)) {
      this.error = "Base data has invalid data. Only numbers allowed";
      return;
    }

    if (!this._validateNumbers(this.changeData)) {
      this.error = "Change data has invalid data. Only numbers allowed";
      return;
    }

    var baseArray = this.baseData.split(',').map((item) => {
      if (item === "") {
        return 0;
      }
      return Number(item);
    });
    var changeArray = this.changeData.split(',').map((item) => {
      if (item === "") {
        return 0;
      }
      return Number(item);
    });
    if (baseArray.length !== changeArray.length) {
      this.error = "Base data and Change data item counts do not match";
      return;
    }
    this.result = this._calculatorService.calculateSign(baseArray, changeArray, this.itemMatcher);
    this.data = [Number(this.result.noEffect),Number(this.result.hasEffect)];
    return false;
  }
}
