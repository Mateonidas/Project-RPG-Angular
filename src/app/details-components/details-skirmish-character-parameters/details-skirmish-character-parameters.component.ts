import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {SkirmishService} from "../../shared/services/skirmish-service/skirmish.service";

@Component({
  selector: 'app-details-skirmish-character-parameters',
  templateUrl: './details-skirmish-character-parameters.component.html',
  styleUrls: ['./details-skirmish-character-parameters.component.css']
})
export class DetailsSkirmishCharacterParametersComponent {
  text = TextResourceService
  @Input() skirmishCharacter!: SkirmishCharacter
  temporaryParametersColumns: string[] = ['isAlive', 'currentWounds', 'initiative', 'advantage']

  constructor(public skirmishCharacterService: SkirmishCharacterService,
              public skirmishService: SkirmishService) {
  }

  async addAdvantagePoint() {
    await this.skirmishService.addAdvantagePoint(this.skirmishCharacter.id)
    this.skirmishCharacter = await this.skirmishCharacterService.reloadSkirmishCharacter(this.skirmishCharacter.id)
  }

  async removeAdvantagePoint() {
    await this.skirmishService.removeAdvantagePoint(this.skirmishCharacter.id)
    this.skirmishCharacter = await this.skirmishCharacterService.reloadSkirmishCharacter(this.skirmishCharacter.id)
  }
}
