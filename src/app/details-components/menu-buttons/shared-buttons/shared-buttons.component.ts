import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../../shared/services/text-resource-service/text-resource.service";
import {CharacterService} from "../../../shared/services/character-service/character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SkirmishCharacterService} from "../../../shared/services/skirmish-character-service/skirmish-character.service";

@Component({
  selector: 'app-shared-buttons',
  templateUrl: './shared-buttons.component.html',
  styleUrls: ['./shared-buttons.component.css']
})
export class SharedButtonsComponent {
  text = TextResourceService
  @Input() id!: number
  @Input() isSkirmishMode!: boolean

  constructor(public characterService: CharacterService,
              public skirmishCharacterService: SkirmishCharacterService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected dialog: MatDialog) {
  }

  onEditCharacter() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteCharacter() {
    if(this.isSkirmishMode) {
      this.skirmishCharacterService.removeSkirmishCharacter(this.id)
      this.router.navigate(['skirmish'])
    } else {
      this.characterService.removeCharacter(this.id)
      this.router.navigate(['characters'])
    }
  }
}
