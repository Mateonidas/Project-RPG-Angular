import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ServiceModel} from "../service.model";
import {BodyLocalizationList} from "../../../model/body-localization/body-localization.model";
import {InjuresList} from "../../../model/injures/injures-list.model";
import {RoundService} from "../round-service/round.service";
import {RollService} from "../roll-service/roll.service";
import {ConditionsList} from "../../../model/conditions/conditions-list.model";
import {SkirmishCharacterService} from "../skirmish-character-service/skirmish-character.service";
import {WeaponTraitsList} from "../../../model/weapon/weaponTraits/weapon.advantages.model";
import {ConditionService} from "../condition-service/condition.service";
import {AttackReportService} from "../../../dialog-window/report-dialog-window/attack-report-service/attack-report.service";

@Injectable({
  providedIn: 'root'
})
export class FightService extends ServiceModel {

  constructor(modalService: NgbModal,
              private roundService: RoundService,
              private skirmishCharacterService: SkirmishCharacterService,
              private conditionService: ConditionService,
              private attackReportService: AttackReportService,
              private rollService: RollService) {
    super(modalService);
  }

  fightCalculation(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    this.checkFightTraits(attacker, defender);
    RollService.calculateFightRollResult(attacker.getFightTrait().value, attacker);
    this.calculateDefenderSuccessLevel(defender);
    this.checkAttackResult(attacker, defender);
    this.attackReportService.createReport(attacker, defender);

    attacker.roll.clearRoll();
    defender.roll.clearRoll();
    this.skirmishCharacterService.updateSkirmishCharacter(attacker);
    this.skirmishCharacterService.updateSkirmishCharacter(defender);
  }

  private calculateDefenderSuccessLevel(defender: SkirmishCharacter) {
    if (defender.checkIfHasCondition(ConditionsList.surprised)) {
      defender.roll.successLevel = 0;
    } else {
      RollService.calculateFightRollResult(defender.getFightTrait().value, defender);
    }
  }

  private checkFightTraits(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    this.checkConditions(attacker, defender);
    this.checkWeaponTraits(attacker, defender);
    this.checkWeaponTraits(defender, attacker);
  }

  private checkWeaponTraits(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
    if (owner.usedWeapon !== undefined) {
      if (!owner.checkIfWeaponAdvantagesAreIgnored()) {
        WeaponTraitsList.checkFast(owner, opponent);
      }
    }
  }

  private checkConditions(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    this.conditionService.fightCheckCondition(attacker, defender);
    this.conditionService.fightCheckCondition(defender, attacker);
    for (let condition of defender.conditions) {
      if (condition.base === ConditionsList.prone) {
        attacker.roll.modifier += 20;
      }
    }
  }

  private checkAttackResult(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    if (attacker.roll.successLevel > defender.roll.successLevel) {
      this.attackReportService.result = 'Cel został trafiony.'
      attacker.advantage += 1;
      defender.advantage = 0;
      this.calculateDamage(attacker, defender);
    } else {
      defender.advantage += 1;
      attacker.advantage = 0;
      this.attackReportService.result = 'Cel wychodzi bez szwanku.'
      this.attackReportService.damage = '0';
    }

    this.attackReportService.attackerModifier = String(attacker.roll.modifier);
    this.attackReportService.targetModifier = String(defender.roll.modifier);
    attacker.roll.modifier = 0;
    defender.roll.modifier = 0;

    this.checkDouble(attacker, defender);
    this.checkDouble(defender, attacker);
  }

  private calculateDamage(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    let damage = this.calculateFinalDamage(
      this.rollService.calculateSuccessLevelDifference(attacker.roll.successLevel, defender.roll.successLevel),
      this.calculateWeaponDamage(attacker),
      RollService.calculateTraitBonus(defender.characteristics.toughness.value),
      this.getArmorPointsFromAttackLocalization(attacker.roll.value, defender));

    this.attackReportService.damage = String(damage);
    defender.currentWounds -= damage;
    this.conditionService.checkProneAfterDamage(defender);
  }

  private calculateWeaponDamage(character: SkirmishCharacter) {
    let weapon = character.usedWeapon;
    let weaponDamage = weapon.damage;
    if (weapon.isUsingStrength) {
      weaponDamage += Math.floor(character.characteristics.strength.value / 10);
    }

    return weaponDamage;
  }

