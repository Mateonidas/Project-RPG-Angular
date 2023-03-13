import {Component, Inject} from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";

@Component({
  selector: 'app-initiative-dialog',
  templateUrl: './initiative-dialog.component.html',
  styleUrls: ['./initiative-dialog.component.css']
})
export class InitiativeDialog {
  text = TextResourceService;
  skirmishInitiatives: SkirmishInitiative[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public skirmishCharacters: SkirmishCharacter[],
              public dialogRef: MatDialogRef<InitiativeDialog>) {
    for (const skirmishCharacter of skirmishCharacters) {
      this.skirmishInitiatives.push({
        characterId: skirmishCharacter.id,
        characterName: skirmishCharacter.sequenceNumber > 1? skirmishCharacter.name + skirmishCharacter.sequenceNumber : skirmishCharacter.name,
        initiative: undefined
      })
    }
  }

  onSaveInitiative() {
    for (const skirmishInitiative of this.skirmishInitiatives) {
      const character = this.skirmishCharacters.find(character => character.id == skirmishInitiative.characterId)
      if (character != undefined) {
        if(skirmishInitiative.initiative != undefined) {
          character.skirmishInitiative += skirmishInitiative.initiative
        }
      }
    }

    this.dialogRef.close(this.skirmishCharacters)
  }
}

interface SkirmishInitiative {
  characterId: number,
  characterName: string,
  initiative: number|undefined
}
