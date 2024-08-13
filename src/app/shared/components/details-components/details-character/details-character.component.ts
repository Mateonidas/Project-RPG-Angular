import {Component, Input} from '@angular/core';
import {SkirmishCharacterService} from "../../../../core/services/skirmish-character-service/skirmish-character.service";
import {Router} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialog} from "@angular/material/dialog";
import {Character} from "../../../../core/model/character/character.model";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Model} from "../../../../core/model/model";
import {
  BottomSheetDescription
} from "../../bottom-sheet/bottom-sheet-description/bottom-sheet-description.component";
import {Spell} from "../../../../core/model/spell/spell.model";

@Component({
  selector: 'app-details-character',
  templateUrl: './details-character.component.html',
  styleUrls: ['./details-character.component.css']
})
export class DetailsCharacterComponent {
  @Input() character!: Character
  text = TextResourceService
  characteristicsColumns: string[] = this.fillCharacteristicsColumn()
  notesColumns: string[] = ['note']
  spellColumns: string[] = ['spell']
  baseColumns: string[] = ['name', 'level']
  weaponColumns: string[] = ['name', 'category', 'reach', 'damage', 'advantagesAndDisadvantages']
  armorsColumns: string[] = ['name', 'category', 'localization', 'armorPoints', 'penalties', 'qualities']

  constructor(public skirmishCharacterService: SkirmishCharacterService,
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

  protected createListOfSpells(spells: Spell[]): (Spell | Group)[] {
    spells.sort((a, b) => a.spellGroup.nameTranslation!.localeCompare(b.spellGroup.nameTranslation!));

    const result: (Spell | Group)[] = [];
    let currentGroupName = '';

    for (const spell of spells) {
      const groupName = spell.spellGroup.nameTranslation!;
      if (groupName !== currentGroupName) {
        result.push({ isGroup: true, name: groupName });
        currentGroupName = groupName;
      }
      result.push(spell);
    }

    return result;
  }

  isGroup(index: number, item: Group): boolean{
    return item.isGroup;
  }

  openBottomSheet(model: Model) {
    this.bottomSheet.open(BottomSheetDescription, {
      data: {nameTranslation: model.nameTranslation, description: model.description},
      panelClass: 'bottom-sheet'
    })
  }
}

export interface Group {
  name: string;
  isGroup: boolean;
}
