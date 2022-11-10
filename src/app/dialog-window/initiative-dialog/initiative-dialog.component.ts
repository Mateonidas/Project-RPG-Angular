import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
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
