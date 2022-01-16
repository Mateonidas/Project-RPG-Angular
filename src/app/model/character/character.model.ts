import {Talent} from "../talent/talent.model";
import {Weapon} from "../weapon/weapon.model";
import {Armor} from "../armor/armor.model";
import {CharacterCharacteristics} from "../characteristic/character-characteristic.model";
import {CharacterSkill} from "../skill/character-skill.model";

export class Character {
  name!: string;
  description!: string;
  characteristics!: CharacterCharacteristics;
  skills!: CharacterSkill[];
  talents!: Talent[];
  isRightHanded!: boolean;
  weapons!: Weapon[];
  armor!: Armor[];

  constructor(name?: string, description?: string, characteristics?: CharacterCharacteristics, skills?: CharacterSkill[], talents?: Talent[], rightHanded?: boolean, weapons?: Weapon[], armor?: Armor[]) {
    this.name = <string>name;
    this.description = <string>description;
    this.characteristics = <CharacterCharacteristics>characteristics;
    this.skills = <CharacterSkill[]>skills;
    this.talents = <Talent[]>talents;
    this.isRightHanded = <boolean>rightHanded;
    this.weapons = <Weapon[]>weapons;
    this.armor = <Armor[]>armor;
  }

  static fromJSON(object: Object): Character {
    let character = Object.assign(new Character(), object);
    character.characteristics = CharacterCharacteristics.fromJSON(character['characteristics']);
    character.skills = CharacterSkill.arrayFromJSON(character["skills"]);
    character.talents = Talent.arrayFromJSON(character["talents"]);
    character.weapons = Weapon.arrayFromJSON(character['weapons']);
    character.armor = Armor.arrayFromJSON(character['armor']);
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
