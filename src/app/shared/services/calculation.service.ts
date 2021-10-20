import { Injectable } from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  calculateSuccessLevelDifference(firstSuccessLevel: number, secondSuccessLevel: number) {
    return firstSuccessLevel - secondSuccessLevel;
  }

  calculateTraitBonus(traitValue: number) {
    return Math.floor(traitValue / 10);
  }

  calculateSuccessLevel(skillValue: number, skirmishCharacter: SkirmishCharacter) {
    return (Math.floor((skillValue + skirmishCharacter.modifier) / 10)
      - Math.floor(skirmishCharacter.roll / 10)
      + skirmishCharacter.advantage);
  }
}
