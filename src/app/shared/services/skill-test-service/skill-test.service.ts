import {Injectable, Injector} from '@angular/core';
import {RollService} from "../roll-service/roll.service";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {SkillsList} from "../../../model/skill/skill.model";
import {Characteristics} from "../../../model/characteristic/characteristic.model";
import {ConditionService} from "../condition-service/condition.service";
import {ConditionsList} from "../../../model/conditions/conditions-list.model";
import {ServiceModel} from "../service.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class SkillTestService extends ServiceModel {

  constructor(public injector: Injector,
              public modalService: NgbModal) {
    super(modalService);
  }

  async enduranceTest(character: SkirmishCharacter) {
    character.roll.clearRoll();
    let rollResult = await this.createRollDialogAsync(character.name + ': Test Odporności (k100)', false);
    character.roll.value = rollResult.roll;
    character.roll.modifier = rollResult.modifier;

    let trait = character.skills.find(skill => skill.base.nameTranslation == SkillsList.endurance.nameTranslation);
    if (trait === undefined) {
      trait = character.characteristics.getCharacteristic(Characteristics.toughness);
    }

    const conditionService = this.injector.get(ConditionService);
    conditionService.checkCharacterConditionForTest(
      character,
      ConditionsList.broken,
      ConditionsList.poisoned,
      ConditionsList.stunned,
      ConditionsList.fatigued
    )

    RollService.calculateRollResult(trait.value, character);
  }
}
