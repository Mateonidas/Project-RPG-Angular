import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {SkirmishCharacterService} from "../../shared/services/skirmish-character-service/skirmish-character.service";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {ConditionService} from "../../shared/services/condition-service/condition.service";
import {Model} from "../../model/model";
import {AbstractControl, FormArray, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {CharacterCondition} from "../../model/condition/character-condition.model";
import {AddConditions} from "../../model/condition/add-conditions.model";

@Component({
  selector: 'app-add-condition-dialog',
  templateUrl: './add-condition-dialog.component.html',
  styleUrls: ['./add-condition-dialog.component.css']
})
export class AddConditionDialogComponent implements OnInit{

  skirmishCharacters!: SkirmishCharacter[]
  text = TextResourceService;

  conditionsForm!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public skirmishCharacter: SkirmishCharacter,
              private skirmishCharacterService: SkirmishCharacterService,
              public conditionService: ConditionService,
              public dialogRef: MatDialogRef<AddConditionDialogComponent>) {
  }

  ngOnInit() {
    this.skirmishCharacters = this.skirmishCharacterService.skirmishCharactersList
    this.conditionsForm = new FormGroup({
      'conditions': new FormArray([])
    })
    this.skirmishCharacters.forEach(character => {
      if(character.id === this.skirmishCharacter.id) {
        this.conditionsForm.addControl(character.id.toString(), new FormControl(true))
      } else {
        this.conditionsForm.addControl(character.id.toString(), new FormControl(false))
      }
    })
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }
  checkIfConditionHasCounter(conditionControl: AbstractControl) {
    if (conditionControl.value.condition.hasCounter != null && !conditionControl.value.condition.hasCounter) {
      (<UntypedFormGroup>conditionControl.get('counter')).disable();
    } else {
      (<UntypedFormGroup>conditionControl.get('counter')).enable();
    }
  }

  saveAndCloseDialog() {
    const addConditions = new AddConditions(
      <CharacterCondition[]>this.conditionsForm.value.conditions,
      this.getSelectedCharacters()
    )

    this.dialogRef.close(addConditions)
  }

  onAddCondition() {
    (<FormArray>this.conditionsForm.get('conditions')).push(
      new FormGroup({
        'condition': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
        'counter': new UntypedFormControl({value: null, disabled: true})
      })
    )
  }

  onDeleteCondition(index: number) {
    (<FormArray>this.conditionsForm.get('conditions')).removeAt(index);
  }

  get conditions() {
    return <FormControl[]>(<FormArray>this.conditionsForm.get('conditions')).controls
  }

  getSelectedCharacters() {
    return this.skirmishCharacters.filter(
      character => this.conditionsForm.get(character.id.toString())?.value === true
    ).map(character => character.id);
  }
}
