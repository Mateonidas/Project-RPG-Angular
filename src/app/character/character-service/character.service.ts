import {Injectable} from '@angular/core';
import {Character} from "../../model/character.model";
import {Subject} from "rxjs";
import {Characteristic} from "../../model/characteristic.model";
import {Skill, SkillsList} from "../../model/skill.model";
import {Talent} from "../../model/talent.model";
import {Weapon} from "../../model/weapon.model";
import {Armor} from "../../model/armor.model";

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
        new Talent('Ambidextrous' ,'Oburęczność', 1,'2')
      ],
      [
        new Weapon('Hand Weapon', 'Broń ręczna', 'melee', 'Podstawowa', 'Średnia', 4, true, [], [])
      ],
      [
        new Armor('Skórzana kurta', 'Miękka Skóra', '-', ['ramiona', 'korpus'], 1, [], []),
        new Armor('Skórzane nogawice', 'Miękka Skóra', '-', ['nogi'], 1, [], [])
      ]
    )
  ];

  getCharacters() {
    return this.characters.slice();
  }

  getCharacter(id: number) {
    return this.characters[id];
  }

  addNewCharacter(character: Character) {
    this.characters.push(character);
    this.charactersChanged.next(this.characters.slice());
  }
}
