import { Injectable } from '@angular/core';
import {Talent} from "../model/talent.model";

@Injectable({
  providedIn: 'root'
})
export class TalentsListService {

  private talentsList: Talent[] = [
    new Talent('Ambidextrous' ,'Oburęczność', 0,2)
  ]

  constructor() { }

  getTalentsList() {
    return this.talentsList.slice();
  }

  getTalentById(id: number) {
    return this.talentsList[id];
  }
}
