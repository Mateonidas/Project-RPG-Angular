import {Component, Inject, OnInit} from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ReceivedDamage} from "../../model/receive-damage/receive-damage.model";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {Model} from "../../model/model";

@Component({
  selector: 'app-receive-damage-dialog',
  templateUrl: './receive-damage-dialog.component.html',
  styleUrls: ['./receive-damage-dialog.component.css']
})
export class ReceiveDamageDialog implements OnInit {

  receivedDamage!: ReceivedDamage;
  text = TextResourceService;

  constructor(@Inject(MAT_DIALOG_DATA) public character: SkirmishCharacter) {
  }

  ngOnInit(): void {
    this.receivedDamage = new ReceivedDamage(this.character.id);
    this.receivedDamage.isWeaponUndamaging = false;
    this.receivedDamage.isLosingTest = true;
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }
}
