import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {SkirmishService} from "../../shared/services/skirmish-service/skirmish.service";
import {Model} from "../../model/model";
import {
  BottomSheetDescription
} from "../../shared/bottom-sheet/bottom-sheet-description/bottom-sheet-description.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-details-skirmish-character-parameters',
  templateUrl: './details-skirmish-character-parameters.component.html',
  styleUrls: ['./details-skirmish-character-parameters.component.css']
})
export class DetailsSkirmishCharacterParametersComponent {
  text = TextResourceService
  @Input() skirmishCharacter!: SkirmishCharacter
  temporaryParametersColumns: string[] = ['isAlive', 'currentWounds', 'initiative', 'advantage']
  baseColumns: string[] = ['name', 'level']

  constructor(public skirmishCharacterService: SkirmishCharacterService,
              public skirmishService: SkirmishService,
              protected bottomSheet: MatBottomSheet) {
  }

  async addAdvantagePoint() {
    await this.skirmishService.addAdvantagePoint(this.skirmishCharacter.id)
    this.skirmishCharacter = await this.skirmishCharacterService.reloadSkirmishCharacter(this.skirmishCharacter.id)
  }

  async removeAdvantagePoint() {
    await this.skirmishService.removeAdvantagePoint(this.skirmishCharacter.id)
    this.skirmishCharacter = await this.skirmishCharacterService.reloadSkirmishCharacter(this.skirmishCharacter.id)
  }

  openBottomSheet(model: Model) {
    this.bottomSheet.open(BottomSheetDescription, {
      data: {nameTranslation: model.nameTranslation, description: model.description},
      panelClass: 'bottom-sheet'
    })
  }
}
