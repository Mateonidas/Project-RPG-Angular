import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Character} from "../../model/character/character.model";
import {SkirmishService} from "../skirmish-service/skirmish.service";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {CharacterFormArraysWrapper} from "../../model/character/character-form-arrays-wrapper.model";
import {EditFormComponent} from "../../edit-form/edit-form.component";
import {Condition} from "../../model/conditions/condition.model";
import {ConditionsList} from "../../model/conditions/conditions-list.model";

@Component({
  selector: 'app-skirmish-character-edit',
  templateUrl: './skirmish-character-edit.component.html',
  styleUrls: ['./skirmish-character-edit.component.css']
})
export class SkirmishCharacterEditComponent extends EditFormComponent implements OnInit {

  conditionList = ConditionsList.list;

  constructor(router: Router,
              route: ActivatedRoute,
              private skirmishService: SkirmishService) {
    super(router, route);
  }

  initForm() {
    const character = this.skirmishService.getSkirmishCharacter(this.id);
    let characterName = character.name;
    let characterDescription = character.description;
    let isRightHanded = character.isRightHanded;
    let characteristics = SkirmishCharacterEditComponent.initEditCharacteristicsTable(character.characteristics);
    let conditions = this.prepareConditionsList(character.conditions);
    let formArrays = new CharacterFormArraysWrapper();
    this.isDead = character.isDead;

    this.prepareEditData(character, formArrays);

    this.editCharacterForm = new FormGroup({
      'name': new FormControl(characterName),
      'description': new FormControl(characterDescription),
      'isDead': new FormControl(this.isDead),
      'currentWounds': new FormControl(character.currentWounds),
      'skirmishInitiative': new FormControl(character.skirmishInitiative),
      'advantage': new FormControl(character.advantage),
      'conditions': conditions,
      'characteristics': characteristics,
      'skills': formArrays.skills,
      'talents': formArrays.talents,
      'isRightHanded': new FormControl(isRightHanded),
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
    const isRightHanded = this.editCharacterForm.value.isRightHanded;
    const weapons = this.editCharacterForm.value.weapons;
    const armors = this.editCharacterForm.value.armors;

    let skirmishCharacter = new SkirmishCharacter(new Character(
      name,
      description,
      characteristics,
      skills,
      talents,
      isRightHanded,
      weapons,
      armors
    ));
    skirmishCharacter.currentWounds = this.editCharacterForm.value.currentWounds;
    skirmishCharacter.skirmishInitiative = this.editCharacterForm.value.skirmishInitiative;
    skirmishCharacter.advantage = this.editCharacterForm.value.advantage;
    skirmishCharacter.conditions = this.editCharacterForm.value.conditions;
    skirmishCharacter.isDead = this.editCharacterForm.value.isDead;

    return skirmishCharacter;
  }

  prepareConditionsList(conditionsList:Condition[]) {
    let conditions = new FormArray([]);
    for (let condition of conditionsList) {
      conditions.push(
        new FormGroup({
          'base': new FormControl(condition.base),
          'value': new FormControl(condition.value),
        })
      )
    }
    return conditions;
  }

  get conditions() {
    return (<FormArray>this.editCharacterForm.get('conditions')).controls;
  }

  onAddCondition() {
    (<FormArray>this.editCharacterForm.get('conditions')).push(
      new FormGroup({
        'base': new FormControl(null),
        'value': new FormControl(null),
      })
    )
  }

  onDeleteCondition(index: number) {
    (<FormArray>this.editCharacterForm.get('conditions')).removeAt(index);
  }
}
