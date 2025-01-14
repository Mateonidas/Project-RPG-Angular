import {Component, Inject} from '@angular/core';
import {TextResourceService} from "../../../../../core/services/text-resource-service/text-resource.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SkirmishCharacter} from "../../../../../core/model/skirmish/skirmish-character.model";

@Component({
    selector: 'app-initiative-dialog',
    templateUrl: './initiative-dialog.component.html',
    styleUrls: ['./initiative-dialog.component.css'],
    standalone: false
})
export class InitiativeDialog {
  text = TextResourceService
  skirmishInitiatives: SkirmishInitiative[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public skirmishCharacters: SkirmishCharacter[],
              public dialogRef: MatDialogRef<InitiativeDialog>) {
    for (const skirmishCharacter of skirmishCharacters) {
      if (!this.skirmishInitiatives.find(s => s.characterName == skirmishCharacter.character.name)) {
        this.skirmishInitiatives.push({
          characterName: skirmishCharacter.sequenceNumber > 1 ? skirmishCharacter.character.name + skirmishCharacter.sequenceNumber : skirmishCharacter.character.name,
          initiative: undefined
        })
      }
    }
  }

  onSaveInitiative() {
    for (const skirmishInitiative of this.skirmishInitiatives) {
      const characters = this.skirmishCharacters.filter(skirmishCharacter => skirmishCharacter.character.name == skirmishInitiative.characterName)
      for (const skirmishCharacter of characters) {
        if (skirmishInitiative.initiative != undefined) {
          skirmishCharacter.skirmishInitiative += skirmishInitiative.initiative
        }
      }
    }

    this.dialogRef.close(this.skirmishCharacters)
  }
}

interface SkirmishInitiative {
  characterName: string,
  initiative: number | undefined
}
