import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-save-roll-dialog-window',
  templateUrl: './save-roll-dialog-window.component.html',
  styleUrls: ['./save-roll-dialog-window.component.css']
})
export class SaveRollDialogWindowComponent implements OnInit {

  @Input() name!: string;
  @Output() rollEntry: EventEmitter<any> = new EventEmitter();
  public rollValue!: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onSave(): void {
    this.rollEntry.emit(this.rollValue);
    this.activeModal.close('Close click')
  }

}
