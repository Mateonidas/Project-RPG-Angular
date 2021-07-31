import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Character} from "../../model/character.model";
import {SkirmishService} from "../skirmish-service/skirmish.service";
import {SkirmishCharacter} from "../../model/skirmish-character.model";
import {CharacterFormArraysWrapper} from "../../model/character-form-arrays-wrapper.model";
import {EditFormComponent} from "../../edit-form/edit-form.component";

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
    let characteristics;
    let formArrays = new CharacterFormArraysWrapper();

    const character = this.skirmishService.getSkirmishCharacter(this.id);
    characterName = character.name;
    characterDescription = character.description;
    characteristics = SkirmishCharacterEditComponent.initEditCharacteristicsTable(character.characteristics);

    this.prepareEditData(character, formArrays);

    this.editCharacterForm = new FormGroup({
      'name': new FormControl(characterName),
      'description': new FormControl(characterDescription),
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
    const characteristics = this.configureCharacteristics();
    const skills = this.editCharacterForm.value.skills;
    const talents = this.editCharacterForm.value.talents;
    const weapons = this.editCharacterForm.value.weapons;
    const armors = this.editCharacterForm.value.armors;

    return new SkirmishCharacter(new Character(
      name,
      description,
      characteristics,
      skills,
      talents,
      weapons,
      armors
    ));
  }
}
