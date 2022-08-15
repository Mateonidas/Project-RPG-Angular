import { Injectable } from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  private _roundNumber: number = 1;

  constructor(private http: HttpClient) {
    let roundNumber = JSON.parse(<string>localStorage.getItem('roundNumber'));
    if(roundNumber != null) {
      this.roundNumber = roundNumber;
    } else {
      localStorage.setItem('roundNumber', JSON.stringify(this._roundNumber));
    }
  }

  postEndTurnCheck(skirmishCharacters: SkirmishCharacter[]) {
    return this.http.post<SkirmishCharacter[]>('http://localhost:8080/endTurnCheck', skirmishCharacters).toPromise()
      .then(data => {
        console.log(data);
      })
  }

  get roundNumber(): number {
    return JSON.parse(<string>localStorage.getItem('roundNumber'));
  }

  set roundNumber(value: number) {
    this._roundNumber = value;
  }

  async nextRound(skirmishCharacters: SkirmishCharacter[]) {
    this.roundNumber += 1;
    localStorage.setItem('roundNumber', JSON.stringify(this._roundNumber));
    await this.postEndTurnCheck(skirmishCharacters);
  }
}
