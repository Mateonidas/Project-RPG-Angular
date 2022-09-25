import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EndTurnCheck} from "../../model/end-turn-check/end-turn-check.model";

@Component({
  selector: 'app-roll-dialog-window',
  templateUrl: './roll-dialog-window.component.html',
  styleUrls: ['./roll-dialog-window.component.css']
})
export class RollDialogWindow implements OnInit {

  @Input() endTurnCheck!: EndTurnCheck;
  @Input() testType!: string;
  @Output() emitter: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.emitter.emit();
    this.activeModal.close('Close click')
  }
}
