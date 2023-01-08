import {Model} from "../model";
import {WeaponQuality} from "./weapon-quality.model";

export class Weapon extends Model {
  public weaponType: Model;
  public weaponGroup: Model;
  public weaponReach: Model;
  public weaponRange: number;
  public isUsingStrength: boolean;
  public isUsingStrengthInRange: boolean;
  public damage: number;
  public weaponQualities: WeaponQuality[];

  constructor(name?: string, nameTranslation?: string, weaponType?: Model, weaponGroup?: Model, reach?: Model, range?: number, isUsingStrength?: boolean, isUsingStrengthInRange?: boolean, damage?: number, qualities?: WeaponQuality[]) {
    super(name, nameTranslation)
    this.weaponType = <Model>weaponType;
    this.weaponGroup = <Model>weaponGroup;
    this.weaponReach = <Model>reach;
    this.weaponRange = <number>range;
    this.damage = <number>damage;
    this.isUsingStrength = <boolean>isUsingStrength;
    this.isUsingStrengthInRange = <boolean>isUsingStrengthInRange;
    this.weaponQualities = <WeaponQuality[]>qualities;
  }

  static fromJSON(object: Object): Weapon {
    let weapon = Object.assign(new Weapon(), object);
    weapon.weaponType = Model.fromJSON(weapon['weaponType']);
    weapon.weaponGroup = Model.fromJSON(weapon['weaponGroup']);
    weapon.weaponReach = Model.fromJSON(weapon['weaponReach']);
    weapon.weaponQualities = WeaponQuality.arrayFromJSON(weapon['weaponQualities']);
    return weapon;
  }

  static arrayFromJSON(objectsArray: Object[]): Weapon[] {
    let weapons = [];
    for (let object of objectsArray) {
      let weapon = Weapon.fromJSON(object);
      weapons.push(weapon);
    }
    return weapons;
  }
}
