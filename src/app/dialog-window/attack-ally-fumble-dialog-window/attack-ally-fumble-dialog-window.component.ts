// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
// import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
// import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
// import {ConditionsList} from "../../model/conditionsOld/conditions-list.model";
// // import {FightService} from "../../shared/services/fight-service/fight.service";
// import {RollService} from "../../shared/services/roll-service/roll.service";
//
// @Component({
//   selector: 'app-attack-ally-fumble-dialog-window',
//   templateUrl: './attack-ally-fumble-dialog-window.component.html',
//   styleUrls: ['./attack-ally-fumble-dialog-window.component.css']
// })
// export class AttackAllyFumbleDialogWindowComponent implements OnInit {
//
//   @Input() character!: SkirmishCharacter;
//   @Input() fumbleRoll!: number;
//   @Output() emitter = new EventEmitter<{}>();
//   form!: FormGroup
//   skirmishCharactersList!: SkirmishCharacter[];
//
//   constructor(public activeModal: NgbActiveModal,
//               private skirmishCharacterService: SkirmishCharacterService,
//               // private fightService: FightService
//   ) {
//   }
//
//   ngOnInit(): void {
//     this.initForm();
//   }
//
//   private initForm() {
//     this.skirmishCharactersList = this.skirmishCharacterService.getSkirmishCharacters();
//
//     this.form = new FormGroup({
//       'chooseConditionOrAllyAttack': new FormControl(null, [Validators.required]),
//       'target': new FormControl(this.skirmishCharactersList[0], [Validators.required])
//     })
//   }
//
//   onSave() {
//     this.calculateResult();
//     this.emitter.emit();
//     this.activeModal.close('Close click');
//   }
//
//   calculateResult() {
//     // if(this.chooseConditionOrAllyAttack === 'condition') {
//     //   this.character.addCondition(ConditionsList.stunned);
//     //   this.skirmishCharacterService.updateSkirmishCharacter(this.character);
//     // }
//     // else if(this.chooseConditionOrAllyAttack === 'allyAttack') {
//     //   let target: SkirmishCharacter = this.target;
//     //   let damage = this.fightService.calculateFinalDamage(
//     //     Number(this.fumbleRoll.toLocaleString()[1]),
//     //     this.fightService.calculateWeaponDamage(this.character),
//     //     RollService.calculateTraitBonus(target.characteristics.toughness.value),
//     //     this.fightService.getArmorPointsFromAttackLocalization(this.character.roll.value, target)
//     //   );
//     //   target.currentWounds -= damage;
//     //   this.skirmishCharacterService.updateSkirmishCharacter(target);
//     // }
//   }
//
//   get chooseConditionOrAllyAttack() {
//     return this.form.get('chooseConditionOrAllyAttack')?.value;
//   }
//
//   get target() {
//     return this.form.get('target')?.value;
//   }
// }
