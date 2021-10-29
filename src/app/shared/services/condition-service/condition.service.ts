import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {Condition} from "../../../model/conditions/condition.model";
import {ConditionsList} from "../../../model/conditions/conditions-list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RollService} from "../roll-service/roll.service";
import {SkillsList} from "../../../model/skill/skill.model";
import {ServiceModel} from "../service.model";

@Injectable({
  providedIn: 'root'
})
export class ConditionService extends ServiceModel {

  private conditionModifier = 0;

  constructor(modalService: NgbModal) {
    super(modalService);
  }

  endTurnCheckConditions(character: SkirmishCharacter) {
    for (let condition of character.conditions) {
      switch (condition.base) {
        case ConditionsList.ablaze: {
          this.checkAblaze(character, condition);
          break;
        }
        case ConditionsList.bleeding: {
          this.checkBleeding(character, condition);
          break;
        }
        case ConditionsList.blinded: {
          this.checkBlinded(condition);
          break;
        }
        case ConditionsList.broken: {
          this.checkBroken(character, condition);
          break;
        }
        case ConditionsList.deafened: {
          this.checkDeafened(condition);
          break;
        }
        case ConditionsList.poisoned: {
          this.checkPoisoned(character, condition);
          break;
        }
        case ConditionsList.stunned: {
          this.checkStunned(character, condition);
          break;
        }
        case ConditionsList.surprised: {
          this.checkSurprised(character);
          break;
        }
      }
    }

    this.checkCharacterConscious(character);
    this.clearConditionsWithZeroValue(character);
  }

  checkCharacterConscious(character: SkirmishCharacter) {
    let isUnconscious = character.checkIfHasCondition(ConditionsList.unconscious)
    let isPoisoned = character.checkIfHasCondition(ConditionsList.poisoned)

    if (character.currentWounds > 0) {
      character.resetUnconsciousCounter();
      if (isUnconscious) {
        character.removeCondition(ConditionsList.unconscious);
        character.addCondition(ConditionsList.prone);
        character.addCondition(ConditionsList.fatigued);
      }
    } else if (character.currentWounds <= 0) {
      if (!character.isDead
        && !isUnconscious
      ) {
        this.checkUnconsciousCounter(character, isPoisoned);
      } else if (!character.isDead && isUnconscious) {
        if (isPoisoned) {
          if (character.unconsciousCounter > 0) {
            character.unconsciousCounter -= 1;
          } else if (character.unconsciousCounter == 0) {
            this.createRollDialog(character.name + ': Śmierć z zatrucia (k100)', true)
              .subscribe((value: { roll: number, modifier: number }) => {
                character.roll.value = value.roll;
                character.roll.modifier = value.modifier;
                this.checkDeathFromPoison(character);
              })
          }
        }
      }
    }
  }

  private checkUnconsciousCounter(character: SkirmishCharacter, isPoisoned: boolean) {
    if (character.unconsciousCounter > 0) {
      character.unconsciousCounter -= 1;
    } else {
      character.addCondition(ConditionsList.unconscious);
      if (isPoisoned) {
        character.resetUnconsciousCounter();
      }
    }
  }

  private checkDeathFromPoison(character: SkirmishCharacter) {
    RollService.calculateRollResult(character.characteristics.toughness.value, character);
    if (character.roll.isSuccessful) {
      character.isDead = true;
    } else {
      character.unconsciousCounter = -1;
    }
  }

  clearConditionsWithZeroValue(character: SkirmishCharacter) {
    for (let condition of character.conditions) {
      if (condition.value <= 0) {
        switch (condition.base) {
          case ConditionsList.bleeding: {
            character.removeCondition(condition.base);
            character.addCondition(ConditionsList.fatigued);
            break;
          }
          default: {
            character.removeCondition(condition.base);
          }
        }
      }
    }
  }

  private setConditionModifier(modifier: number) {
    if (modifier > this.conditionModifier) {
      this.conditionModifier = modifier;
    }
  }

