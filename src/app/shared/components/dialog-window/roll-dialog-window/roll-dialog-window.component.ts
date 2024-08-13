import {Component, Inject} from '@angular/core';
import {EndTurnCheck} from "../../../../core/model/end-turn-check/end-turn-check.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";

@Component({
  selector: 'app-roll-dialog-window',
  templateUrl: './roll-dialog-window.component.html',
  styleUrls: ['./roll-dialog-window.component.css']
})
export class RollDialogWindow {

  text = TextResourceService;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { endTurnCheck: EndTurnCheck, testType: string }) {
  }
}
