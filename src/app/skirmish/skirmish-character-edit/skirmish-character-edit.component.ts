import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {CharacterFormArraysWrapper} from "../../model/character/character-form-arrays-wrapper.model";
import {ArmorService} from "../../shared/services/armor-service/armor.service";
import {WeaponService} from "../../shared/services/weapon-service/weapon.service";
import {SkillService} from "../../shared/services/skill-service/skill.service";
import {TalentService} from "../../shared/services/talent-service/talent.service";
import {BodyLocalizationService} from "../../shared/services/body-localization-service/body-localization.service";
import {CharacterService} from "../../shared/services/character-service/character.service";
import {InjuryService} from "../../shared/services/injuries-service/injury.service";
import {ConditionService} from "../../shared/services/condition-service/condition.service";
import {CharacterEditComponent} from "../../character/character-edit/character-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {TraitService} from "../../shared/services/trait-service/trait.service";
import {SpellService} from "../../shared/services/spell-service/spell.service";

@Component({
  selector: 'app-skirmish-character-edit',
  templateUrl: '../../character/character-edit/character-edit.component.html',
  styleUrls: ['../../character/character-edit/character-edit.component.css']
})
export class SkirmishCharacterEditComponent extends CharacterEditComponent implements OnInit {

  editMode = false;
  isSkirmishMode = true;

  constructor(router: Router,
              route: ActivatedRoute,
              public skirmishService: SkirmishCharacterService,
              public armorService: ArmorService,
              public weaponService: WeaponService,
              public skillService: SkillService,
              public talentService: TalentService,
              public traitService: TraitService,
              public bodyLocalizationService: BodyLocalizationService,
              public characterService: CharacterService,
              public injuryService: InjuryService,
              public conditionService: ConditionService,
              public spellService: SpellService,
              public dialog: MatDialog) {
    super(router, route, armorService, weaponService, skillService, talentService, traitService, bodyLocalizationService, characterService, injuryService, conditionService, spellService, dialog);
  }

  createEditCharacterForm(character: SkirmishCharacter, formArrays: CharacterFormArraysWrapper) {
    this.isDead = character.isDead;
    this.editCharacterForm = new UntypedFormGroup({
      'name': new UntypedFormControl(character.name),
      'description': new UntypedFormControl(character.description),
      'group': new UntypedFormControl(character.group),
      'characteristics': formArrays.characteristics,
      'skills': formArrays.skills,
      'talents': formArrays.talents,
      'traits': formArrays.traits,
      'isRightHanded': new UntypedFormControl(this.isRightHanded),
      'spells': formArrays.spells,
      'weapons': formArrays.weapons,
      'armors': formArrays.armors,
      'injuries': formArrays.injuries,
      'conditions': formArrays.conditions,
      'currentWounds': new UntypedFormControl(character.currentWounds),
      'skirmishInitiative': new UntypedFormControl(character.skirmishInitiative),
      'advantage': new UntypedFormControl(character.advantage),
      'notes': formArrays.notes,
      'isDead': new UntypedFormControl(character.isDead),
    });
  }

  getCharacter() {
    return this.skirmishService.getSkirmishCharacter(this.id);
  }

  onSubmit() {
    let character = this.createSkirmishCharacter();
    if (this.editMode) {
      character.id = this.id;
    }
    this.skirmishService.updateSkirmishCharacter(character).then(() => {
      this.onCancel();
    })
  }

  createSkirmishCharacter() {
    const character = <SkirmishCharacter>this.createCharacter();

    character.advantage = this.editCharacterForm.value.advantage;
    character.skirmishInitiative = this.editCharacterForm.value.skirmishInitiative;
    character.currentWounds = this.editCharacterForm.value.currentWounds;
    character.isDead = this.editCharacterForm.value.isDead;

    return character;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.onSubmit();
    }
    if (event.key == 'Escape') {
      this.onCancel();
    }
  }
}
