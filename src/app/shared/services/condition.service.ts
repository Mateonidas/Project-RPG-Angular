import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {Condition} from "../../model/conditions/condition.model";
import {ConditionsList} from "../../model/conditions/conditions-list.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RollDialogWindowComponent} from "../../dialog-window/roll-dialog-window/roll-dialog-window.component";
import {CalculationService} from "./calculation.service";
import {SkillsList} from "../../model/skill/skill.model";

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private conditionModifier = 0;

  constructor(private modalService: NgbModal,
              private calculateService: CalculationService) {
  }

  private createRollDialog(name: string, useModifier: boolean) {
    const modalRef = this.modalService.open(RollDialogWindowComponent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.useModifier = useModifier;
    return modalRef.componentInstance.emitter;
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
      }
    }
    character.clearConditionsWithZeroValue();
  }

  private checkAblaze(character: SkirmishCharacter, condition: Condition) {
    if (condition.base === ConditionsList.ablaze) {
      this.createRollDialog(character.name + ': ' + condition.base.nameTranslation + '(k10)', false)
        .subscribe((value: { roll: number, modifier: number}) => {
          let damage = value.roll + (condition.value - 1);
          this.calculateAblazeDamage(damage, character);
        })
    }
  }

  private calculateAblazeDamage(damage: number, character: SkirmishCharacter) {
    let finalDamage = damage - this.calculateService.calculateTraitBonus(character.characteristics.toughness.value) - character.getArmorFromLessArmoredLocalization();

    if (finalDamage <= 0) {
      finalDamage = 1;
    }

    character.currentWounds -= finalDamage;
  }

  private checkBleeding(character: SkirmishCharacter, condition: Condition) {
    character.currentWounds -= condition.value;
    if (character.currentWounds <= 0) {
      character.currentWounds = 0;
      if (character.checkIfHasCondition(ConditionsList.unconscious)) {
        this.createRollDialog(character.name + ': ' + condition.base.nameTranslation + '(k100)', false)
          .subscribe((value: { roll: number, modifier: number }) => {
            let deadBorder = condition.value * 10;
            if (value.roll <= deadBorder) {
              character.isDead = true;
            }
          })
      } else {
        character.addCondition(ConditionsList.unconscious);
      }
    }

  }

  private checkBroken(character: SkirmishCharacter, condition: Condition) {
    if(!character.isEngaged) {
      this.createRollDialog(character.name + ': ' + condition.base.nameTranslation + '(k100)', true)
        .subscribe((value: { roll: number, modifier: number }) => {
          character.roll = value.roll;
          character.modifier = value.modifier;
          let skill = character.getSkill(SkillsList.cool);
          if(skill === undefined) {
            skill = character.characteristics.willpower;
          }
          let successLevel = this.calculateService.calculateSuccessLevel(skill.value, character);
          if(successLevel >= 0) {
            condition.value -= successLevel + 1;
          }
        })
    }
  }

  private checkBlinded(condition: Condition) {
      condition.value -= 0.5;
  }

  private checkDeafened(condition: Condition) {
    condition.value -= 1;
  }

  private setConditionModifier(modifier: number){
    if(modifier > this.conditionModifier) {
      this.conditionModifier = modifier;
    }
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
      }
    }

    owner.modifier -= this.conditionModifier;
  }

  private checkBlindedInFight(owner: SkirmishCharacter, opponent: SkirmishCharacter, conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
    if (!owner.isAttacker) {
      opponent.modifier += 10 * conditionLevel;
    }
  }

  private checkBrokenInFight(conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
  }

  private checkDeafenedInFight(owner: SkirmishCharacter, opponent: SkirmishCharacter, conditionLevel: number) {
    if(opponent.isAttacker && owner.isFlanked) {
      this.setConditionModifier(10 * conditionLevel);
    }
  }

  private checkEntangledInFight(conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
  }

  private checkFatiguedInFight(conditionLevel: number) {
    this.setConditionModifier(10 * conditionLevel);
  }
}
