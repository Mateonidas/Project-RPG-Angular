import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Character} from "../../../model/character/character.model";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";

@Injectable({
  providedIn: 'root'
})
export class SkirmishCharacterService {

  skirmishCharactersChanged = new Subject<SkirmishCharacter[]>();
  skirmishCharacters: SkirmishCharacter[];

  constructor() {
    if (JSON.parse(<string>localStorage.getItem('skirmishCharacters')) == null) {
      this.skirmishCharacters = [];
      localStorage.setItem('skirmishCharacters', JSON.stringify(this.skirmishCharacters));
    } else {
    this.skirmishCharacters = this.getSkirmishCharacters();
    }
  }

  getSkirmishCharacters() {
    this.skirmishCharacters = SkirmishCharacter.arrayFromJSON(JSON.parse(<string>localStorage.getItem('skirmishCharacters')));
    return this.skirmishCharacters.slice();
  }

  getSkirmishCharacter(id: number) {
    this.skirmishCharacters = SkirmishCharacter.arrayFromJSON(<SkirmishCharacter[]>JSON.parse(<string>localStorage.getItem('skirmishCharacters')));
    return <SkirmishCharacter>this.skirmishCharacters.find(skirmishCharacter => skirmishCharacter.id == id);
  }

  addNewSkirmishCharacter(character: Character) {
    let skirmishCharacter = new SkirmishCharacter(character, this.skirmishCharacters.length);
    let numberOfSameCharacters = this.skirmishCharacters.filter(character => character.name.includes(skirmishCharacter.name)).length;
    if(numberOfSameCharacters > 0) {
      skirmishCharacter.name = skirmishCharacter.name + ' ' + (numberOfSameCharacters + 1);
    }
    this.skirmishCharacters.push(skirmishCharacter);
    this.skirmishCharactersChanged.next(this.skirmishCharacters.slice())
    localStorage.setItem('skirmishCharacters', JSON.stringify(this.skirmishCharacters));
  }

  updateSkirmishCharacter(skirmishCharacter: SkirmishCharacter) {
    this.skirmishCharacters[this.getCharacterIndexById(skirmishCharacter.id)] = skirmishCharacter;
    this.skirmishCharactersChanged.next(this.skirmishCharacters.slice());
    localStorage.setItem('skirmishCharacters', JSON.stringify(this.skirmishCharacters));
  }

  getCharacterIndexById(id: number) {
    let characterInArray = this.skirmishCharacters.find(skirmishCharacter => skirmishCharacter.id == id);
    return this.skirmishCharacters.indexOf(<SkirmishCharacter>characterInArray);
  }

  removeSkirmishCharacter(id: number) {
    let index = this.getCharacterIndexById(id);
    if(index > -1) {
      this.skirmishCharacters.splice(index, 1);
      this.skirmishCharactersChanged.next(this.skirmishCharacters.slice());
      localStorage.setItem('skirmishCharacters', JSON.stringify(this.skirmishCharacters));
    }
  }
}
