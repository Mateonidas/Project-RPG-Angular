import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Model} from "../../model/model";
import {Talent} from "../../model/talent/talent.model";
import {TalentService} from "../../shared/services/talent-service/talent.service";
import {CharacterTalent} from "../../model/talent/character-talent.model";

@Component({
  selector: 'app-talents-edit',
  templateUrl: './talents-edit.component.html',
  styleUrls: ['./talents-edit.component.css']
})
export class TalentsEditComponent implements OnInit{
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  talentsList: Talent[] = []

  constructor(public talentService: TalentService) {
  }

  ngOnInit(): void {
    this.talentsList = this.talentService.talentList
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  static prepareTalentsList(talents: UntypedFormArray, talentsList: CharacterTalent[]) {
    for (let talent of talentsList) {
      talents.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(talent.id),
          'talent': new UntypedFormControl(talent.talent),
          'value': new UntypedFormControl(talent.value),
        })
      )
    }
  }

  onAddTalent() {
    (<UntypedFormArray>this.editCharacterForm.get('talents')).push(
      new UntypedFormGroup({
        'talent': new UntypedFormControl(null),
        'value': new UntypedFormControl(1),
      })
    )
  }

  onDeleteTalent(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('talents')).removeAt(index)
  }

  get talents() {
    return (<UntypedFormArray>this.editCharacterForm.get('talents')).controls
  }
}
