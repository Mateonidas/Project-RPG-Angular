import {FormArray} from "@angular/forms";

export class CharacterFormArraysWrapper {
  notes = new FormArray([]);
  conditions = new FormArray([]);
  skills = new FormArray([]);
  talents = new FormArray([]);
  weapons = new FormArray([]);
  armors = new FormArray([]);
}
