import { Injectable } from '@angular/core';
import {RollService} from "../roll-service/roll.service";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {SkillsList} from "../../../model/skill/skill.model";
import {Characteristics} from "../../../model/characteristic/characteristic.model";
import {ConditionService} from "../condition-service/condition.service";
import {ConditionsList} from "../../../model/conditions/conditions-list.model";

@Injectable({
  providedIn: 'root'
})
export class SkillTestService {

  constructor(public conditionService: ConditionService) { }

  enduranceTest(character: SkirmishCharacter) {
    let trait = character.skills.find(skill => skill.base.nameTranslation == SkillsList.endurance.nameTranslation);
    if(trait === undefined) {
      trait = character.characteristics.getCharacteristic(Characteristics.toughness);
    }

    this.conditionService.checkCharacterConditionForTest(
      character,
      ConditionsList.broken,
      ConditionsList.poisoned,
      ConditionsList.stunned,
      ConditionsList.fatigued
    )

    RollService.calculateRollResult(trait.value, character);
  }
}
