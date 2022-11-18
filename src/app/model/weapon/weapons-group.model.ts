import {Weapon} from "./weapon.model";

export class WeaponsGroup {
  public name: string;
  public weapons: Weapon[];

  constructor(group: string, weapon: Weapon[]) {
    this.name = group;
    this.weapons = weapon;
  }
}
