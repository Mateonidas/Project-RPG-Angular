import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Character} from "../../model/character.model";
import {SkirmishCharacter} from "../../model/skirmish-character.model";
import {CharacterSkill, SkillsList} from "../../model/skill/skill.model";
import {Talent} from "../../model/talent.model";
import {Weapon, WeaponsList} from "../../model/weapon/weapon.model";
import {Armor} from "../../model/armor.model";
import {BodyLocalizationList} from "../../model/body-localization.model";
import {CharacterCharacteristics} from "../../model/characteristic/characterCharacteristic.model";

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

        new CharacterCharacteristics(
          4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
        ),
        [
          new CharacterSkill(SkillsList.meleeBasic, 40)
        ],
        [
          new Talent('Ambidextrous', 'Oburęczność', 1, '2')
        ],
        [
          WeaponsList.handWeapon
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

        new CharacterCharacteristics(
          4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
        ),
        [
          new CharacterSkill(SkillsList.meleeBasic, 50)
        ],
        [
          new Talent('Ambidextrous', 'Oburęczność', 1, '2')
        ],
        [
          WeaponsList.handWeapon,
          WeaponsList.crossbow
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

  getFightTrait(weapon: Weapon, character: SkirmishCharacter) {
    let skill = character.skills.find(characterSkill => characterSkill.base == weapon.weaponGroup.usedSkill);
    if (skill === undefined) {
      return character.characteristics.getCharacteristic(weapon.attackType.usedCharacteristic);
    }

    return skill;
  }
}
