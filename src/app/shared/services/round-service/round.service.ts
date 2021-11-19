import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  private _roundNumber: number = 1;

  constructor() {
    let roundNumber = JSON.parse(<string>localStorage.getItem('roundNumber'));
    if(roundNumber != null) {
      this.roundNumber = roundNumber;
    } else {
      localStorage.setItem('roundNumber', JSON.stringify(this._roundNumber));
    }
  }

  get roundNumber(): number {
    return JSON.parse(<string>localStorage.getItem('roundNumber'));
  }

  set roundNumber(value: number) {
    this._roundNumber = value;
  }

  public nextRound() {
    this.roundNumber += 1;
    localStorage.setItem('roundNumber', JSON.stringify(this._roundNumber));
  }
}
