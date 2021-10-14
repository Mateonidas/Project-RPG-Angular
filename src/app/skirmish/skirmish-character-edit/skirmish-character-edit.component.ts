import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Character} from "../../model/character.model";
import {SkirmishService} from "../skirmish-service/skirmish.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {CharacterFormArraysWrapper} from "../../model/character-form-arrays-wrapper.model";
import {EditFormComponent} from "../../edit-form/edit-form.component";
import {TemporaryParameters} from "../../model/temporary-parameters.model";

@Component({
  selector: 'app-skirmish-character-edit',
  templateUrl: './skirmish-character-edit.component.html',
  styleUrls: ['./skirmish-character-edit.component.css']
})
export class SkirmishCharacterEditComponent extends EditFormComponent implements OnInit {

  constructor(router: Router,
              route: ActivatedRoute,
              private skirmishService: SkirmishService) {
    super(router, route);
  }

  initForm() {
    let characterName = '';
    let characterDescription = '';
    let temporaryParameters;
    let characteristics;
    let formArrays = new CharacterFormArraysWrapper();

    const character = this.skirmishService.getSkirmishCharacter(this.id);
    characterName = character.name;
    characterDescription = character.description;
    temporaryParameters = character.temporaryParameters;
    characteristics = SkirmishCharacterEditComponent.initEditCharacteristicsTable(character.characteristics);

    this.prepareEditData(character, formArrays);

    this.editCharacterForm = new FormGroup({
      'name': new FormControl(characterName),
      'description': new FormControl(characterDescription),
      'temporaryWounds': new FormControl(temporaryParameters.currentWounds),
      'temporaryInitiative': new FormControl(temporaryParameters.skirmishInitiative),
      'characteristics': characteristics,
      'skills': formArrays.skills,
      'talents': formArrays.talents,
      'weapons': formArrays.weapons,
      'armors': formArrays.armors
    });
  }

  onSubmit() {
    this.skirmishService.updateSkirmishCharacter(this.id, this.createCharacter());
    this.onCancel()
  }

  createCharacter() {
    this.configureFields();
    return this.createCharacterModel();
  }

  createCharacterModel() {
    const name = this.editCharacterForm.value.name;
    const description = this.editCharacterForm.value.description;
    const temporaryParameters = this.configureTemporaryParameters();
    const characteristics = this.configureCharacteristics();
    const skills = this.editCharacterForm.value.skills;
    const talents = this.editCharacterForm.value.talents;
    const weapons = this.editCharacterForm.value.weapons;
    const armors = this.editCharacterForm.value.armors;

    let skirmishCharacter = new SkirmishCharacter(new Character(
      name,
      description,
      characteristics,
      skills,
      talents,
      weapons,
      armors
    ));
    skirmishCharacter.setTemporaryParameters(temporaryParameters);

    return skirmishCharacter;
  }

  configureTemporaryParameters() {
    return new TemporaryParameters(
      this.editCharacterForm.value.temporaryWounds,
      this.editCharacterForm.value.temporaryInitiative)
  }
}
