import {FormBuilder, UntypedFormBuilder} from "@angular/forms";

export class CharacterFormArraysWrapper {
  formBuilder = new FormBuilder();
  untypedFormBuilder = new UntypedFormBuilder();

  notes = this.formBuilder.array([]);
  characteristics = this.untypedFormBuilder.array([]);
  conditions = this.formBuilder.array([]);
  injuries = this.formBuilder.array([]);
  skills = this.formBuilder.array([]);
  talents = this.formBuilder.array([]);
  traits = this.formBuilder.array([]);
  weapons = this.formBuilder.array([]);
  armors = this.formBuilder.array([]);
  spells = this.formBuilder.array([]);
}
