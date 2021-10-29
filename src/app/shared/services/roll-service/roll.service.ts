import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";

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

  static calculateRollResult(skillValue: number, skirmishCharacter: SkirmishCharacter) {
    skirmishCharacter.roll.successLevel = this.calculateSuccessLevel(skillValue, skirmishCharacter);
    skirmishCharacter.roll.isDouble = this.checkIfRollIsDouble(skirmishCharacter.roll.value)
    skirmishCharacter.roll.isSuccessful = skillValue + skirmishCharacter.roll.modifier >= skirmishCharacter.roll.value;
  }

  static calculateFightRollResult(skillValue: number, skirmishCharacter: SkirmishCharacter) {
    skirmishCharacter.roll.successLevel = this.calculateSuccessLevel(skillValue, skirmishCharacter);
    skirmishCharacter.roll.isDouble = this.checkIfRollIsDouble(skirmishCharacter.roll.value)
    skirmishCharacter.roll.isSuccessful = skillValue >= skirmishCharacter.roll.value;
  }

  private static calculateSuccessLevel(skillValue: number, skirmishCharacter: SkirmishCharacter) {
    return Math.floor((skillValue + skirmishCharacter.roll.modifier) / 10)
      - Math.floor(skirmishCharacter.roll.value / 10)
      + skirmishCharacter.advantage;
  }

  static checkIfRollIsDouble(roll: number) {
    return roll.toLocaleString()[0] === roll.toLocaleString()[1];
  }
}
