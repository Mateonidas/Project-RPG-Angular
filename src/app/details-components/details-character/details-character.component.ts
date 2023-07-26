import {Component, Input} from '@angular/core';
import {CharacterService} from "../../shared/services/character-service/character.service";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialog} from "@angular/material/dialog";
import {Character} from "../../model/character/character.model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Model} from "../../model/model";
import {
  BottomSheetDescription
} from "../../shared/bottom-sheet/bottom-sheet-description/bottom-sheet-description.component";

@Component({
  selector: 'app-details-character',
  templateUrl: './details-character.component.html',
  styleUrls: ['./details-character.component.css']
})
export class DetailsCharacterComponent {
  @Input() character!: Character
  text = TextResourceService
  characteristicsColumns: string[] = this.fillCharacteristicsColumn()
  bodyLocalizationsColumns: string[] = ['name', 'armorPoints', 'injuries']
  notesColumns: string[] = ['note']
  spellColumns: string[] = ['spell']
  baseColumns: string[] = ['name', 'level']
  weaponColumns: string[] = ['name', 'category', 'reach', 'damage', 'advantagesAndDisadvantages']
  armorsColumns: string[] = ['name', 'category', 'localization', 'armorPoints', 'penalties', 'qualities']

  constructor(public characterService: CharacterService,
              public skirmishCharacterService: SkirmishCharacterService,
              protected route: ActivatedRoute,
              protected router: Router,
              protected bottomSheet: MatBottomSheet,
              protected dialog: MatDialog) {
  }

  private fillCharacteristicsColumn() {
    return [
      "MOVEMENT",
      "WEAPON_SKILL",
      "BALLISTIC_SKILL",
      "STRENGTH",
      "TOUGHNESS",
      "INITIATIVE",
      "AGILITY",
      "DEXTERITY",
      "INTELLIGENCE",
      "WILLPOWER",
      "FELLOWSHIP",
      "WOUNDS"
    ]
  }

  openBottomSheet(model: Model) {
    this.bottomSheet.open(BottomSheetDescription, {
      data: {nameTranslation: model.nameTranslation, description: model.description},
      panelClass: 'bottom-sheet'
    })
  }
}
