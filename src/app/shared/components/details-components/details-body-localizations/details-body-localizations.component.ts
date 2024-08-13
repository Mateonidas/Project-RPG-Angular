import {Component, Input, OnInit} from '@angular/core';
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Character} from "../../../../core/model/character/character.model";
import {SkirmishCharacter} from "../../../../core/model/skirmish/skirmish-character.model";
import {CharacterBodyLocalization} from "../../../../core/model/body-localization/character-body-localization.model";
import {SkirmishCharacterService} from "../../../../core/services/skirmish-character-service/skirmish-character.service";
import {SkirmishService} from "../../../../core/services/skirmish-service/skirmish.service";

@Component({
  selector: 'app-details-body-localizations',
  templateUrl: './details-body-localizations.component.html',
  styleUrls: ['./details-body-localizations.component.css']
})
export class DetailsBodyLocalizationsComponent implements OnInit{

  @Input() isSkirmishMode!: boolean
  @Input() character!: Character
  @Input() skirmishCharacter?: SkirmishCharacter
  text = TextResourceService

  bodyLocalizationsColumns: string[] = ['name', 'armorPoints', 'injuries']

  constructor(public skirmishCharacterService: SkirmishCharacterService,
              public skirmishService: SkirmishService) {
  }

  ngOnInit(): void {
    if(this.isSkirmishMode && this.skirmishCharacter != undefined) {
      this.character = this.skirmishCharacter.character
    }
  }

  async addAdditionalArmorPoint(bodyLocalization: CharacterBodyLocalization) {
    await this.skirmishService.addAdditionalArmorPoint(bodyLocalization)
    this.skirmishCharacter = await this.skirmishCharacterService.reloadSkirmishCharacter(this.skirmishCharacter!.id)
    this.character = this.skirmishCharacter.character
  }

  async removeAdditionalArmorPoint(bodyLocalization: CharacterBodyLocalization) {
    await this.skirmishService.removeAdditionalArmorPoint(bodyLocalization)
    this.skirmishCharacter = await this.skirmishCharacterService.reloadSkirmishCharacter(this.skirmishCharacter!.id)
    this.character = this.skirmishCharacter.character
  }
}
