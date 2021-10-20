import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Character} from "../../model/character/character.model";
import {SkirmishCharacter} from "../../model/skirmish/skirmish-character.model";
import {CharacterSkill, SkillsList} from "../../model/skill/skill.model";
import {Talent} from "../../model/talent/talent.model";
import {WeaponsList} from "../../model/weapon/weapon.model";
import {ArmorsList} from "../../model/armor/armor.model";
import {CharacterCharacteristics} from "../../model/characteristic/character-characteristic.model";

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
          new CharacterSkill(SkillsList.meleeFencing, 40)
        ],
        [
          new Talent('Ambidextrous', 'Oburęczność', 1, '2')
        ],
        true,
        [
          WeaponsList.rapier
        ],
        [
          ArmorsList.leatherJack,
          ArmorsList.leatherLeggings,
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
        true,
        [
          WeaponsList.handWeapon,
          WeaponsList.crossbow
        ],
        [
          ArmorsList.leatherJack,
          ArmorsList.leatherLeggings,
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
