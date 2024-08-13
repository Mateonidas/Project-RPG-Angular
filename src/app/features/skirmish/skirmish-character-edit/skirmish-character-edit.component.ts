import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {SkirmishCharacterService} from "../../../core/services/skirmish-character-service/skirmish-character.service";
import {SkirmishCharacter} from "../../../core/model/skirmish/skirmish-character.model";
import {CharacterFormArraysWrapper} from "../../../core/model/character/character-form-arrays-wrapper.model";
import {CharacterService} from "../../../core/services/character-service/character.service";
import {CharacterEditComponent} from "../../character/character-edit/character-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {
  CharacteristicsEditComponent
} from "../../../shared/components/edit-form-components/characteristics-edit/characteristics-edit.component";
import {SkillService} from "../../../core/services/skill-service/skill.service";
import {TalentService} from "../../../core/services/talent-service/talent.service";
import {TraitService} from "../../../core/services/trait-service/trait.service";
import {InjuryService} from "../../../core/services/injuries-service/injury.service";

@Component({
  selector: 'app-skirmish-character-edit',
  templateUrl: './skirmish-character-edit.component.html',
  styleUrls: ['./skirmish-character-edit.component.css']
})
export class SkirmishCharacterEditComponent extends CharacterEditComponent implements OnInit {

  editMode = false;

  constructor(router: Router,
              route: ActivatedRoute,
              public skirmishService: SkirmishCharacterService,
              public characterService: CharacterService,
              public skillService: SkillService,
              public talentService: TalentService,
              public traitService: TraitService,
              public injuryService: InjuryService,
              public dialog: MatDialog) {
    super(router, route, characterService, skillService, talentService, traitService, injuryService, dialog);
  }

  initForm() {
    let skirmishCharacter = new SkirmishCharacter()
    let formArrays = new CharacterFormArraysWrapper()

    if (this.editMode) {
      skirmishCharacter = this.getSkirmishCharacter()
      this.isRightHanded = skirmishCharacter.character.isRightHanded
      this.prepareEditData(skirmishCharacter.character, formArrays)
      this.characterBodyLocalizations = skirmishCharacter.character.bodyLocalizations
    } else {
      skirmishCharacter.character.name = ''
      skirmishCharacter.character.description = ''
    }

    formArrays.characteristics = CharacteristicsEditComponent.initCharacteristicsTable(skirmishCharacter.character.characteristics)
    this.createEditSkirmishCharacterForm(skirmishCharacter, formArrays)
  }

  createEditSkirmishCharacterForm(skirmishCharacter: SkirmishCharacter, formArrays: CharacterFormArraysWrapper) {
    this.isDead = skirmishCharacter.isDead;
    this.editCharacterForm = new UntypedFormGroup({
      'name': new UntypedFormControl(skirmishCharacter.character.name),
      'description': new UntypedFormControl(skirmishCharacter.character.description),
      'groupType': new UntypedFormControl(skirmishCharacter.character.groupType),
      'group': new UntypedFormControl(skirmishCharacter.character.group),
      'status': new UntypedFormControl(skirmishCharacter.character.status),
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
      'currentWounds': new UntypedFormControl(skirmishCharacter.currentWounds),
      'skirmishInitiative': new UntypedFormControl(skirmishCharacter.skirmishInitiative),
      'advantage': new UntypedFormControl(skirmishCharacter.advantage),
      'notes': formArrays.notes,
      'isDead': new UntypedFormControl(skirmishCharacter.isDead),
      'sequenceNumber': new UntypedFormControl(skirmishCharacter.sequenceNumber)
    });
  }

  getSkirmishCharacter() {
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
    const skirmishCharacter = new SkirmishCharacter()

    skirmishCharacter.character = this.createCharacter();
    skirmishCharacter.advantage = this.editCharacterForm.value.advantage;
    skirmishCharacter.skirmishInitiative = this.editCharacterForm.value.skirmishInitiative;
    skirmishCharacter.currentWounds = this.editCharacterForm.value.currentWounds;
    skirmishCharacter.isDead = this.editCharacterForm.value.isDead;
    skirmishCharacter.sequenceNumber = this.editCharacterForm.value.sequenceNumber;

    return skirmishCharacter;
  }
}
