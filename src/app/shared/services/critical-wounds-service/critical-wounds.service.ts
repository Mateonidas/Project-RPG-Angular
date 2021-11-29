import { Injectable } from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {Condition} from "../../../model/conditions/condition.model";
import {CriticalCondition, CriticalWound} from "../../../model/critical-wounds/critical-wounds.model";

@Injectable({
  providedIn: 'root'
})
export class CriticalWoundsService {

  constructor() { }

  public removeConditionFromCriticalWound(character: SkirmishCharacter, condition: Condition, removeValue: number) {
    //TODO poprawić usuwanie w przypadku wielu ran krytycznych z tym samym stanem
    for (let criticalWound of character.getCriticalWounds()) {
      for (let criticalCondition of criticalWound.criticalConditions) {
        if (criticalCondition.base.base.name == condition.base.name) {
          criticalCondition.base.value -= removeValue;
          if(criticalCondition.base.value < 0) {
            let removeValue = criticalCondition.base.value * -1;
            this.removeCriticalWoundIfHealed(criticalCondition, criticalWound, character);
            this.removeConditionFromCriticalWound(character, condition, removeValue);
          } else {
            this.removeCriticalWoundIfHealed(criticalCondition, criticalWound, character);
          }
          break;
        }
      }
    }
  }

  private removeCriticalWoundIfHealed(criticalCondition: CriticalCondition, criticalWound: CriticalWound, character: SkirmishCharacter) {
    if (criticalCondition.base.value <= 0) {
      criticalWound.removeCondition(criticalCondition.base.base);
      if (criticalWound.criticalConditions.length == 0) {
        if (criticalWound.criticalInjury.length == 0) {
          character.removeCriticalWound(criticalWound);
        }
      }
    }
  }
}
