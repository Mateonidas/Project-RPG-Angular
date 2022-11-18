import {FormArray} from "@angular/forms";

export class CharacterFormArraysWrapper {
  notes = new FormArray([]);
  characteristics = new FormArray([]);
  conditions = new FormArray([]);
  injuries = new FormArray([]);
  criticalWounds = new FormArray([]);
  skills = new FormArray([]);
  talents = new FormArray([]);
  traits = new FormArray([]);
  weapons = new FormArray([]);
  armors = new FormArray([]);
}
