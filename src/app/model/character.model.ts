import {Characteristics} from "./characteristic.model";
import {Skill} from "./skill.model";
import {Talent} from "./talent.model";
import {Weapon} from "./weapon.model";
import {Armor} from "./armor.model";

export class Character {
  public name!: string;
  public description!: string;
  public characteristics!: Characteristics;
  public skills!: Skill[];
  public talents!: Talent[];
  public weapons!: Weapon[];
  public armor!: Armor[];


  constructor(name: string, description: string, characteristics: Characteristics, skills: Skill[], talents: Talent[], weapons: Weapon[], armor: Armor[]) {
    this.name = name;
    this.description = description;
    this.characteristics = characteristics;
    this.skills = skills;
    this.talents = talents;
    this.weapons = weapons;
    this.armor = armor;
  }
}