  private checkAblaze(character: SkirmishCharacter, condition: Condition) {
    if (condition.base === ConditionsList.ablaze) {
      this.createRollDialog(character.name + ': ' + condition.base.nameTranslation + '(k10)', false)
        .subscribe((value: { roll: number, modifier: number }) => {
          let damage = value.roll + (condition.value - 1);
          character.currentWounds -= this.calculateAblazeDamage(damage, character);
        })
    }
  }

  private calculateAblazeDamage(damage: number, character: SkirmishCharacter) {
    let finalDamage = damage - RollService.calculateTraitBonus(character.characteristics.toughness.value) - character.getArmorFromLessArmoredLocalization();

    if (finalDamage <= 0) {
      finalDamage = 1;
    }

    return finalDamage;
  }

  private checkBleeding(character: SkirmishCharacter, condition: Condition) {
    if (character.checkIfHasCondition(ConditionsList.unconscious) && !character.isDead) {
      this.createRollDialog(character.name + ': ' + condition.base.nameTranslation + '(k100)', false)
        .subscribe((value: { roll: number, modifier: number }) => {
          this.checkBleedingOut(condition, value, character);
        })
    } else if (!character.isDead) {
      character.currentWounds -= condition.value;
      if (character.currentWounds <= 0) {
        character.currentWounds = 0;
        character.addCondition(ConditionsList.unconscious);
      }
    }
  }

  private checkBleedingOut(
    condition: Condition,
    value: { roll: number; modifier: number },
    character: SkirmishCharacter) {
    let deadBorder = condition.value * 10;
    if (RollService.checkIfRollIsDouble(value.roll)) {
      condition.value -= 1;
    } else if (value.roll <= deadBorder) {
      character.isDead = true;
    }
  }

  private checkBroken(character: SkirmishCharacter, condition: Condition) {
    if (!character.isEngaged) {
      this.createRollDialog(character.name + ': ' + condition.base.nameTranslation + '(k100)', true)
        .subscribe((value: { roll: number, modifier: number }) => {
          character.roll.value = value.roll;
          character.roll.modifier = value.modifier;
          this.calculateBrokenLevel(character, condition);
        })
    }
  }

  private calculateBrokenLevel(character: SkirmishCharacter, condition: Condition) {
    let skill = character.getSkill(SkillsList.cool);
    if (skill === undefined) {
      skill = character.characteristics.willpower;
    }
    RollService.calculateRollResult(skill.value, character);
    if (character.roll.isSuccessful) {
      condition.value -= character.roll.successLevel + 1;
      if (condition.value <= 0) {
        character.removeCondition(ConditionsList.broken);
        character.addCondition(ConditionsList.fatigued);
      }
    }
  }

  private checkBlinded(condition: Condition) {
    condition.value -= 0.5;
  }

  private checkDeafened(condition: Condition) {
    condition.value -= 1;
  }

  private checkPoisoned(character: SkirmishCharacter, condition: Condition) {
    character.currentWounds -= condition.value;
    if (character.currentWounds <= 0) {
      character.currentWounds = 0;
      character.addCondition(ConditionsList.unconscious);
    } else {
      this.createRollDialog(character.name + ': ' + condition.base.nameTranslation + '(k100)', true)
        .subscribe((value: { roll: number, modifier: number }) => {
          character.roll.value = value.roll;
          character.roll.modifier = value.modifier;
          this.calculatePoisonedLevel(character, condition);
        })
    }
  }

  private calculatePoisonedLevel(character: SkirmishCharacter, condition: Condition) {
    let skill = character.getSkill(SkillsList.endurance);
    if (skill === undefined) {
      skill = character.characteristics.toughness;
    }
    RollService.calculateRollResult(skill.value, character);
    if (character.roll.isSuccessful) {
      condition.value -= character.roll.successLevel + 1;
      if (condition.value <= 0) {
        character.removeCondition(ConditionsList.poisoned);
        character.addCondition(ConditionsList.fatigued);
      }
    }
  }

