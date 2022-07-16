// import {Injectable} from '@angular/core';
// import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
// import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
// import {ServiceModel} from "../service.model";
// import {BodyLocalizationList} from "../../../model/body-localization/body-localization.model";
// import {InjuresList, Injury} from "../../../model/injuresOld/injuresOld-list.model";
// import {RoundService} from "../round-service/round.service";
// import {RollService} from "../roll-service/roll.service";
// import {ConditionsList} from "../../../model/conditionsOld/conditionsOld-list.model";
// import {SkirmishCharacterService} from "../skirmish-character-service/skirmish-character.service";
// import {WeaponTraitsList} from "../../../model/weapon/weaponTraits/weapon.advantages.model";
// import {ConditionService} from "../condition-service/condition.service";
// import {AttackReportService} from "../../../dialog-window/report-dialog-window/attack-report-service/attack-report.service";
// import {AttackAllyFumbleDialogWindowComponent} from "../../../dialog-window/attack-ally-fumble-dialog-window/attack-ally-fumble-dialog-window.component";
// import {SkillTestService} from "../skill-test-service/skill-test.service";
// import {TextResourceService} from "../text-resource-service/text-resource.service";
// import {CriticalWound} from 'src/app/model/critical-wounds/critical-wounds.model';
// import {CriticalWoundsList} from "../../../model/critical-wounds/critical-wounds-list.model";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class FightService extends ServiceModel {
//
//   constructor(modalService: NgbModal,
//               public roundService: RoundService,
//               public skirmishCharacterService: SkirmishCharacterService,
//               public conditionService: ConditionService,
//               public attackReportService: AttackReportService,
//               public rollService: RollService,
//               public skillTestService: SkillTestService) {
//     super(modalService);
//   }
//
//   async fightCalculation(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
//     this.checkFightTraits(attacker, defender);
//     RollService.calculateFightRollResult(attacker.getFightTrait().value, attacker);
//     this.calculateDefenderSuccessLevel(defender);
//     await this.checkAttackResult(attacker, defender);
//     this.attackReportService.createReport(attacker, defender);
//     attacker.roll.clearRoll();
//     defender.roll.clearRoll();
//     this.skirmishCharacterService.updateSkirmishCharacter(attacker);
//     this.skirmishCharacterService.updateSkirmishCharacter(defender);
//   }
//
//   private calculateDefenderSuccessLevel(defender: SkirmishCharacter) {
//     if (defender.checkIfHasCondition(ConditionsList.surprised)) {
//       defender.roll.successLevel = 0;
//     } else {
//       RollService.calculateFightRollResult(defender.getFightTrait().value, defender);
//     }
//   }
//
//   private checkFightTraits(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
//     this.checkConditions(attacker, defender);
//     // this.checkWeaponTraits(attacker, defender);
//     // this.checkWeaponTraits(defender, attacker);
//   }
//
//   // private checkWeaponTraits(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
//   //   if (owner.usedWeapon !== undefined) {
//   //     if (!owner.checkIfWeaponAdvantagesAreIgnored()) {
//   //       WeaponTraitsList.checkFast(owner, opponent);
//   //     }
//   //   }
//   // }
//
//   private checkConditions(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
//     this.conditionService.fightCheckCondition(attacker, defender);
//     this.conditionService.fightCheckCondition(defender, attacker);
//     for (let condition of defender.conditionsOld) {
//       if (condition.base === ConditionsList.prone) {
//         attacker.roll.modifier += 20;
//       }
//     }
//   }
//
//   private async checkAttackResult(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
//     if (attacker.roll.successLevel > defender.roll.successLevel) {
//       this.attackReportService.result = 'Cel został trafiony.'
//       attacker.advantage += 1;
//       defender.advantage = 0;
//       this.calculateDamage(attacker, defender);
//     } else {
//       defender.advantage += 1;
//       attacker.advantage = 0;
//       this.attackReportService.result = 'Cel wychodzi bez szwanku.'
//       this.attackReportService.damage = '0';
//     }
//
//     this.attackReportService.attackerModifier = String(attacker.roll.modifier);
//     this.attackReportService.targetModifier = String(defender.roll.modifier);
//     attacker.roll.modifier = 0;
//     defender.roll.modifier = 0;
//
//     await this.checkDouble(attacker, defender);
//     await this.checkDouble(defender, attacker);
//     this.conditionService.checkProneAfterDamage(defender);
//     this.conditionService.checkProneAfterDamage(attacker);
//   }
//
//   private calculateDamage(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
//     let damage = this.calculateFinalDamage(
//       this.rollService.calculateSuccessLevelDifference(attacker.roll.successLevel, defender.roll.successLevel),
//       this.calculateWeaponDamage(attacker),
//       RollService.calculateTraitBonus(defender.characteristics.toughness.value),
//       this.getArmorPointsFromAttackLocalization(attacker.roll.value, defender));
//
//     this.attackReportService.damage = String(damage);
//     defender.currentWounds -= damage;
//     this.conditionService.checkProneAfterDamage(defender);
//   }
//
//   public calculateWeaponDamage(character: SkirmishCharacter) {
//     let weapon = character.usedWeapon;
//     let weaponDamage = weapon.damage;
//     if (weapon.isUsingStrength) {
//       weaponDamage += Math.floor(character.characteristics.strength.value / 10);
//     }
//
//     return weaponDamage;
//   }
//
//   public getArmorPointsFromAttackLocalization(attackerRoll: number, target: SkirmishCharacter) {
//     let bodyLocalization = target.bodyLocalizations.getBodyLocalization(this.getAttackLocalization(attackerRoll));
//     this.attackReportService.attackLocalization = bodyLocalization!.bodyLocalization.nameTranslation;
//     return bodyLocalization!.armorPoints;
//   }
//
//   public calculateFinalDamage(successLevelsDifference: number, weaponDamage: number, targetToughnessBonus: number, armorPoints: number) {
//     let damage = successLevelsDifference + weaponDamage - targetToughnessBonus - armorPoints;
//
//     if (damage < 1) {
//       damage = 1;
//     }
//
//     return damage;
//   }
//
//   async checkDouble(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
//     if (this.checkIfCharacterUseFightSkill(owner)) {
//       if (owner.roll.isDouble) {
//         if (owner.roll.isSuccessful) {
//           let criticalHitLocalizationRoll = await this.createRollDialogAsync(owner.name + ': Lokalizacja trafienia krytycznego (k100)', false);
//           let criticalHitRoll = await this.createRollDialogAsync(owner.name + ': Trafienie krytyczne (k100)', false);
//           await this.checkCriticalHit(opponent, criticalHitLocalizationRoll.roll, criticalHitRoll.roll);
//           console.log('Fuks dla ' + owner.name);
//         } else if (!owner.roll.isSuccessful) {
//           let rollResult = await this.createRollDialogAsync(owner.name + ': Pech (k100)', false);
//           await this.checkCriticalFailure(owner, rollResult.roll);
//           console.log('Pech dla ' + owner.name);
//         }
//       }
//     }
//   }
//
//   checkIfCharacterUseFightSkill(character: SkirmishCharacter) {
//     return character.usedWeapon != undefined;
//   }
//
//   private async checkCriticalHit(opponent: SkirmishCharacter, criticalHitLocalizationRoll: number, criticalHitRoll: number) {
//     const bodyLocalization = this.getCriticalHitLocalization(criticalHitLocalizationRoll);
//     switch (bodyLocalization) {
//       case BodyLocalizationList.head: {
//         await this.setHeadCriticalWounds(opponent, criticalHitRoll);
//         break;
//       }
//     }
//   }
//
//   public getCriticalHitLocalization(attackerRoll: number) {
//     for (let localization of BodyLocalizationList.list) {
//       // @ts-ignore
//       if (attackerRoll >= localization.numericalInterval[0] && attackerRoll <= localization.numericalInterval[1]) {
//         return localization;
//       }
//     }
//
//     return null;
//   }
//
//   private async setHeadCriticalWounds(opponent: SkirmishCharacter, roll: number) {
//     if (roll >= 1 && roll <= 10) {
//       opponent.currentWounds -= 1;
//       this.setCriticalWound(opponent, CriticalWoundsList.dramaticInjury);
//     } else if (roll >= 11 && roll <= 20) {
//       opponent.currentWounds -= 1;
//       this.setCriticalWound(opponent, CriticalWoundsList.minorCut);
//     } else if (roll >= 21 && roll <= 25) {
//       opponent.currentWounds -= 1;
//       this.setCriticalWound(opponent, CriticalWoundsList.pokedEye);
//     } else if (roll >= 26 && roll <= 30) {
//       opponent.currentWounds -= 1;
//       this.setCriticalWound(opponent, CriticalWoundsList.earBash);
//     } else if (roll >= 31 && roll <= 35) {
//       opponent.currentWounds -= 2;
//       this.setCriticalWound(opponent, CriticalWoundsList.rattlingBlow);
//     } else if (roll >= 36 && roll <= 40) {
//       opponent.currentWounds -= 2;
//       this.setCriticalWound(opponent, CriticalWoundsList.blackEye);
//     } else if (roll >= 41 && roll <= 45) {
//       opponent.currentWounds -= 2;
//       this.setCriticalWound(opponent, CriticalWoundsList.slicedEar);
//     } else if (roll >= 46 && roll <= 50) {
//       opponent.currentWounds -= 2;
//       this.setCriticalWound(opponent, CriticalWoundsList.struckForehead);
//     } else if (roll >= 51 && roll <= 55) {
//       opponent.currentWounds -= 3;
//       this.setCriticalWound(opponent, CriticalWoundsList.fracturedJaw);
//     } else if (roll >= 56 && roll <= 60) {
//       opponent.currentWounds -= 3;
//       this.setCriticalWound(opponent, CriticalWoundsList.majorEyeWound);
//     } else if (roll >= 61 && roll <= 65) {
//       //TODO: Modyfikator może wpływać na postać gdy ta jest flankowana, według zasada to trafienie krytyczne jest traktowane
//       //TODO: automatycznie jako wyleczone, uszkodzenie ucha jest permamentne
//       opponent.currentWounds -= 3;
//       opponent.addNote(TextResourceService.getCriticalWoundText('MajorEarWound').note);
//       this.setCriticalWound(opponent, CriticalWoundsList.majorEarWound);
//     } else if (roll >= 66 && roll <= 70) {
//       opponent.currentWounds -= 3;
//       await this.skillTestService.enduranceTest(opponent);
//       this.setCriticalWound(opponent, CriticalWoundsList.brokenNose);
//       //TODO: przetestować
//       if (opponent.roll.isSuccessful) {
//         opponent.getCriticalWound(CriticalWoundsList.brokenNose).removeCondition(ConditionsList.stunned);
//       }
//     } else if (roll >= 71 && roll <= 75) {
//       opponent.currentWounds -= 4;
//       await this.skillTestService.enduranceTest(opponent);
//       this.setCriticalWound(opponent, CriticalWoundsList.brokenJaw)
//       if (opponent.roll.isSuccessful) {
//         opponent.getCriticalWound(CriticalWoundsList.brokenJaw).removeCondition(ConditionsList.deafened);
//       }
//     }
//   }
//
//   private setCriticalWound(opponent: SkirmishCharacter, criticalWound: CriticalWound) {
//     opponent?.addCriticalWound(criticalWound);
//
//     let criticalWoundText = TextResourceService.getCriticalWoundText(criticalWound.name);
//     this.attackReportService.criticalRollTarget = opponent.name;
//     this.attackReportService.criticalRollName = criticalWoundText.nameTranslation;
//     this.attackReportService.criticalRollDescription = criticalWoundText.description;
//
//     for (let condition of criticalWound.criticalConditions) {
//       opponent.addCondition(condition.base, condition.value, condition.incurableValue);
//     }
//
//     for (let injury of criticalWound.criticalInjuries) {
//       opponent.addInjure(injury);
//     }
//   }
//
//   public getAttackLocalization(attackerRoll: number) {
//     let firstDigit = attackerRoll.toLocaleString()[0];
//     let secondDigit = attackerRoll.toLocaleString()[1];
//     if (secondDigit === undefined) {
//       secondDigit = firstDigit;
//       firstDigit = '0';
//     }
//
//     let localizationNumber: number = Number(secondDigit + firstDigit);
//
//     for (let localization of BodyLocalizationList.list) {
//       // @ts-ignore
//       if (localizationNumber >= localization.numericalInterval[0] && localizationNumber <= localization.numericalInterval[1]) {
//         return localization;
//       }
//     }
//
//     return null;
//   }
//
//   private async checkCriticalFailure(owner: SkirmishCharacter, roll: number) {
//     if (roll >= 1 && roll <= 20) {
//       owner.currentWounds -= 1;
//     } else if (roll >= 21 && roll <= 40) {
//       let roundNumber = this.roundService.roundNumber + 1;
//       owner.usedWeapon.damage -= 1;
//       owner.addNote('Rundę ' + roundNumber + ' zaczyna jako ostatni.')
//     } else if (roll >= 41 && roll <= 60) {
//       owner.roll.modifier = -10;
//     } else if (roll >= 61 && roll <= 70) {
//       let nextRoundNumber = this.roundService.roundNumber + 1;
//       owner.addNote('W rundzie ' + nextRoundNumber + ' nie wykonuje ruchu.')
//     } else if (roll >= 71 && roll <= 80) {
//       let nextRoundNumber = this.roundService.roundNumber + 1;
//       owner.addNote('W rundzie ' + nextRoundNumber + ' nie wykonuje akcji.')
//     } else if (roll >= 81 && roll <= 90) {
//       this.createRollDialog(owner.name + ': Skręcenie kostki: 1-50 - lewa noga, 51-100 - prawa noga (k100)', false)
//         .subscribe((rollResult: { roll: number, modifier: number }) => {
//           if (rollResult.roll <= 50) {
//             owner.addInjure(new Injury(InjuresList.minorTornMuscles, BodyLocalizationList.leftLeg));
//           } else {
//             owner.addInjure(new Injury(InjuresList.minorTornMuscles, BodyLocalizationList.rightLeg));
//           }
//         })
//     } else if (roll >= 91 && roll <= 100) {
//       await this.createAttackAllyFumbleDialog(owner, roll);
//     }
//   }
//
//   protected async createAttackAllyFumbleDialog(character: SkirmishCharacter, fumbleRoll: number) {
//     const modalRef = this.modalService.open(AttackAllyFumbleDialogWindowComponent);
//     modalRef.componentInstance.character = character;
//     modalRef.componentInstance.fumbleRoll = fumbleRoll;
//
//     return modalRef.closed
//       .toPromise()
//       .then((resolve) => {
//         return Promise.resolve(resolve);
//       })
//   }
// }
