import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-save-roll-dialog-window',
  templateUrl: './save-roll-dialog-window.component.html',
  styleUrls: ['./save-roll-dialog-window.component.css']
})
export class SaveRollDialogWindowComponent implements OnInit {

  @Input() name!: string;
  @Output() rollEntry = new EventEmitter<{rollValue: number, modifier: number}>();
  public rollValue!: number;
  public modifier!: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onSave(): void {
    this.rollEntry.emit({rollValue: this.rollValue, modifier : this.modifier});
    this.activeModal.close('Close click')
  }

}
