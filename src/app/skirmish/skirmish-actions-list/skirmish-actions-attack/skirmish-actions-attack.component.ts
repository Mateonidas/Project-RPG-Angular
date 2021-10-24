import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AttacksCategoryList} from "../../../model/attack/attack-category.model";
import {AttacksTypeList} from "../../../model/attack/attacks-type-list.model";
import {SkirmishService} from "../../skirmish-service/skirmish.service";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {Weapon} from "../../../model/weapon/weapon.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveRollDialogWindowComponent} from "../../../dialog-window/save-roll-dialog-window/save-roll-dialog-window.component";
import {AttackType} from 'src/app/model/attack/attack-type.model';
import {AttackReportService} from "../../../dialog-window/report-dialog-window/attack-report-service/attack-report.service";
import {AttackReportDialogWindowComponent} from "../../../dialog-window/report-dialog-window/attack-report-dialog-window.component";
import {WeaponTraitsList} from "../../../model/weapon/weaponTraits/weapon.advantages.model";
import {ConditionsList} from "../../../model/conditions/conditions-list.model";
import {RollService} from "../../../shared/services/roll.service";
import {ConditionService} from "../../../shared/services/condition.service";

@Component({
  selector: 'app-skirmish-actions-attack',
  templateUrl: './skirmish-actions-attack.component.html',
  styleUrls: ['./skirmish-actions-attack.component.css']
})
export class SkirmishActionsAttackComponent implements OnInit {

