import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Character} from "../../model/character/character.model";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
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
              private skirmishService: SkirmishCharacterService) {
    super(router, route);
  }

  initForm() {
    const character = this.skirmishService.getSkirmishCharacter(this.id);
    let characterName = character.name;
    let characterDescription = character.description;
    let isRightHanded = character.isRightHanded;
    let characteristics = SkirmishCharacterEditComponent.initEditCharacteristicsTable(character.characteristics);
    let formArrays = new CharacterFormArraysWrapper();
    this.isDead = character.isDead;

    this.prepareEditData(character, formArrays);
    this.prepareSkirmishEditData(character, formArrays)

    this.editCharacterForm = new FormGroup({
      'name': new FormControl(characterName),
      'description': new FormControl(characterDescription),
      'isDead': new FormControl(this.isDead),
      'currentWounds': new FormControl(character.currentWounds),
      'skirmishInitiative': new FormControl(character.skirmishInitiative),
      'advantage': new FormControl(character.advantage),
      'notes': formArrays.notes,
      'conditions': formArrays.conditions,
      'characteristics': characteristics,
      'skills': formArrays.skills,
      'talents': formArrays.talents,
      'isRightHanded': new FormControl(isRightHanded),
      'weapons': formArrays.weapons,
      'armors': formArrays.armors
    });
  }

  prepareSkirmishEditData(character: SkirmishCharacter, formArrays: CharacterFormArraysWrapper) {
    if (character.conditions) {
      this.prepareConditionsList(formArrays.conditions, character.conditions);
    }
    if (character.notes) {
      this.prepareNotesList(formArrays.notes, character.notes)
    }
  }

  prepareNotesList(notes: FormArray, notesList: string[]) {
    for (let note of notesList) {
      notes.push(
        new FormControl(note))
    }
  }

  prepareConditionsList(conditions: FormArray, conditionsList: Condition[]) {
    for (let condition of conditionsList) {
      conditions.push(
        new FormGroup({
          'base': new FormControl(condition.base),
          'value': new FormControl(condition.value),
          'incurableValue': new FormControl(condition.incurableValue),
        })
      )
    }
  }

  onSubmit() {
    this.skirmishService.updateSkirmishCharacter(this.createCharacter());
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
      ),
      this.id);
    skirmishCharacter.currentWounds = this.editCharacterForm.value.currentWounds;
    skirmishCharacter.skirmishInitiative = this.editCharacterForm.value.skirmishInitiative;
    skirmishCharacter.advantage = this.editCharacterForm.value.advantage;
    skirmishCharacter.notes = this.editCharacterForm.value.notes;
    skirmishCharacter.conditions = this.editCharacterForm.value.conditions;
    skirmishCharacter.isDead = this.editCharacterForm.value.isDead;

    return skirmishCharacter;
  }

  get conditions() {
    return (<FormArray>this.editCharacterForm.get('conditions')).controls;
  }

  onAddCondition() {
    (<FormArray>this.editCharacterForm.get('conditions')).push(
      new FormGroup({
        'base': new FormControl(null),
        'value': new FormControl(null),
        'incurableValue': new FormControl(null),
      })
    )
  }

  onDeleteCondition(index: number) {
    (<FormArray>this.editCharacterForm.get('conditions')).removeAt(index);
  }

  get notes() {
    return (<FormArray>this.editCharacterForm.get('notes')).controls;
  }

  onAddNote() {
    (<FormArray>this.editCharacterForm.get('notes')).push(
      new FormControl(null),
    )
  }

  onDeleteNote(index: number) {
    (<FormArray>this.editCharacterForm.get('notes')).removeAt(index);
  }
}
