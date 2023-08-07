import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, UntypedFormArray, UntypedFormControl} from "@angular/forms";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";
import {Model} from "../../model/model";
import {SpellGroup} from "../../model/spell/spell-group.model";
import {SpellService} from "../../shared/services/spell-service/spell.service";
import {Spell} from "../../model/spell/spell.model";

@Component({
  selector: 'app-spells-edit',
  templateUrl: './spells-edit.component.html',
  styleUrls: ['./spells-edit.component.css']
})
export class SpellsEditComponent implements OnInit{
  @Input() editCharacterForm!: FormGroup
  text = TextResourceService

  spellGroups: SpellGroup[] = []

  constructor(public spellService: SpellService) {
  }

  ngOnInit(): void {
   this.spellGroups = this.spellService.spellGroups
  }

  static prepareSpellsList(spells: UntypedFormArray, spellsList: Spell[]) {
    for (let spell of spellsList) {
      spells.push(
        new UntypedFormControl(spell)
      )
    }
  }

  onDeleteSpell(index: number) {
    (<UntypedFormArray>this.editCharacterForm.get('spells')).removeAt(index)
  }

  onAddSpell() {
    (<UntypedFormArray>this.editCharacterForm.get('spells')).push(
      new UntypedFormControl(null),
    )
  }

  compareModels(c1: Model, c2: Model): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2
  }

  get spells() {
    return <UntypedFormControl[]>(<UntypedFormArray>this.editCharacterForm.get('spells')).controls
  }
}
