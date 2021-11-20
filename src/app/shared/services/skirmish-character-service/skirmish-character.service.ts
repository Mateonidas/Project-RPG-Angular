import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Character} from "../../../model/character/character.model";
import {SkirmishCharacter} from "../../../model/skirmish/skirmish-character.model";
import {CharacterSkill, SkillsList} from "../../../model/skill/skill.model";
import {Talent} from "../../../model/talent/talent.model";
import {WeaponsList} from "../../../model/weapon/weapon.model";
import {ArmorsList} from "../../../model/armor/armor.model";
import {CharacterCharacteristics} from "../../../model/characteristic/character-characteristic.model";

@Injectable({
  providedIn: 'root'
})
export class SkirmishCharacterService {

  skirmishCharactersChanged = new Subject<SkirmishCharacter[]>();
  skirmishCharacters: SkirmishCharacter[];

  constructor() {
    if (JSON.parse(<string>localStorage.getItem('skirmishCharacters')) == null) {
      this.skirmishCharacters = this.prepareTestSkirmishCharacters();
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
    return this.skirmishCharacters[id];
  }

  addNewSkirmishCharacter(character: Character) {
    let skirmishCharacter = new SkirmishCharacter(character, this.skirmishCharacters.length);
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

  prepareTestSkirmishCharacters() {
    return [
      new SkirmishCharacter(
        new Character(
          'Markus',
          'Mieszkaniec Ubersreiku.',

          new CharacterCharacteristics(
            4, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 15
          ),
          [
            new CharacterSkill(SkillsList.meleeFencing, 50)
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
        ),
        0
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
        ),
        1
      )
    ]
  }
}
