import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Model} from "../../model/model";
import {Skill} from "../../model/skill/skill.model";
import {SkillService} from "../../shared/services/skill-service/skill.service";
import {CharacterSkill} from "../../model/skill/character-skill.model";

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css']
})
export class SkillsEditComponent implements OnInit{
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  skillsList: Skill[] = []

  constructor(public skillService: SkillService) {
  }

  ngOnInit(): void {
    this.skillsList = this.skillService.skillList
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  static prepareSkillsList(skills: UntypedFormArray, skillsList: CharacterSkill[]) {
    for (let characterSkill of skillsList) {
      skills.push(
        new UntypedFormGroup({
          'id': new UntypedFormControl(characterSkill.id),
          'skill': new UntypedFormControl(characterSkill.skill),
          'value': new UntypedFormControl(characterSkill.value),
        })
      )
    }
  }

  onAddSkill() {
    (<UntypedFormArray>this.editCharacterForm.get('skills')).push(
      new UntypedFormGroup({
        'skill': new UntypedFormControl(null),
        'value': new UntypedFormControl(null),
      })
    )
  }

  onDeleteSkill(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('skills')).removeAt(index)
  }

  get skills() {
    return (<UntypedFormArray>this.editCharacterForm.get('skills')).controls
  }
}
