import {Component, Inject} from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-simple-roll-dialog',
  templateUrl: './simple-roll-dialog.component.html',
  styleUrls: ['./simple-roll-dialog.component.css']
})
export class SimpleRollDialog {

  title!: string;
  rollForLabel!: string;
  rollValue!: number;
  text = TextResourceService;

  constructor(@Inject(MAT_DIALOG_DATA) public name: String) {
  }

}
