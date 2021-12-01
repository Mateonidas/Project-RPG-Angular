import { Injectable } from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {Condition} from "../../../model/conditions/condition.model";
import {CriticalWound} from "../../../model/critical-wounds/critical-wounds.model";

@Injectable({
  providedIn: 'root'
})
export class CriticalWoundsService {

  constructor() { }

  public removeConditionFromCriticalWound(character: SkirmishCharacter, condition: Condition, removeValue: number) {
    for (let criticalWound of character.criticalWounds) {
      for (let criticalCondition of criticalWound.criticalConditions) {
        if (criticalCondition.base.name == condition.base.name) {
          criticalCondition.value -= removeValue;
          if(criticalCondition.value < 0) {
            let removeValue = criticalCondition.value * -1;
            this.removeCriticalWoundIfHealed(criticalCondition, criticalWound, character);
            this.removeConditionFromCriticalWound(character, condition, removeValue);
          } else {
            this.removeCriticalWoundIfHealed(criticalCondition, criticalWound, character);
          }
          return;
        }
      }
    }
  }

  private removeCriticalWoundIfHealed(criticalCondition: Condition, criticalWound: CriticalWound, character: SkirmishCharacter) {
    if (criticalCondition.value <= 0) {
      criticalWound.removeCondition(criticalCondition.base);
      if (criticalWound.criticalConditions.length == 0) {
        if (criticalWound.criticalInjuries.length == 0) {
          character.removeCriticalWound(criticalWound);
        }
      }
    }
  }
}
