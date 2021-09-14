import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SkirmishCharacter} from "../../model/skirmish-character.model";

@Component({
  selector: 'app-save-roll-dialog-window',
  templateUrl: './save-roll-dialog-window.component.html',
  styleUrls: ['./save-roll-dialog-window.component.css']
})
export class SaveRollDialogWindowComponent implements OnInit {

  @Input() target!: SkirmishCharacter;
  @Output() rollEntry = new EventEmitter<{rollValue: number, skillOrCharacteristicValue: number, modifier: number}>();
  public saveForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = new FormGroup({
      'roll': new FormControl(null, [Validators.required]),
      'checkSkillOrCharacteristic': new FormControl(null, [Validators.required]),
      'skillOrCharacteristic': new FormControl(null, [Validators.required]),
      'modifier': new FormControl(0, [Validators.required]),
    })
  }

  onSave(): void {
    this.rollEntry.emit({rollValue: this.roll?.value, skillOrCharacteristicValue: this.skillOrCharacteristic?.value.value, modifier : this.modifier?.value});
    this.activeModal.close('Close click')
  }

  get roll() {
    return this.saveForm.get('roll');
  }

  get modifier() {
    return this.saveForm.get('modifier');
  }

  get checkSkillOrCharacteristic() {
    return this.saveForm.get('checkSkillOrCharacteristic')?.value;
  }

  get skillOrCharacteristic() {
    return this.saveForm.get('skillOrCharacteristic');
  }

  get characteristics() {
    return this.target.characteristics.characteristics.filter(x => x.name != 'Movement' && x.name != 'Wounds');
  }
}
