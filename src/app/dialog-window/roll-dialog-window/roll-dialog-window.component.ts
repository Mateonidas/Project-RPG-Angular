import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-roll-dialog-window',
  templateUrl: './roll-dialog-window.component.html',
  styleUrls: ['./roll-dialog-window.component.css']
})
export class RollDialogWindowComponent implements OnInit {

  @Input() name!: string;
  @Input() useModifier!: boolean;
  @Output() emitter = new EventEmitter<{roll: number, modifier: number}>();
  public rollForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.rollForm = new FormGroup({
      'roll': new FormControl(null, [Validators.required]),
      'modifier': new FormControl(0),
    })
  }

  onSave() {
    this.emitter.emit({roll: this.roll?.value, modifier: this.modifier?.value});
    this.activeModal.close('Close click');
  }

  get roll() {
    return this.rollForm.get('roll');
  }

  get modifier() {
    return this.rollForm.get('modifier');
  }
}
