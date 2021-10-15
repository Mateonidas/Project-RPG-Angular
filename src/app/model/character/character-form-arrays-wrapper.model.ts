import {FormArray} from "@angular/forms";

export class CharacterFormArraysWrapper {
  skills = new FormArray([]);
  talents = new FormArray([]);
  weapons = new FormArray([]);
  armors = new FormArray([]);
}
