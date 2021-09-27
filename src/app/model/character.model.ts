import {CharacterSkill} from "./skill/skill.model";
import {Talent} from "./talent.model";
import {Weapon} from "./weapon/weapon.model";
import {Armor} from "./armor.model";
import {CharacterCharacteristics} from "./characteristic/characterCharacteristic.model";

export class Character {
  public name!: string;
  public description!: string;
  public characteristics!: CharacterCharacteristics;
  public skills!: CharacterSkill[];
  public talents!: Talent[];
  public weapons!: Weapon[];
  public armor!: Armor[];

  constructor(name: string, description: string, characteristics: CharacterCharacteristics, skills: CharacterSkill[], talents: Talent[], weapons: Weapon[], armor: Armor[]) {
    this.name = name;
    this.description = description;
    this.characteristics = characteristics;
    this.skills = skills;
    this.talents = talents;
    this.weapons = weapons;
    this.armor = armor;
  }
}
