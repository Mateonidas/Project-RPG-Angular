import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormArray, UntypedFormControl} from "@angular/forms";
import {TextResourceService} from "../../../../core/services/text-resource-service/text-resource.service";
import {Model} from "../../../../core/model/model";
import {SpellGroup} from "../../../../core/model/spell/spell-group.model";
import {SpellService} from "../../../../core/services/spell-service/spell.service";
import {Spell} from "../../../../core/model/spell/spell.model";

@Component({
  selector: 'app-spells-edit',
  templateUrl: './spells-edit.component.html',
  styleUrls: ['./spells-edit.component.css']
})
export class SpellsEditComponent implements OnInit {
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  spellGroups: SpellGroup[] = []

  constructor(public spellService: SpellService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.spellGroups = this.spellService.spellGroups
  }

  static prepareSpellsList(spells: UntypedFormArray, spellsList: Spell[]) {
    const formBuilder = new FormBuilder();
    for (let spell of spellsList) {
      spells.push(
        formBuilder.control(spell)
      )
    }
  }

  onDeleteSpell(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('spells')).removeAt(index)
  }

  onAddSpell() {
    (<UntypedFormArray>this.editCharacterForm.get('spells')).push(
      this.formBuilder.control(null),
    )
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  get spells() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('spells')).controls
  }
}
