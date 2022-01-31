import {CharacterTalent} from "../talent/character-talent.model";
import {Weapon} from "../weapon/weapon.model";
import {Armor} from "../armor/armor.model";
import {CharacterCharacteristics} from "../characteristic/character-characteristic.model";
import {CharacterSkill} from "../skill/character-skill.model";

export class Character {
  name!: string;
  description!: string;
  characteristics!: CharacterCharacteristics;
  skills!: CharacterSkill[];
  talents!: CharacterTalent[];
  isRightHanded!: boolean;
  weapons!: Weapon[];
  armors!: Armor[];

  constructor(name?: string, description?: string, characteristics?: CharacterCharacteristics, skills?: CharacterSkill[], talents?: CharacterTalent[], rightHanded?: boolean, weapons?: Weapon[], armor?: Armor[]) {
    this.name = <string>name;
    this.description = <string>description;
    this.characteristics = <CharacterCharacteristics>characteristics;
    this.skills = <CharacterSkill[]>skills;
    this.talents = <CharacterTalent[]>talents;
    this.isRightHanded = <boolean>rightHanded;
    this.weapons = <Weapon[]>weapons;
    this.armors = <Armor[]>armor;
  }

  static fromJSON(object: Object): Character {
    let character = Object.assign(new Character(), object);
    character.characteristics = CharacterCharacteristics.fromJSON(character['characteristics']);
    character.skills = CharacterSkill.arrayFromJSON(character["skills"]);
    character.talents = CharacterTalent.arrayFromJSON(character["talents"]);
    character.weapons = Weapon.arrayFromJSON(character['weapons']);
    character.armors = Armor.arrayFromJSON(character['armors']);
    return character;
  }

  static arrayFromJSON(objectsArray: Object[]): Character[] {
    let characters = [];
    for(let object of objectsArray) {
      let character = Character.fromJSON(object);
      characters.push(character);
    }
    return characters;
  }
}
