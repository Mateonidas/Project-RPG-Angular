import {Injectable} from '@angular/core';
import {Character} from "../../model/character.model";
import {Subject} from "rxjs";
import {Characteristic} from "../../model/characteristic.model";
import {Skill, SkillsList} from "../../model/skill.model";
import {Talent} from "../../model/talent.model";
import {Weapon} from "../../model/weapon.model";
import {Armor} from "../../model/armor.model";
import {AttacksCategoryList} from "../../model/attack/attacks-category-list.model";
import {BodyLocalizationList} from "../../model/body-localization.model";

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
        new Skill('MeleeBasic', 'Walka Wręcz (Podstawowa)', 40)
      ],
      [
        new Talent('Ambidextrous' ,'Oburęczność', 1,'2')
      ],
      [
        new Weapon('Hand Weapon', 'Broń ręczna', AttacksCategoryList.getAttacksCategoryByName('MeleeAttack'), 'Podstawowa', 'Średnia', 4, true, [], [])
      ],
      [
        new Armor('Leather Jack', 'Skórzana kurta', 'Miękka Skóra', '-', [BodyLocalizationList.arms, BodyLocalizationList.body], 1, [], []),
        new Armor('Leather Leggings', 'Skórzane nogawice', 'Miękka Skóra', '-', [BodyLocalizationList.legs], 1, [], [])
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

  updateCharacter(index: number, character: Character) {
    this.characters[index] = character;
    this.charactersChanged.next(this.characters.slice());
  }
}
