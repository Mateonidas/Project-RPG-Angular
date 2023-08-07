import {Component, Input} from '@angular/core';
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {AbstractControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {Model} from "../../model/model";
import {ConditionService} from "../../shared/services/condition-service/condition.service";
import {CharacterCondition} from "../../model/condition/character-condition.model";

@Component({
  selector: 'app-conditions-edit',
  templateUrl: './conditions-edit.component.html',
  styleUrls: ['./conditions-edit.component.css']
})
export class ConditionsEditComponent {
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  constructor(public conditionService: ConditionService,) {
  }

  checkIfConditionHasCounter(conditionControl: AbstractControl) {
    if (conditionControl.value.condition.hasCounter != null && !conditionControl.value.condition.hasCounter) {
      (<UntypedFormGroup>conditionControl.get('counter')).disable()
    } else {
      (<UntypedFormGroup>conditionControl.get('counter')).enable()
    }
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  static prepareConditionsList(conditions: UntypedFormArray, conditionsList: CharacterCondition[]) {
    for (let characterCondition of conditionsList) {

      let counter = new UntypedFormControl(characterCondition.counter)
      if (!characterCondition.condition.hasCounter) {
        counter.disable()
      }

      conditions.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(characterCondition.id),
          'condition': new UntypedFormControl(characterCondition.condition),
          'value': new UntypedFormControl(characterCondition.value),
          'counter': counter
        })
      )
    }
  }

  onAddCondition() {
    (<UntypedFormArray>this.editCharacterForm.get('conditions')).push(
      new UntypedFormGroup({
        'condition': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
        'counter': new UntypedFormControl({value: null, disabled: true})
      })
    )
  }

  onDeleteCondition(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('conditions')).removeAt(index)
  }

  get conditions() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('conditions')).controls
  }
}
