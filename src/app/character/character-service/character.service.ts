import {Injectable} from '@angular/core';
import {Character} from "../../model/character/character.model";
import {Subject} from "rxjs";
import {CharacterSkill, SkillsList} from "../../model/skill/skill.model";
import {Talent} from "../../model/talent/talent.model";
import {WeaponsList} from "../../model/weapon/weapon.model";
import {Armor} from "../../model/armor/armor.model";
import {BodyLocalizationList} from "../../model/armor/body-localization.model";
import {CharacterCharacteristics} from "../../model/characteristic/character-characteristic.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  charactersChanged = new Subject<Character[]>();
  characters: Character[] = [
    new Character(
      'Markus',
      'Mieszkaniec Ubersreiku.',

      new CharacterCharacteristics(
        4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
      ),
      [
        new CharacterSkill(SkillsList.meleeBasic, 40)
      ],
      [
        new Talent('Ambidextrous', 'Oburęczność', 1, '2')
      ],
      true,
      [
        WeaponsList.handWeapon
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
