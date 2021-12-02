import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {Condition} from "../../../model/conditions/condition.model";
import {CriticalWound} from "../../../model/critical-wounds/critical-wounds.model";

@Injectable({
  providedIn: 'root'
})
export class CriticalWoundsService {

  constructor() {
  }

  public removeConditionFromCriticalWound(character: SkirmishCharacter, condition: Condition, removeValue: number) {
    for (let criticalWound of character.criticalWounds) {
      for (let criticalCondition of criticalWound.criticalConditions) {
        if (criticalCondition.base.name == condition.base.name) {
          criticalCondition.value -= removeValue;
          if (criticalCondition.value < 0) {
            let removeValue = criticalCondition.value * -1;
            criticalWound.removeCondition(criticalCondition.base);
            CriticalWoundsService.removeCriticalWoundIfHealed(criticalWound, character);
            this.removeConditionFromCriticalWound(character, condition, removeValue);
          } else {
            CriticalWoundsService.removeCriticalWoundIfHealed(criticalWound, character);
          }
          return;
        }
      }
    }
  }

  private static removeCriticalWoundIfHealed(criticalWound: CriticalWound, character: SkirmishCharacter) {
    if (criticalWound.criticalConditions.length == 0) {
      if (criticalWound.criticalInjuries.length == 0) {
        character.removeCriticalWound(criticalWound);
      }
    }
  }

  public static removeCriticalWoundsIfHealed(character: SkirmishCharacter) {
    for(let criticalWound of character.criticalWounds){
      CriticalWoundsService.removeCriticalWoundIfHealed(criticalWound, character);
    }
  }
}
