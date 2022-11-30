import {UntypedFormArray} from "@angular/forms";

export class CharacterFormArraysWrapper {
  notes = new UntypedFormArray([]);
  characteristics = new UntypedFormArray([]);
  conditions = new UntypedFormArray([]);
  injuries = new UntypedFormArray([]);
  criticalWounds = new UntypedFormArray([]);
  skills = new UntypedFormArray([]);
  talents = new UntypedFormArray([]);
  traits = new UntypedFormArray([]);
  weapons = new UntypedFormArray([]);
  armors = new UntypedFormArray([]);
  spells = new UntypedFormArray([]);
}
