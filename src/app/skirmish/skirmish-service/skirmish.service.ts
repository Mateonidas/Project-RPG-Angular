import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Character} from "../../model/character.model";
import {SkirmishCharacter} from "../../model/skirmish-character.model";
import {Characteristics} from "../../model/characteristic.model";
import {Skill} from "../../model/skill.model";
import {Talent} from "../../model/talent.model";
import {Weapon} from "../../model/weapon.model";
import {Armor} from "../../model/armor.model";
import {AttacksCategoryList} from "../../model/attack/attacks-category-list.model";
import {BodyLocalizationList} from "../../model/body-localization.model";

@Injectable({
  providedIn: 'root'
})
export class SkirmishService {

  skirmishCharactersChanged = new Subject<SkirmishCharacter[]>();
  skirmishCharacters: SkirmishCharacter[] = [
    new SkirmishCharacter(
      new Character(
        'Markus',
        'Mieszkaniec Ubersreiku.',

        new Characteristics(
          4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
        ),
        [
          new Skill('MeleeBasic', 'Walka Wręcz (Podstawowa)', 40)
        ],
        [
          new Talent('Ambidextrous', 'Oburęczność', 1, '2')
        ],
        [
          new Weapon('Hand Weapon', 'Broń ręczna', AttacksCategoryList.getAttacksCategoryByName('MeleeAttack'), 'Podstawowa', 'Średnia', 4, true, [], [])
        ],
        [
          new Armor('Leather Jack', 'Skórzana kurta', 'Miękka Skóra', '-', [BodyLocalizationList.arms, BodyLocalizationList.body], 1, [], []),
          new Armor('Leather Leggings', 'Skórzane nogawice', 'Miękka Skóra', '-', [BodyLocalizationList.legs], 1, [], [])
        ]
      )
    ),
    new SkirmishCharacter(
      new Character(
        'Zygfryd',
        'Mieszkaniec Altdorfu.',

        new Characteristics(
          4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
        ),
        [
          new Skill('MeleeBasic', 'Walka Wręcz (Podstawowa)', 50)
        ],
        [
          new Talent('Ambidextrous', 'Oburęczność', 1, '2')
        ],
        [
          new Weapon('Hand Weapon', 'Broń ręczna', AttacksCategoryList.getAttacksCategoryByName('MeleeAttack'), 'Podstawowa', 'Średnia', 4, true, [], []),
          new Weapon('Crossbow', 'Kusza', AttacksCategoryList.getAttacksCategoryByName('RangedAttack'), 'Kusze', '60', 9, false, [], [])
        ],
        [
          new Armor('Leather Jack', 'Skórzana kurta', 'Miękka Skóra', '-', [BodyLocalizationList.arms, BodyLocalizationList.body], 1, [], []),
          new Armor('Leather Leggings', 'Skórzane nogawice', 'Miękka Skóra', '-', [BodyLocalizationList.legs], 1, [], [])
        ]
      )
    )
  ];

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
