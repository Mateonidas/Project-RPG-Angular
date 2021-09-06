import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-save-roll-dialog-window',
  templateUrl: './save-roll-dialog-window.component.html',
  styleUrls: ['./save-roll-dialog-window.component.css']
})
export class SaveRollDialogWindowComponent implements OnInit {

  @Input() name!: string;
  @Output() rollEntry = new EventEmitter<{rollValue: number, modifier: number}>();
  public saveForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = new FormGroup({
      'roll': new FormControl(null),
      'modifier': new FormControl(0),
    })
  }

  onSave(): void {
    this.rollEntry.emit({rollValue: this.saveForm.get('roll')?.value, modifier : this.saveForm.get('modifier')?.value});
    this.activeModal.close('Close click')
  }

}
