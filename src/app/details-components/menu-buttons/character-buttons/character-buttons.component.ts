import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../../shared/services/text-resource-service/text-resource.service";
import {AddManyToFightDialog} from "../../../dialog-window/add-many-to-fight/add-many-to-fight-dialog.component";
import {SkirmishCharacterService} from "../../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Character} from "../../../model/character/character.model";

@Component({
  selector: 'app-character-buttons',
  templateUrl: './character-buttons.component.html',
  styleUrls: ['./character-buttons.component.css']
})
export class CharacterButtonsComponent {
  @Input() character!: Character
  text = TextResourceService

  constructor(public skirmishCharacterService: SkirmishCharacterService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected dialog: MatDialog) {
  }

  onAddToFight() {
    this.skirmishCharacterService.storeSkirmishCharacter(this.character)
  }

  onAddManyToFight() {
    const dialogRef = this.dialog.open(AddManyToFightDialog, {
      width: '20%',
    })

    dialogRef.afterClosed().subscribe(number => {
      if (number > 1) {
        this.skirmishCharacterService.storeSkirmishCharacters(this.character, number)
      } else if (number == 1) {
        this.skirmishCharacterService.storeSkirmishCharacter(this.character)
      }
    })
  }

  onCopyCharacter() {
    this.router.navigate(['copy'], {relativeTo: this.route, queryParams: {copy: true}, queryParamsHandling: 'merge'})
  }
}
