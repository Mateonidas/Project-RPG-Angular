import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SkirmishCharacter} from "../../model/skirmish-character.model";
import {SkirmishService} from "../../skirmish/skirmish-service/skirmish.service";
import {AttackReportService} from "../../attack-report-service/attack-report.service";

@Component({
  selector: 'app-save-roll-dialog-window',
  templateUrl: './save-roll-dialog-window.component.html',
  styleUrls: ['./save-roll-dialog-window.component.css']
})
export class SaveRollDialogWindowComponent implements OnInit {

  @Input() target!: SkirmishCharacter;
  @Output() rollEntry = new EventEmitter<{ rollValue: number, defendTraitValue: number, modifier: number }>();
  public saveForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              protected skirmishService: SkirmishService,
              private attackReportService: AttackReportService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = new FormGroup({
      'roll': new FormControl(null, [Validators.required]),
      'checkDefendTrait': new FormControl(null, [Validators.required]),
      'defendTrait': new FormControl(null, [Validators.required]),
      'modifier': new FormControl(0, [Validators.required]),
    })
  }

  onSave(): void {
    this.rollEntry.emit({
      rollValue: this.roll?.value,
      defendTraitValue: this.calculateDefendTrait(),
      modifier: this.modifier?.value
    });
    this.activeModal.close('Close click')
  }

  calculateDefendTrait() {
    let defendTrait;

    if (this.checkDefendTrait === 'skill' || this.checkDefendTrait === 'characteristic') {
      defendTrait = this.defendTrait?.value;
      this.attackReportService.targetDefenceTrait = defendTrait.base.nameTranslation;

      return defendTrait.value;
    }
    else if (this.checkDefendTrait === 'weapon') {
      defendTrait = this.skirmishService.getFightTrait(this.defendTrait?.value, this.target);
      this.attackReportService.targetDefenceTrait = defendTrait.base.nameTranslation;

      return defendTrait.value;
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
}
