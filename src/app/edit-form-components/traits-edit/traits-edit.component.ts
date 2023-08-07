import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Model} from "../../model/model";
import {Trait} from "../../model/trait/trait.model";
import {TraitService} from "../../shared/services/trait-service/trait.service";
import {CharacterTrait} from "../../model/trait/character-trait.model";

@Component({
  selector: 'app-traits-edit',
  templateUrl: './traits-edit.component.html',
  styleUrls: ['./traits-edit.component.css']
})
export class TraitsEditComponent implements OnInit{
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  traitsList: Trait[] = []

  constructor(public traitService: TraitService) {
  }

  ngOnInit(): void {
    this.traitsList = this.traitService.traitList
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  static prepareTraitsList(traits: UntypedFormArray, traitsList: CharacterTrait[]) {
    for (let trait of traitsList) {

      let value = new UntypedFormControl(trait.value)
      if (!trait.trait.hasValue) {
        value.disable()
      }

      traits.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(trait.id),
          'trait': new UntypedFormControl(trait.trait),
          'value': value,
        })
      )
    }
  }

  checkIfTraitHasValue(traitControl: AbstractControl) {
    if (traitControl.value.trait != null && !traitControl.value.trait.hasValue) {
      (<UntypedFormGroup>traitControl.get('value')).disable()
    } else {
      (<UntypedFormGroup>traitControl.get('value')).enable()
    }
  }

  onAddTrait() {
    (<UntypedFormArray>this.editCharacterForm.get('traits')).push(
      new UntypedFormGroup({
        'trait': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
      })
    )
  }

  onDeleteTrait(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('traits')).removeAt(index)
  }

  get traits() {
    return (<UntypedFormArray>this.editCharacterForm.get('traits')).controls
  }
}
