import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";

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
    return (Math.floor((skillValue + skirmishCharacter.modifier) / 10)
      - Math.floor(skirmishCharacter.roll / 10)
      + skirmishCharacter.advantage);
  }

  checkIfRollIsDouble(roll: number) {
    return roll.toLocaleString()[0] === roll.toLocaleString()[1];
  }
}
