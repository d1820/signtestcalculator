import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {
  private _itemMatcher: string;
  private _p: number = 0.5;
  constructor() { }

  calculateSign(beforeData: Array<number>, afterData: Array<number>, itemMatcher: string): SignResultSet {
    this._itemMatcher = itemMatcher;
    const counts = this.doCounts(beforeData, afterData);
    // console.log("Num success = " + counts.success);
    // console.log("Num failure = " + counts.fail);
    let k = counts.success;
    let n = counts.fail + counts.success;
    const p_value = this.binomRightTail(k, n, this._p);
    return {
      noEffect: p_value.toFixed(4),
      hasEffect: (1 - p_value).toFixed(4)
    };
  }

  private choose(n: number, k: number): number {
    if (n == k) return 1; // Required special case
    let delta, iMax;

    if (k < n - k) { // Ex: Choose(100,3)
      delta = n - k;
      iMax = k;
    }
    else { // Ex: Choose(100,97)
      delta = k;
      iMax = n - k;
    }
    let ans = delta + 1;
    for (let i = 2; i <= iMax; ++i)
      ans = (ans * (delta + i)) / i;
    return ans;
  }


  private binomProb(k: number, n: number, p: number): number {
    // Probability of k "successes" in n trials
    // if p is prob of success on a single trial
    let c = this.choose(n, k);
    let left = Math.pow(p, k);
    let right = Math.pow(1.0 - p, n - k);
    return c * left * right;
  }

  private binomRightTail(k: number, n: number, p: number): number {
    // Probability of k or more successes in n trials
    let sum = 0.0;
    for (let i = k; i <= n; ++i)
      sum += this.binomProb(i, n, p);
    return sum;
  }

  private doCounts(before: Array<number>, after: Array<number>): countResult {
    let result = [0, 0, 0];
    for (let i = 0; i < before.length; ++i) {
      if (after[i] > before[i])
        ++result[0];  // Fail
      else if (after[i] < before[i])
        ++result[2]; // Success
      else {
        //tey equal
        switch (this._itemMatcher) {
          case "success":
            ++result[2]; // Success
            break;
          case "fail":
            ++result[0]; // Fail
            break;
          case "ignore":
            ++result[1]; // Neither
            break;
        }

      }

    }
    return {
      success: result[2],
      fail: result[0],
      ignore: result[1]
    };
  }

}

interface countResult {
  success: number,
  fail: number,
  ignore: number
}
export interface SignResultSet {
  noEffect: string,
  hasEffect: string
}