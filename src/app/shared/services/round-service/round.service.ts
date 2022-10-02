import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {HttpClient} from "@angular/common/http";
import {EndTurnCheck} from "../../../model/end-turn-check/end-turn-check.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RollDialogWindow} from "../../../dialog-window/roll-dialog-window/roll-dialog-window.component";

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  private _roundNumber: number = 1;
  public endTurnCheck: EndTurnCheck;

  constructor(private http: HttpClient,
              private modalService: NgbModal) {
    let roundNumber = JSON.parse(<string>localStorage.getItem('roundNumber'));
    if (roundNumber != null) {
      this.roundNumber = roundNumber;
    } else {
      localStorage.setItem('roundNumber', JSON.stringify(this._roundNumber));
    }
    this.endTurnCheck = new EndTurnCheck(roundNumber);
  }

  async nextRound() {
    this.roundNumber += 1;
    localStorage.setItem('roundNumber', JSON.stringify(this._roundNumber));
    this.endTurnCheck.tests = [];
    await this.postEndTurnCheck(this.endTurnCheck);
  }

  postEndTurnCheck(endTurnCheck: EndTurnCheck) {
    return this.http.post<EndTurnCheck>('http://localhost:8080/endTurnCheck', endTurnCheck).toPromise()
      .then(async data => {
        let endTurnCheck = new EndTurnCheck();
        Object.assign(endTurnCheck, data);
        if (endTurnCheck.tests.length > 0) {
          await this.testRolls(endTurnCheck);
        }
      })
  }

  async testRolls(endTurnCheck: EndTurnCheck) {
    for (const test of endTurnCheck.tests) {
      let skirmishCharacter = new SkirmishCharacter();
      Object.assign(skirmishCharacter, test.skirmishCharacter);
      test.skirmishCharacter = skirmishCharacter;
    }

    const modalRef = this.modalService.open(RollDialogWindow);
    modalRef.componentInstance.endTurnCheck = endTurnCheck;
    modalRef.componentInstance.testType = "Testy Stanów"
    await modalRef.result.then(async () => {
      await this.postEndTurnTestsCheck(endTurnCheck);
    })
  }

  async postEndTurnTestsCheck(endTurnCheck: EndTurnCheck) {
    return this.http.post<EndTurnCheck>('http://localhost:8080/endTurnTestsCheck', endTurnCheck).toPromise();
  }

  get roundNumber(): number {
    return JSON.parse(<string>localStorage.getItem('roundNumber'));
  }

  set roundNumber(value: number) {
    this._roundNumber = value;
  }

  clearData() {
    this.roundNumber = 1;
    localStorage.setItem('roundNumber', JSON.stringify(this._roundNumber));
  }
}
