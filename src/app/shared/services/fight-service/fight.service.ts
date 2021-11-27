import {Injectable} from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ServiceModel} from "../service.model";
import {BodyLocalization, BodyLocalizationList} from "../../../model/body-localization/body-localization.model";
import {InjuresList} from "../../../model/injures/injures-list.model";
import {RoundService} from "../round-service/round.service";
import {RollService} from "../roll-service/roll.service";
import {ConditionsList} from "../../../model/conditions/conditions-list.model";
import {SkirmishCharacterService} from "../skirmish-character-service/skirmish-character.service";
import {WeaponTraitsList} from "../../../model/weapon/weaponTraits/weapon.advantages.model";
import {ConditionService} from "../condition-service/condition.service";
import {AttackReportService} from "../../../dialog-window/report-dialog-window/attack-report-service/attack-report.service";
import {AttackAllyFumbleDialogWindowComponent} from "../../../dialog-window/attack-ally-fumble-dialog-window/attack-ally-fumble-dialog-window.component";
import {SkillTestService} from "../skill-test-service/skill-test.service";
import {TextResourceService} from "../text-resource-service/text-resource.service";
import {Model} from "../../../model/model";
import {CriticalCondition, CriticalWound} from 'src/app/model/critical-wounds/critical-wounds.model';
import {Condition} from "../../../model/conditions/condition.model";

@Injectable({
  providedIn: 'root'
})
export class FightService extends ServiceModel {

  constructor(modalService: NgbModal,
              public roundService: RoundService,
              public skirmishCharacterService: SkirmishCharacterService,
              public conditionService: ConditionService,
              public attackReportService: AttackReportService,
              public rollService: RollService,
              public skillTestService: SkillTestService) {
    super(modalService);
  }

