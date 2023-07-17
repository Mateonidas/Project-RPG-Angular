import {Component, OnInit} from '@angular/core';
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

  initForm() {
    let skirmishCharacter = new SkirmishCharacter()
    let formArrays = new CharacterFormArraysWrapper()

    if (this.editMode) {
      skirmishCharacter = this.getSkirmishCharacter()
      formArrays.characteristics = CharacterEditComponent.initEditCharacteristicsTable(skirmishCharacter.character)
      this.isRightHanded = skirmishCharacter.character.isRightHanded
      this.prepareEditData(skirmishCharacter.character, formArrays)
      this.characterBodyLocalizations = skirmishCharacter.character.bodyLocalizations
    } else {
      skirmishCharacter.character.name = ''
      skirmishCharacter.character.description = ''
      formArrays.characteristics = CharacterEditComponent.initCharacteristicsTable()
    }

    this.createEditSkirmishCharacterForm(skirmishCharacter, formArrays)
  }

  createEditSkirmishCharacterForm(skirmishCharacter: SkirmishCharacter, formArrays: CharacterFormArraysWrapper) {
    this.isDead = skirmishCharacter.isDead;
    this.editCharacterForm = new UntypedFormGroup({
      'name': new UntypedFormControl(skirmishCharacter.character.name),
      'description': new UntypedFormControl(skirmishCharacter.character.description),
      'group': new UntypedFormControl(skirmishCharacter.character.group),
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
