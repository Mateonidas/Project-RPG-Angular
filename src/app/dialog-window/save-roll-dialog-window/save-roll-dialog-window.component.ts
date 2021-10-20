import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AttackReportService} from "../report-dialog-window/attack-report-service/attack-report.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";

@Component({
  selector: 'app-save-roll-dialog-window',
  templateUrl: './save-roll-dialog-window.component.html',
  styleUrls: ['./save-roll-dialog-window.component.css']
})
export class SaveRollDialogWindowComponent implements OnInit {

  @Input() target!: SkirmishCharacter;
  @Output() emitter = new EventEmitter<{}>();
  public saveForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private attackReportService: AttackReportService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = new FormGroup({
      'roll': new FormControl(null, [Validators.required]),
      'checkDefendTrait': new FormControl(null, [Validators.required]),
      'isFlanked': new FormControl(false),
      'defendTrait': new FormControl(null),
      'modifier': new FormControl(0, [Validators.required]),
    })
  }

  onSave(): void {
    this.target.roll = this.roll?.value;
    this.attackReportService.targetRoll = String(this.target.roll);
    this.calculateDefendTrait();
    this.target.modifier = this.modifier?.value;
    this.attackReportService.targetModifier = String(this.target.modifier);
    this.target.isFlanked = this.isFlanked?.value;

    this.emitter.emit();
    this.activeModal.close('Close click')
  }

  calculateDefendTrait() {
    if (this.checkDefendTrait === 'weapon') {
      this.target.usedWeapon = this.defendTrait?.value;
      this.target.isDodging = false;
      this.attackReportService.targetDefenceTrait = 'Broń: ' + this.target.usedWeapon.nameTranslation;
    } else {
      this.target.isDodging = true;
      this.attackReportService.targetDefenceTrait = 'Unik';
    }
  }

  get roll() {
    return this.saveForm.get('roll');
  }

  get modifier() {
    return this.saveForm.get('modifier');
  }

  get checkDefendTrait() {
    return this.saveForm.get('checkDefendTrait')?.value;
  }

  get defendTrait() {
    return this.saveForm.get('defendTrait');
  }

  get characteristics() {
    return this.target.characteristics.characteristics.filter(x => x.base.name != 'Movement' && x.base.name != 'Wounds');
  }

  get characterWeapon() {
    return this.target.weapons;
  }

  get isFlanked() {
    return this.saveForm.get('isFlanked');
  }
}
