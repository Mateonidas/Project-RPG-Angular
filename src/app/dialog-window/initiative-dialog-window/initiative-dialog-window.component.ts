import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  templateUrl: './initiative-dialog-window.component.html',
  styleUrls: ['./initiative-dialog-window.component.css']
})
export class InitiativeDialogWindow implements OnInit {
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
