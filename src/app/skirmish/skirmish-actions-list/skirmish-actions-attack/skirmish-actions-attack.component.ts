import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AttacksCategoryList} from "../../../model/attack/attacks-category-list.model";
import {AttacksTypeList} from "../../../model/attack/attacks-type-list.model";
import {SkirmishService} from "../../skirmish-service/skirmish.service";
import {SkirmishCharacter} from "../../../model/skirmish-character.model";
import {Weapon} from "../../../model/weapon.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InitiativeDialogWindow} from "../../../dialog-window/initiative-dialog-window/initiative-dialog-window.component";
import {SaveRollDialogWindowComponent} from "../../../dialog-window/save-roll-dialog-window/save-roll-dialog-window.component";
import {BodyLocalizationList} from "../../../model/body-localization.model";

@Component({
  selector: 'app-skirmish-actions-attack',
  templateUrl: './skirmish-actions-attack.component.html',
  styleUrls: ['./skirmish-actions-attack.component.css']
})
export class SkirmishActionsAttackComponent implements OnInit {

  attackForm!: FormGroup;
  skirmishCharacter!: SkirmishCharacter;
  attacksTypeList = AttacksTypeList.attacksTypeList;
  attacksCategoryList = AttacksCategoryList.attacksCategoryList;
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
    this.attackForm = new FormGroup({
      'attackCategory': new FormControl(null),
      'attackType': new FormControl(null),
      'weapon': new FormControl(null),
      'target': new FormControl(null),
      'roll': new FormControl(null),
      'modifier': new FormControl(0),
    })

    this.skirmishCharacter = this.skirmishService.getSkirmishCharacter(this.id);
    this.skirmishCharactersList = this.skirmishService.getSkirmishCharacters();
    this.skirmishCharactersList.splice(this.id, 1);

    this.attacksTypeList = AttacksTypeList.attacksTypeList.filter(x => x.category.name === 'MeleeAttack');
    this.characterWeapons = this.skirmishCharacter.weapons.filter(x => x.type.name === 'MeleeAttack');
  }

  onSubmit() {
    this.attackRoll();
  }

  attackRoll() {
    let attackerRoll = this.attackForm.get('roll')?.value;
    let attackerModifier = this.attackForm.get('modifier')?.value;
    let target = this.attackForm.get('target')?.value;

    this.createSaveRollDialog().subscribe((targetRoll: {rollValue: number, modifier: number}) => {
      let attackerSuccessLevel = this.calculateSuccessLevel(this.skirmishCharacter.characteristics.weaponSkill, attackerRoll, attackerModifier);
      let targetSuccessLevel = this.calculateSuccessLevel(target.characteristics.weaponSkill, targetRoll.rollValue, targetRoll.modifier);
      this.calculateAttackResult(attackerSuccessLevel, targetSuccessLevel, target);
    })
  }

  createSaveRollDialog(){
    const modalRef = this.modalService.open(SaveRollDialogWindowComponent);
    modalRef.componentInstance.name = this.attackForm.get('target')?.value.name;
    return modalRef.componentInstance.rollEntry;
  }

  calculateSuccessLevel(skillValue: number, rollValue: number, modifier: number) {
    return (Math.floor((skillValue + modifier) / 10) - Math.floor(rollValue/10));
  }

  calculateAttackResult(attackerSuccessLevel: number, targetSuccessLevel: number, target: SkirmishCharacter){
    if(attackerSuccessLevel > targetSuccessLevel) {
      this.calculateDamage(attackerSuccessLevel, targetSuccessLevel, target);
    }
  }

  calculateDamage(attackerSuccessLevel: number, targetSuccessLevel: number, target: SkirmishCharacter) {
    let weapon = this.attackForm.get('weapon')?.value;
    let weaponDamage = weapon.damage;
    if (weapon.isUsingStrength) {
      weaponDamage += Math.floor(this.skirmishCharacter.characteristics.strength / 10);
    }

    let successLevelsDifference = attackerSuccessLevel - targetSuccessLevel
    let targetToughnessBonus = Math.floor(target.characteristics.toughness/10);
    let armorPoints = this.calculateAttackLocalization();
    let damage = successLevelsDifference + weaponDamage - targetToughnessBonus - armorPoints;

    if(damage < 1) {
      damage = 1;
    }

    target.temporaryParameters.currentWounds -= damage;
  }

  calculateAttackLocalization() {
    let attackerRoll = this.attackForm.get('roll')?.value + this.attackForm.get('modifier')?.value;
    let target = this.attackForm.get('target')?.value;

    if(attackerRoll >= 1 && attackerRoll <= 9) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.head);
    }
    else if(attackerRoll >= 10 && attackerRoll <= 24) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.arms);
    }
    else if(attackerRoll >= 25 && attackerRoll <= 44) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.arms);
    }
    else if(attackerRoll >= 45 && attackerRoll <= 79) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.body);
    }
    else if(attackerRoll >= 80 && attackerRoll <= 89) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.legs);
    }
    else if(attackerRoll >= 90 && attackerRoll <= 100) {
      return target.getArmorForBodyLocalization(BodyLocalizationList.legs);
    }
  }

  onCategoryChange() {
    let category = this.attackForm.get('attackCategory')?.value.name;
    this.attacksTypeList = AttacksTypeList.attacksTypeList.filter(x => x.category.name === category);
    this.characterWeapons = this.skirmishCharacter.weapons.filter(x => x.type.name === category);
  }
}
