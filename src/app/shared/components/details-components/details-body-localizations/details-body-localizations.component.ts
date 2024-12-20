import {Component, Input, OnInit} from '@angular/core';
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Character} from "../../../../core/model/character/character.model";
import {SkirmishCharacter} from "../../../../core/model/skirmish/skirmish-character.model";
import {CharacterBodyLocalization} from "../../../../core/model/body-localization/character-body-localization.model";
import {
  SkirmishCharacterService
} from "../../../../core/services/skirmish-character-service/skirmish-character.service";
import {SkirmishService} from "../../../../core/services/skirmish-service/skirmish.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Model} from "../../../../core/model/model";
import {BottomSheetDescription} from "../../bottom-sheet/bottom-sheet-description/bottom-sheet-description.component";
import {CharacterService} from "../../../../core/services/character-service/character.service";

@Component({
    selector: 'app-details-body-localizations',
    templateUrl: './details-body-localizations.component.html',
    styleUrls: ['./details-body-localizations.component.css'],
    standalone: false
})
export class DetailsBodyLocalizationsComponent implements OnInit {

  @Input() isSkirmishMode!: boolean
  @Input() character!: Character
  @Input() skirmishCharacter?: SkirmishCharacter
  text = TextResourceService

  bodyLocalizationsColumns: string[] = ['name', 'armorPoints', 'injuries']

  constructor(public skirmishCharacterService: SkirmishCharacterService,
              public characterService: CharacterService,
              public skirmishService: SkirmishService,
              protected bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    if (this.isSkirmishMode && this.skirmishCharacter != undefined) {
      this.character = this.skirmishCharacter.character
    }

    this.characterService.charactersChanged.subscribe(
      (characters: Character[]) => {
        const foundCharacter = characters.find(item => item.id === this.character.id);
        this.character = foundCharacter ? foundCharacter : this.character;
      }
    )
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

  openBottomSheet(model: Model) {
    this.bottomSheet.open(BottomSheetDescription, {
      data: {nameTranslation: model.nameTranslation, description: model.description},
      panelClass: 'bottom-sheet'
    })
  }
}
