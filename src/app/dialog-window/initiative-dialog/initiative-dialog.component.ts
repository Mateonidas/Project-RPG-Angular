import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Weapon} from "../../model/weapon/weapon.model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-modal',
  templateUrl: './initiative-dialog.component.html',
  styleUrls: ['./initiative-dialog.component.css']
})
export class InitiativeDialog {

  rollValue!: number;
  text = TextResourceService;

  constructor(@Inject(MAT_DIALOG_DATA) public name: String) {
  }

}
