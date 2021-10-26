import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {RollResult} from "../../model/roll/roll-result.model";

@Injectable({
  providedIn: 'root'
})
export class RollService {

  constructor() {
  }

  calculateSuccessLevelDifference(firstSuccessLevel: number, secondSuccessLevel: number) {
    return firstSuccessLevel - secondSuccessLevel;
  }

  static calculateTraitBonus(traitValue: number) {
    return Math.floor(traitValue / 10);
  }

  static calculateSuccessLevel(skillValue: number, skirmishCharacter: SkirmishCharacter) {
    let successLevel = (Math.floor((skillValue + skirmishCharacter.modifier) / 10)
      - Math.floor(skirmishCharacter.roll / 10)
      + skirmishCharacter.advantage);
    let isSuccessful = skillValue + skirmishCharacter.modifier >= skirmishCharacter.roll;

    return new RollResult(successLevel, isSuccessful);
  }

  checkIfRollIsDouble(roll: number) {
    return roll.toLocaleString()[0] === roll.toLocaleString()[1];
  }
}