  attackForm!: FormGroup;
  attacker!: SkirmishCharacter;
  attacksTypeList!: AttackType[];
  attacksCategoryList = AttacksCategoryList.list;
  skirmishCharactersList!: SkirmishCharacter[];
  characterWeapons!: Weapon[];
  id!: number;

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected skirmishService: SkirmishService,
              private modalService: NgbModal,
              private attackReportService: AttackReportService,
              private rollService: RollService,
              private conditionService: ConditionService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.initForm();
      }
    )
  }

  private initForm() {
    this.attacker = this.skirmishService.getSkirmishCharacter(this.id);
    this.skirmishCharactersList = this.skirmishService.getSkirmishCharacters();
    this.skirmishCharactersList.splice(this.id, 1);

    this.attacksTypeList = AttacksTypeList.attacksTypeList.filter(x => x.category.name === 'MeleeAttack');
    this.characterWeapons = this.attacker.weapons.filter(x => x.attackType.name === 'MeleeAttack');

    this.attackForm = new FormGroup({
      'attackCategory': new FormControl(AttacksCategoryList.meleeAttack, [Validators.required]),
      'attackType': new FormControl(this.attacksTypeList[0], [Validators.required]),
      'weapon': new FormControl(this.characterWeapons[0], [Validators.required]),
      'target': new FormControl(this.skirmishCharactersList[0], [Validators.required]),
      'roll': new FormControl(null, [Validators.required]),
      'modifier': new FormControl(0, [Validators.required]),
    })
  }

  onCategoryChange() {
    let category = this.attackCategory?.value.name;
    this.attacksTypeList = AttacksTypeList.attacksTypeList.filter(x => x.category.name === category);
    this.characterWeapons = this.attacker.weapons.filter(x => x.attackType.name === category);

    this.attackType?.setValue(this.attacksTypeList[0]);
    this.weapon?.setValue(this.characterWeapons[0]);
  }

  onSubmit() {
    this.attackRoll();
  }

  attackRoll() {
    this.attacker.isAttacker = true;
    this.attacker.isDodging = false;
    this.attackReportService.attackerName = this.attacker.name;

    this.attacker.usedWeapon = this.weapon?.value;
    let attackTrait = this.attacker.getFightTrait();

    if (this.attacker.usedWeapon === undefined) {
      this.attackReportService.attackerAttackTrait = 'Cecha: ' + attackTrait.base.nameTranslation;
    } else {
      this.attackReportService.attackerAttackTrait = 'Broń: ' + this.attacker.usedWeapon.nameTranslation;
    }


    this.attacker.roll = this.roll?.value;
    this.attackReportService.attackerRoll = String(this.attacker.roll);

    this.attacker.modifier = this.modifier?.value;
    this.attackReportService.attackerModifier = String(this.attacker.modifier);

    let defender = this.target?.value;
    defender.isAttacker = false;
    this.attackReportService.targetName = defender.name;

    this.createSaveRollDialog(defender).subscribe(() => {
      this.checkFightTraits(this.attacker, defender);
      this.attackReportService.targetModifier = String(defender.modifier);

      this.attacker.successLevel = RollService.calculateSuccessLevel(attackTrait.value, this.attacker);
      this.attackReportService.attackerSuccessLevel = String(this.attacker.successLevel);

      if(defender.checkIfHasCondition(ConditionsList.surprised)){
        defender.successLevel = 0;
      }
      else {
        defender.successLevel = RollService.calculateSuccessLevel(defender.getFightTrait().value, defender);
      }

      this.attackReportService.targetSuccessLevel = String(defender.successLevel);

      this.checkAttackResult(this.attacker, defender);
      this.createReportDialog();
    })
  }

  createSaveRollDialog(defender: SkirmishCharacter) {
    const modalRef = this.modalService.open(SaveRollDialogWindowComponent);
    modalRef.componentInstance.target = defender;
    return modalRef.componentInstance.emitter;
  }

  createReportDialog() {
    this.modalService.open(AttackReportDialogWindowComponent);
  }

  checkFightTraits(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    this.checkConditions(attacker, defender);
    this.checkWeaponTraits(attacker, defender);
    this.checkWeaponTraits(defender, attacker);
  }

  checkWeaponTraits(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
    if (owner.usedWeapon !== undefined) {
      if (!owner.checkIfWeaponAdvantagesAreIgnored()) {
        WeaponTraitsList.checkFast(owner, opponent);
      }
    }
  }

  checkConditions(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    this.conditionService.fightCheckCondition(attacker, defender);
    this.conditionService.fightCheckCondition(defender, attacker);
    for(let condition of defender.conditions) {
      if(condition.base === ConditionsList.prone) {
        attacker.modifier += 20;
      }
    }
  }

  checkAttackResult(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    if (attacker.successLevel > defender.successLevel) {
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
  }

  calculateDamage(attacker: SkirmishCharacter, defender: SkirmishCharacter) {
    let damage = this.calculateFinalDamage(
      this.rollService.calculateSuccessLevelDifference(attacker.successLevel, defender.successLevel),
      this.calculateWeaponDamage(attacker),
      RollService.calculateTraitBonus(defender.characteristics.toughness.value),
      this.getArmorPointsFromAttackLocalization(attacker.roll, defender));

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

  private getArmorPointsFromAttackLocalization(attackerRoll: number, target: SkirmishCharacter): number {
    if (attackerRoll >= 1 && attackerRoll <= 9) {
      return target.armorBodyLocalization.headArmor;
    } else if (attackerRoll >= 10 && attackerRoll <= 24) {
      return target.armorBodyLocalization.leftArmArmor;
    } else if (attackerRoll >= 25 && attackerRoll <= 44) {
      return target.armorBodyLocalization.rightArmArmor;
    } else if (attackerRoll >= 45 && attackerRoll <= 79) {
      return target.armorBodyLocalization.bodyArmor;
    } else if (attackerRoll >= 80 && attackerRoll <= 89) {
      return target.armorBodyLocalization.leftLegArmor;
    } else if (attackerRoll >= 90 && attackerRoll <= 100) {
      return target.armorBodyLocalization.rightLegArmor;
    } else {
      return 0;
    }
  }

  private calculateFinalDamage(successLevelsDifference: number, weaponDamage: number, targetToughnessBonus: number, armorPoints: number) {
    let damage = successLevelsDifference + weaponDamage - targetToughnessBonus - armorPoints;

    if (damage < 1) {
      damage = 1;
    }

    return damage;
  }

  get attackCategory() {
    return this.attackForm.get('attackCategory');
  }

  get attackType() {
    return this.attackForm.get('attackType');
  }

  get weapon() {
    return this.attackForm.get('weapon');
  }

  get target() {
    return this.attackForm.get('target');
  }

  get roll() {
    return this.attackForm.get('roll');
  }

  get modifier() {
    return this.attackForm.get('modifier');
  }
}
