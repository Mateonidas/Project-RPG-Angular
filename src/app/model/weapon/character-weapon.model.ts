import {Weapon} from "./weapon.model";

export class CharacterWeapon {
  public weapon: Weapon;
  public value: number;


  constructor(weapon?: Weapon, value?: number) {
    this.weapon = <Weapon>weapon;
    this.value = <number>value;
  }

  static fromJSON(object: Object): CharacterWeapon {
    return Object.assign(new CharacterWeapon(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterWeapon[] {
    let weapons = [];
    for (let object of objectsArray) {
      let weapon = CharacterWeapon.fromJSON(object);
      weapons.push(weapon);
    }
    return weapons;
  }
}
