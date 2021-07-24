import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Character} from "../../model/character.model";
import {SkirmishCharacter} from "../../model/skirmish-character.model";

@Injectable({
  providedIn: 'root'
})
export class SkirmishService {

  skirmishCharactersChanged = new Subject<SkirmishCharacter[]>();
  skirmishCharacters: SkirmishCharacter[] = [];

  getSkirmishCharacters() {
    return this.skirmishCharacters.slice();
  }

  getSkirmishCharacter(id: number) {
    return this.skirmishCharacters[id];
  }

  addNewSkirmishCharacter(character: Character) {
    this.skirmishCharacters.push(new SkirmishCharacter(character));
    this.skirmishCharactersChanged.next(this.skirmishCharacters.slice())
  }

  updateSkirmishCharacter(id: number, skirmishCharacter: SkirmishCharacter) {
    this.skirmishCharacters[id] = skirmishCharacter;
    this.skirmishCharactersChanged.next(this.skirmishCharacters.slice());
  }
}
