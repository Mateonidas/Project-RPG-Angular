import {Model} from "../model";
import {ListModel} from "../list-model";
import {WeaponQuality} from "./weapon-quality.model";

export class Weapon extends Model {
  public weaponType: Model;
  public weaponGroupType: Model;
  public weaponReach: Model;
  public weaponRange: number;
  public isUsingStrength: boolean;
  public damage: number;
  public weaponQualities: WeaponQuality[];

  constructor(name?: string, nameTranslation?: string, weaponType?: Model, weaponGroupType?: Model, reach?: Model, range?: number, isUsingStrength?: boolean, damage?: number, qualities?: WeaponQuality[]) {
    super(name, nameTranslation)
    this.weaponType = <Model>weaponType;
    this.weaponGroupType = <Model>weaponGroupType;
    this.weaponReach = <Model>reach;
    this.weaponRange = <number>range;
    this.damage = <number>damage;
    this.isUsingStrength = <boolean>isUsingStrength;
    this.weaponQualities = <WeaponQuality[]>qualities;
  }

  static fromJSON(object: Object): Weapon {
    // weapon.weaponType = WeaponType.fromJSON(weapon['weaponType']);
    // weapon.weaponGroupType = WeaponGroupType.fromJSON(weapon['weaponGroupType']);
    // weapon.advantages = WeaponTrait.arrayFromJSON(weapon['advantages']);
    return Object.assign(new Weapon(), object);
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

// export class WeaponsList extends ListModel {
//   public static list = [
//     new Weapon('HandWeapon', 'Broń ręczna', 'Broń biała', 'Podstawowa', 'Średnia', 0, true, 4, []),
//     new Weapon('Rapier', 'Rapier', 'Broń biała', 'Szermiercza', 'Długa', 0, true, 4, []),
//     new Weapon('Crossbow', 'Kusza', 'Broń zasięgowa', 'Kusze', 'Zasięgowa', 60, false, 9, [])
//   ]
//
//   static get handWeapon() {
//     return <Weapon>this.getListItemByName('HandWeapon');
//   }
//
//   static get rapier() {
//     return <Weapon>this.getListItemByName('Rapier');
//   }
//
//   static get crossbow() {
//     return <Weapon>this.getListItemByName('Crossbow');
//   }
// }
