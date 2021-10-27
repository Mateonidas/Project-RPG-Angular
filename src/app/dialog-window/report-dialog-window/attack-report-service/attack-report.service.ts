import { Injectable } from '@angular/core';
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";

@Injectable({
  providedIn: 'root'
})
export class AttackReportService {

  public attackerName!: string;
  public attackerAttackTrait!: string;
  public attackerRoll!: string;
  public attackerModifier!: string;
  public attackerSuccessLevel!: string;

  public targetName!: string;
  public targetDefenceTrait!: string;
  public targetRoll!: string;
  public targetModifier!: string;
  public targetSuccessLevel!: string;

  public result!: string;
  public damage!: string;

  createReport(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    this.attackerName = attacker.name;
    this.attackerRoll = String(attacker.roll.value);
    this.attackerModifier = String(attacker.roll.modifier);
    this.attackerSuccessLevel = String(attacker.roll.successLevel);

    let attackTrait = attacker.getFightTrait();
    if (attacker.usedWeapon === undefined) {
      this.attackerAttackTrait = 'Cecha: ' + attackTrait.base.nameTranslation;
    } else {
      this.attackerAttackTrait = 'Broń: ' + attacker.usedWeapon.nameTranslation;
    }

    this.targetName = defender.name;
    this.targetRoll = String(defender.roll.value);
    this.targetModifier = String(defender.roll.modifier);
    this.targetSuccessLevel = String(defender.roll.successLevel);
  }
}
