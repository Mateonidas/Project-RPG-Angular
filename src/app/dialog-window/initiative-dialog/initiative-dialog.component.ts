import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Weapon} from "../../model/weapon/weapon.model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {SimpleRollDialog} from "../simple-roll-dialog/simple-roll-dialog.component";

@Component({
  selector: 'app-modal',
  templateUrl: '../../dialog-window/simple-roll-dialog/simple-roll-dialog.component.html',
  styleUrls: ['../../dialog-window/simple-roll-dialog/simple-roll-dialog.component.css']
})
export class InitiativeDialog extends SimpleRollDialog implements OnInit{

  rollValue!: number;
  text = TextResourceService;

  constructor(@Inject(MAT_DIALOG_DATA) public name: String) {
    super(name);
  }

  ngOnInit(): void {
    this.title = this.text.getText().initiativeRollLabel;
    this.rollForLabel = this.text.getText().rollForLabel + ' ' + this.name;
  }

}
