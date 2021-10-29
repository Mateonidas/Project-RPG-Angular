import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  private _roundNumber: number = 1;

  constructor() { }

  get roundNumber(): number {
    return this._roundNumber;
  }

  public nextRound() {
    this._roundNumber += 1;
  }
}
