import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Model} from "../../model/model";
import {InjuryService} from "../../shared/services/injuries-service/injury.service";
import {CharacterBodyLocalization} from "../../model/body-localization/character-body-localization.model";

@Component({
  selector: 'app-injury-edit',
  templateUrl: './injury-edit.component.html',
  styleUrls: ['./injury-edit.component.css']
})
export class InjuryEditComponent implements OnInit {
  @Input() editCharacterForm!: FormGroup
  @Input() characterBodyLocalizations!: CharacterBodyLocalization[]
  text = TextResourceService

  injuryList: Model[] = []

  constructor(public injuryService: InjuryService) {
  }

  ngOnInit(): void {
    this.injuryList = this.injuryService.injuriesList
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  static prepareInjuriesList(injuries: UntypedFormArray, bodyLocalizations: CharacterBodyLocalization[]) {
    for (let bodyLocalization of bodyLocalizations) {
      for (let injury of bodyLocalization.injuries) {
        injuries.push(
          new UntypedFormGroup({
            'id': new UntypedFormControl(injury.id),
            'injury': new UntypedFormControl(injury.injury),
            'bodyLocalization': new UntypedFormControl(bodyLocalization.bodyLocalization),
            'value': new UntypedFormControl(injury.value)
          })
        )
      }
    }
  }

  onAddInjury() {
    (<UntypedFormArray>this.editCharacterForm.get('injuries')).push(
      new UntypedFormGroup({
        'injury': new UntypedFormControl(null),
        'bodyLocalization': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
      })
    )
  }

  onDeleteInjury(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('injuries')).removeAt(index)
  }

  get injuries() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('injuries')).controls
  }
}