  private checkStunned(character: SkirmishCharacter, condition: Condition) {
    this.createRollDialog(character.name + ': ' + condition.base.nameTranslation + '(k100)', true)
      .subscribe((value: { roll: number, modifier: number }) => {
        character.roll.value = value.roll;
        character.roll.modifier = value.modifier;
        this.calculateStunnedLevel(character, condition);
      })
  }

  private calculateStunnedLevel(character: SkirmishCharacter, condition: Condition) {
    let skill = character.getSkill(SkillsList.endurance);
    if (skill === undefined) {
      skill = character.characteristics.toughness;
    }
    RollService.calculateRollResult(skill.value, character);
    if (character.roll.isSuccessful) {
      condition.value -= character.roll.successLevel + 1;
      if (condition.value <= 0) {
        character.removeCondition(ConditionsList.stunned);
        if (!character.checkIfHasCondition(ConditionsList.fatigued)) {
          character.addCondition(ConditionsList.fatigued);
        }
      }
    }
  }

  private checkSurprised(character: SkirmishCharacter) {
    character.removeCondition(ConditionsList.surprised);
  }

  fightCheckCondition(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
    for (let condition of owner.conditions) {
      switch (condition.base) {
        case ConditionsList.blinded: {
          this.checkBlindedInFight(owner, opponent, condition.value);
          break;
        }
        case ConditionsList.broken: {
          this.checkBrokenInFight(condition.value);
          break;
        }
        case ConditionsList.deafened: {
          this.checkDeafenedInFight(owner, opponent, condition.value);
          break;
        }
        case ConditionsList.entangled: {
          this.checkEntangledInFight(condition.value);
          break;
        }
        case ConditionsList.fatigued: {
          this.checkFatiguedInFight(condition.value);
          break;
        }
        case ConditionsList.poisoned: {
          this.checkPoisonedInFight(condition.value);
          break;
        }
        case ConditionsList.prone: {
          this.checkProneInFight(opponent);
          break;
        }
        case ConditionsList.stunned: {
          this.checkStunnedInFight(opponent, condition.value);
          break;
        }
        case ConditionsList.surprised: {
          this.checkSurprisedInFight(owner, opponent);
          break;
        }
      }
    }

    owner.roll.modifier -= this.conditionModifier;
  }

  private checkBlindedInFight(owner: SkirmishCharacter, opponent: SkirmishCharacter, conditionLevel: number) {
    this.setConditionModifier(10 * Math.ceil(conditionLevel));
    if (!owner.isAttacker) {
      opponent.roll.modifier += 10 * Math.ceil(conditionLevel);
    }
  }

  private checkBrokenInFight(conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
  }

  private checkDeafenedInFight(owner: SkirmishCharacter, opponent: SkirmishCharacter, conditionLevel: number) {
    if (opponent.isAttacker && owner.isFlanked) {
      opponent.roll.modifier += 10 * conditionLevel;
    }
  }

  private checkEntangledInFight(conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
  }

  private checkFatiguedInFight(conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
  }

  private checkPoisonedInFight(conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
  }

  private checkProneInFight(opponent: SkirmishCharacter) {
    this.setConditionModifier(20);
    opponent.roll.modifier += 20;
  }

  private checkStunnedInFight(opponent: SkirmishCharacter, conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
    opponent.advantage += 1;
  }

  private checkSurprisedInFight(character: SkirmishCharacter, opponent: SkirmishCharacter) {
    opponent.advantage += 1;
    opponent.roll.modifier += 20;
    character.removeCondition(ConditionsList.surprised);
  }

  public checkProneAfterDamage(character: SkirmishCharacter) {
    if (character.currentWounds <= 0) {
      character.currentWounds = 0;
      character.addCondition(ConditionsList.prone);
    }
  }
}
