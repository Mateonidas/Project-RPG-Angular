import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AttacksCategoryList} from "../../../model/attack/attack-category.model";
import {AttacksTypeList} from "../../../model/attack/attacks-type-list.model";
import {SkirmishService} from "../../skirmish-service/skirmish.service";
import {SkirmishCharacter} from "../../../model/skirmish-character.model";
import {Weapon} from "../../../model/weapon/weapon.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveRollDialogWindowComponent} from "../../../dialog-window/save-roll-dialog-window/save-roll-dialog-window.component";
import {BodyLocalizationList} from "../../../model/body-localization.model";
import {AttackType} from 'src/app/model/attack/attack-type.model';

@Component({
  selector: 'app-skirmish-actions-attack',
  templateUrl: './skirmish-actions-attack.component.html',
  styleUrls: ['./skirmish-actions-attack.component.css']
})
export class SkirmishActionsAttackComponent implements OnInit {

  attackForm!: FormGroup;
  skirmishCharacter!: SkirmishCharacter;
  attacksTypeList!: AttackType[];
  attacksCategoryList = AttacksCategoryList.list;
  skirmishCharactersList!: SkirmishCharacter[];
  characterWeapons!: Weapon[];
  id!: number;

  constructor(protected router: Router,
              protected route: ActivatedRoute,
              protected skirmishService: SkirmishService,
              private modalService: NgbModal) {
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
    this.skirmishCharacter = this.skirmishService.getSkirmishCharacter(this.id);
    this.skirmishCharactersList = this.skirmishService.getSkirmishCharacters();
    this.skirmishCharactersList.splice(this.id, 1);

    this.attacksTypeList = AttacksTypeList.attacksTypeList.filter(x => x.category.name === 'MeleeAttack');
    this.characterWeapons = this.skirmishCharacter.weapons.filter(x => x.attackType.name === 'MeleeAttack');

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
    this.characterWeapons = this.skirmishCharacter.weapons.filter(x => x.attackType.name === category);

    this.attackType?.setValue(this.attacksTypeList[0]);
    this.weapon?.setValue(this.characterWeapons[0]);
  }

  onSubmit() {
    this.attackRoll();
  }

  attackRoll() {
    let attackTrait = this.skirmishService.getFightTrait(this.weapon?.value, this.skirmishCharacter);
    let attackerRoll = this.roll?.value;
    let attackerModifier = this.modifier?.value;
    let target = this.target?.value;

    this.createSaveRollDialog().subscribe((targetDefence: { rollValue: number, skillOrCharacteristicValue: number, modifier: number }) => {
      let attackerSuccessLevel = this.calculateSuccessLevel(attackTrait.value, attackerRoll, attackerModifier);
      let targetSuccessLevel = this.calculateSuccessLevel(targetDefence.skillOrCharacteristicValue, targetDefence.rollValue, targetDefence.modifier);
      this.checkAttackResult(attackerSuccessLevel, targetSuccessLevel, target);
    })
  }

  createSaveRollDialog() {
    const modalRef = this.modalService.open(SaveRollDialogWindowComponent);
    modalRef.componentInstance.target = this.target?.value;
    return modalRef.componentInstance.rollEntry;
  }

  calculateSuccessLevel(skillValue: number, rollValue: number, modifier: number) {
    return (Math.floor((skillValue + modifier) / 10) - Math.floor(rollValue / 10));
  }

  checkAttackResult(attackerSuccessLevel: number, targetSuccessLevel: number, target: SkirmishCharacter) {
    if (attackerSuccessLevel > targetSuccessLevel) {
      this.calculateDamage(attackerSuccessLevel, targetSuccessLevel, target);
    }
  }

  calculateDamage(attackerSuccessLevel: number, targetSuccessLevel: number, target: SkirmishCharacter) {
    let successLevelsDifference = this.calculateSuccessLevelDifference(attackerSuccessLevel, targetSuccessLevel);
    let weapon = this.weapon?.value;
    let weaponDamage = this.calculateWeaponDamage(weapon, this.skirmishCharacter);
    let targetToughnessBonus = this.calculateTraitBonus(target.characteristics.toughness.value);
    let attackerRoll = this.roll?.value + this.modifier?.value;
    let armorPoints = this.getArmorPointsFromAttackLocalization(attackerRoll, this.target?.value);

    let damage = this.calculateFinalDamage(successLevelsDifference, weaponDamage, targetToughnessBonus, armorPoints);
    target.temporaryParameters.currentWounds -= damage;
  }

  private calculateWeaponDamage(weapon: Weapon, character: SkirmishCharacter) {
    let weaponDamage = weapon.damage;
    if (weapon.isUsingStrength) {
      weaponDamage += Math.floor(character.characteristics.strength.value / 10);
    }

    return weaponDamage;
  }

  private calculateSuccessLevelDifference(firstSuccessLevel: number, secondSuccessLevel: number) {
    return firstSuccessLevel - secondSuccessLevel;
  }

  private calculateTraitBonus(traitValue: number) {
    return Math.floor(traitValue / 10);
  }

  private getArmorPointsFromAttackLocalization(attackerRoll: number, target: SkirmishCharacter): number {
    if (attackerRoll >= 1 && attackerRoll <= 9) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.head);
    } else if (attackerRoll >= 10 && attackerRoll <= 24) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.arms);
    } else if (attackerRoll >= 25 && attackerRoll <= 44) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.arms);
    } else if (attackerRoll >= 45 && attackerRoll <= 79) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.body);
    } else if (attackerRoll >= 80 && attackerRoll <= 89) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.legs);
    } else if (attackerRoll >= 90 && attackerRoll <= 100) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.legs);
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
