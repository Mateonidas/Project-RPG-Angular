import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AttacksCategoryList} from "../../../model/attack/attack-category.model";
import {AttacksTypeList} from "../../../model/attack/attacks-type-list.model";
import {SkirmishCharacterService} from "../../../shared/services/skirmish-character-service/skirmish-character.service";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {Weapon} from "../../../model/weapon/weapon.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SaveRollDialogWindowComponent} from "../../../dialog-window/save-roll-dialog-window/save-roll-dialog-window.component";
import {AttackType} from 'src/app/model/attack/attack-type.model';
import {AttackReportService} from "../../../dialog-window/report-dialog-window/attack-report-service/attack-report.service";
import {AttackReportDialogWindowComponent} from "../../../dialog-window/report-dialog-window/attack-report-dialog-window.component";
import {RollService} from "../../../shared/services/roll-service/roll.service";
// import {ConditionService} from "../../../shared/services/condition-service/condition.service";
// import {FightService} from "../../../shared/services/fight-service/fight.service";

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
              protected skirmishCharacterService: SkirmishCharacterService,
              private modalService: NgbModal,
              private attackReportService: AttackReportService,
              private rollService: RollService,
              // private conditionService: ConditionService,
              // private fightService: FightService
  ) {
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
    this.attacker = this.skirmishCharacterService.getSkirmishCharacter(this.id);
    this.skirmishCharactersList = this.skirmishCharacterService.getSkirmishCharacters();
    this.skirmishCharactersList.splice(this.id, 1);

    this.attacksTypeList = AttacksTypeList.attacksTypeList.filter(x => x.category.name === 'MELEE');
    this.characterWeapons = this.attacker.weapons.filter(x => x.weaponType.name === 'MELEE');

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
    this.characterWeapons = this.attacker.weapons.filter(x => x.weaponType === category);

    this.attackType?.setValue(this.attacksTypeList[0]);
    this.weapon?.setValue(this.characterWeapons[0]);
  }

  onSubmit() {
    this.attackRoll();
  }

  attackRoll() {
    // this.attacker.isAttacker = true;
    // this.attacker.isDodging = false;
    // this.attacker.usedWeapon = this.weapon?.value;
    // this.attacker.roll.value = this.roll?.value;
    // this.attacker.roll.modifier = this.modifier?.value;
    //
    // let defender: SkirmishCharacter = this.target?.value;
    // defender.isAttacker = false;
    //
    // this.createSaveRollDialog(defender).subscribe(async () => {
    //   await this.fightService.fightCalculation(this.attacker, defender);
    //   this.createReportDialog();
    // })
  }

  createSaveRollDialog(defender: SkirmishCharacter) {
    const modalRef = this.modalService.open(SaveRollDialogWindowComponent);
    modalRef.componentInstance.target = defender;
    return modalRef.componentInstance.emitter;
  }

  createReportDialog() {
    this.modalService.open(AttackReportDialogWindowComponent);
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
