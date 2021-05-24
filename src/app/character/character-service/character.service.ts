import {Injectable} from '@angular/core';
import {Character} from "../../model/character.model";
import {Subject} from "rxjs";
import {Characteristic} from "../../model/characteristic.model";
import {Skill, SkillsList} from "../../model/skill.model";
import {Talent} from "../../model/talent.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactersChanged = new Subject<Character[]>();
  characters: Character[] = [
    new Character(
      'Markus',
      'Mieszkaniec Ubersreiku.',

      new Characteristic(
        4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
      ),
      [
        new Skill(SkillsList.MeleeBasic, 40)
      ],
      [
        new Talent('Oburęczność', 2)
      ],
      [],
      []
    )
  ];

  getCharacters() {
    return this.characters.slice();
  }

  getCharacter(id: number) {
    return this.characters[id];
  }
}