  private getArmorPointsFromAttackLocalization(attackerRoll: number, target: SkirmishCharacter) {
    let bodyLocalization = target.bodyLocalizations.getBodyLocalization(this.getAttackLocalization(attackerRoll));
    this.attackReportService.attackLocalization = bodyLocalization!.bodyLocalization.nameTranslation;
    return bodyLocalization!.armorPoints;
  }

  private calculateFinalDamage(successLevelsDifference: number, weaponDamage: number, targetToughnessBonus: number, armorPoints: number) {
    let damage = successLevelsDifference + weaponDamage - targetToughnessBonus - armorPoints;

    if (damage < 1) {
      damage = 1;
    }

    return damage;
  }

  checkDouble(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
    if (this.checkIfCharacterUseFightSkill(owner)) {
      if (owner.roll.isDouble) {
        if (owner.roll.isSuccessful) {
          this.createRollDialog(owner.name + ': Trafienie krytyczne (k100)', false)
            .subscribe((rollResult: { roll: number, modifier: number }) => {
              this.checkCriticalHit(opponent, rollResult);
            })
          console.log('Fuks dla ' + owner.name);
        } else if (!owner.roll.isSuccessful) {
          this.createRollDialog(owner.name + ': Pech (k100)', false)
            .subscribe((rollResult: { roll: number, modifier: number }) => {
              this.checkCriticalFailure(owner, rollResult.roll);
            })
          console.log('Pech dla ' + owner.name);
        }
      }
    }
  }

  checkIfCharacterUseFightSkill(character: SkirmishCharacter) {
    return character.usedWeapon != undefined;
  }

  private checkCriticalHit(opponent: SkirmishCharacter, rollResult: { roll: number; modifier: number }) {
    this.getAttackLocalization(opponent.roll.value);
  }

  public getAttackLocalization(attackerRoll: number) {
    let firstDigit = attackerRoll.toLocaleString()[0];
    let secondDigit = attackerRoll.toLocaleString()[1];
    if (secondDigit === undefined) {
      secondDigit = firstDigit;
      firstDigit = '0';
    }

    let localizationNumber: number = Number(secondDigit + firstDigit);

    for (let localization of BodyLocalizationList.list) {
      // @ts-ignore
      if (localizationNumber >= localization.numericalInterval[0] && localizationNumber <= localization.numericalInterval[1]) {
        return localization;
      }
    }

    return null;
  }

  private checkCriticalFailure(owner: SkirmishCharacter, roll: number) {
    if (roll >= 1 && roll <= 20) {
      owner.currentWounds -= 1;
    } else if (roll >= 21 && roll <= 40) {
      let roundNumber = this.roundService.roundNumber + 1;
      owner.usedWeapon.damage -= 1;
      owner.addNote('Rundę ' + roundNumber + ' zaczyna jako ostatni.')
    } else if (roll >= 41 && roll <= 60) {
      owner.roll.modifier = -10;
    } else if (roll >= 61 && roll <= 70) {
      let roundNumber = this.roundService.roundNumber + 1;
      owner.addNote('W rundzie ' + roundNumber + ' nie wykonuje ruchu.')
    } else if (roll >= 71 && roll <= 80) {
      let roundNumber = this.roundService.roundNumber + 1;
      owner.addNote('W rundzie ' + roundNumber + ' nie wykonuje akcji.')
    } else if (roll >= 81 && roll <= 90) {
      this.createRollDialog(owner.name + ': Skręcenie kostki: 1-50 - lewa noga, 51-100 - prawa noga (k100)', false)
        .subscribe((rollResult: { roll: number, modifier: number }) => {
          if (rollResult.roll <= 50) {
            owner.bodyLocalizations.leftLeg.addInjure(InjuresList.minorTornMuscles);
          } else {
            owner.bodyLocalizations.rightLeg.addInjure(InjuresList.minorTornMuscles);
          }
        })
    } else if (roll >= 91 && roll <= 100) {
      //TODO: Atakuje sojusznika lub otrzymuje oszołomienie
    }
  }

}