  async fightCalculation(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    this.checkFightTraits(attacker, defender);
    RollService.calculateFightRollResult(attacker.getFightTrait().value, attacker);
    this.calculateDefenderSuccessLevel(defender);
    await this.checkAttackResult(attacker, defender);
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

  private async checkAttackResult(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
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

    await this.checkDouble(attacker, defender);
    await this.checkDouble(defender, attacker);
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

  public calculateWeaponDamage(character: SkirmishCharacter) {
    let weapon = character.usedWeapon;
    let weaponDamage = weapon.damage;
    if (weapon.isUsingStrength) {
      weaponDamage += Math.floor(character.characteristics.strength.value / 10);
    }

    return weaponDamage;
  }

  public getArmorPointsFromAttackLocalization(attackerRoll: number, target: SkirmishCharacter) {
    let bodyLocalization = target.bodyLocalizations.getBodyLocalization(this.getAttackLocalization(attackerRoll));
    this.attackReportService.attackLocalization = bodyLocalization!.bodyLocalization.nameTranslation;
    return bodyLocalization!.armorPoints;
  }

  public calculateFinalDamage(successLevelsDifference: number, weaponDamage: number, targetToughnessBonus: number, armorPoints: number) {
    let damage = successLevelsDifference + weaponDamage - targetToughnessBonus - armorPoints;

    if (damage < 1) {
      damage = 1;
    }

    return damage;
  }

  async checkDouble(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
    if (this.checkIfCharacterUseFightSkill(owner)) {
      if (owner.roll.isDouble) {
        if (owner.roll.isSuccessful) {
          let criticalHitLocalizationRoll = await this.createRollDialogAsync(owner.name + ': Lokalizacja trafienia krytycznego (k100)', false);
          let criticalHitRoll = await this.createRollDialogAsync(owner.name + ': Trafienie krytyczne (k100)', false);
          this.checkCriticalHit(opponent, criticalHitLocalizationRoll.roll, criticalHitRoll.roll);
          console.log('Fuks dla ' + owner.name);
        } else if (!owner.roll.isSuccessful) {
          let rollResult = await this.createRollDialogAsync(owner.name + ': Pech (k100)', false);
          await this.checkCriticalFailure(owner, rollResult.roll);
          console.log('Pech dla ' + owner.name);
        }
      }
    }
  }

  checkIfCharacterUseFightSkill(character: SkirmishCharacter) {
    return character.usedWeapon != undefined;
  }

  private checkCriticalHit(opponent: SkirmishCharacter, criticalHitLocalizationRoll: number, criticalHitRoll: number) {
    const bodyLocalization = this.getCriticalHitLocalization(criticalHitLocalizationRoll);
    switch (bodyLocalization) {
      case BodyLocalizationList.head: {
        this.setHeadCriticalWounds(opponent, criticalHitRoll);
        break;
      }
    }
  }

  public getCriticalHitLocalization(attackerRoll: number) {
    for (let localization of BodyLocalizationList.list) {
      // @ts-ignore
      if (attackerRoll >= localization.numericalInterval[0] && attackerRoll <= localization.numericalInterval[1]) {
        return localization;
      }
    }

    return null;
  }

  private async setHeadCriticalWounds(opponent: SkirmishCharacter, roll: number) {
    if (roll >= 1 && roll <= 10) {
      this.setCriticalWound(
        opponent,
        BodyLocalizationList.head,
        1,
        'DramaticInjury',
        [new CriticalCondition(new Condition(ConditionsList.bleeding, 1), true)]
      );
    } else if (roll >= 11 && roll <= 20) {
      this.setCriticalWound(
        opponent,
        BodyLocalizationList.head,
        1,
        'MinorCut',
        [new CriticalCondition(new Condition(ConditionsList.bleeding, 1), true)]
      );
    } else if (roll >= 21 && roll <= 25) {
      opponent.currentWounds -= 1;
      opponent.addCondition(ConditionsList.blinded);
      opponent.addNote('Rana krytyczna głowy: Spuchnięte oko - usuń 1 Oślepienie');
    } else if (roll >= 26 && roll <= 30) {
      opponent.currentWounds -= 1;
      opponent.addCondition(ConditionsList.deafened);
      opponent.addNote('Rana krytyczna głowy: Prosto w ucho - usuń 1 Ogłuszenie');
    } else if (roll >= 31 && roll <= 35) {
      opponent.currentWounds -= 2;
      opponent.addCondition(ConditionsList.stunned);
      opponent.addNote('Rana krytyczna głowy: Bolesne uderzenie - usuń 1 Ogłuszenie');
    } else if (roll >= 36 && roll <= 40) {
      opponent.currentWounds -= 2;
      opponent.addCondition(ConditionsList.blinded, 2);
      opponent.addNote('Rana krytyczna głowy: Podbite oko - usuń 2 Oślepienia');
    } else if (roll >= 41 && roll <= 45) {
      opponent.currentWounds -= 2;
      opponent.addCondition(ConditionsList.stunned, 2);
      opponent.addCondition(ConditionsList.bleeding);
      opponent.addNote('Rana krytyczna głowy: Rozcięte ucho - usuń 2 Ogłuszenia i 1 Krwawienie');
    } else if (roll >= 46 && roll <= 50) {
      opponent.currentWounds -= 2;
      opponent.addCondition(ConditionsList.bleeding, 2);
      opponent.addCondition(ConditionsList.blinded);
      opponent.addNote('Rana krytyczna głowy: Uderzenie w czoło - usuń 2 Krwawienia i 1 Oślepienie, które nie może zostać usunięte do momentu usunięcia Krwawienia');
    } else if (roll >= 51 && roll <= 55) {
      opponent.currentWounds -= 3;
      opponent.addCondition(ConditionsList.stunned, 2);
      opponent.bodyLocalizations.head.addInjure(InjuresList.minorBrokenBone);
      opponent.addNote('Rana krytyczna głowy: Złamana szczęka - usuń 2 Ogłuszenia i Złamanie (pomniejsze)')
    } else if (roll >= 56 && roll <= 60) {
      opponent.currentWounds -= 3;
      opponent.addCondition(ConditionsList.bleeding);
      opponent.addCondition(ConditionsList.blinded);
      //TODO: Oślepienie może zostać usunięte tylko przez pomoc medyczną, nie znika z czasem
      opponent.addNote('Rana krytyczna głowy: Poważna rana oka - usuń Krawawienie, Oślepienie może zostać tylko przez Pomoc Medyczną')
    } else if (roll >= 61 && roll <= 65) {
      opponent.currentWounds -= 3;
      //TODO: Modyfikator może wpływać na postać gdy ta jest flankowana
      opponent.addNote('Rana krytyczna głowy: Poważna rana ucha - wszystkie testy związane otrzymują karę -20')
    } else if (roll >= 66 && roll <= 70) {
      opponent.currentWounds -= 3;
      opponent.addCondition(ConditionsList.blinded, 2);

      opponent.roll.clearRoll();
      let rollResult = await this.createRollDialogAsync(opponent.name + ': Test Odporności (k100)', false);
      opponent.roll.value = rollResult.roll;
      opponent.roll.modifier = rollResult.modifier;
      this.skillTestService.enduranceTest(opponent);
      if(!opponent.roll.isSuccessful){
        opponent.addCondition(ConditionsList.stunned);
      }
      opponent.addNote('Rana krytyczna głowy: Złamany nos - usuń 2 Krwawienia')
    }
  }

  private setCriticalWound(opponent: SkirmishCharacter, bodyLocalization: BodyLocalization, wounds: number, criticalWoundName: string, criticalConditions: CriticalCondition[]) {
    opponent.currentWounds -= wounds;
    let criticalWound = new CriticalWound(criticalWoundName, criticalConditions);
    opponent.bodyLocalizations.getBodyLocalization(bodyLocalization)?.addCriticalWound(criticalWound);

    let criticalWoundText = TextResourceService.getCriticalWoundText(criticalWoundName);
    opponent.addNote(criticalWoundText.note);
    this.attackReportService.criticalRollTarget = opponent.name;
    this.attackReportService.criticalRollName = criticalWoundText.nameTranslation;
    this.attackReportService.criticalRollDescription = criticalWoundText.description;
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

  private async checkCriticalFailure(owner: SkirmishCharacter, roll: number) {
    if (roll >= 1 && roll <= 20) {
      owner.currentWounds -= 1;
    } else if (roll >= 21 && roll <= 40) {
      let roundNumber = this.roundService.roundNumber + 1;
      owner.usedWeapon.damage -= 1;
      owner.addNote('Rundę ' + roundNumber + ' zaczyna jako ostatni.')
    } else if (roll >= 41 && roll <= 60) {
      owner.roll.modifier = -10;
    } else if (roll >= 61 && roll <= 70) {
      let nextRoundNumber = this.roundService.roundNumber + 1;
      owner.addNote('W rundzie ' + nextRoundNumber + ' nie wykonuje ruchu.')
    } else if (roll >= 71 && roll <= 80) {
      let nextRoundNumber = this.roundService.roundNumber + 1;
      owner.addNote('W rundzie ' + nextRoundNumber + ' nie wykonuje akcji.')
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
      await this.createAttackAllyFumbleDialog(owner, roll);
    }
  }

  protected async createAttackAllyFumbleDialog(character: SkirmishCharacter, fumbleRoll: number) {
    const modalRef = this.modalService.open(AttackAllyFumbleDialogWindowComponent);
    modalRef.componentInstance.character = character;
    modalRef.componentInstance.fumbleRoll = fumbleRoll;

    return modalRef.closed
      .toPromise()
      .then((resolve) => {
        return Promise.resolve(resolve);
      })
  }
}
