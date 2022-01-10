import {Model} from "../model";
import {AttacksCategoryList} from "../attack/attack-category.model";
import {WeaponGroupsList} from "./weapon-type.model";
import {ListModel} from "../list-model";
import {WeaponTrait, WeaponTraitsList} from "./weaponTraits/weapon.advantages.model";

export class Weapon extends Model {
  public weaponType: string;
  public weaponGroupType: string;
  public weaponRange: string;
  public isUsingStrength: boolean;
  public damage: number;
  public qualities: string[];
  // public advantages: WeaponTrait[];
  // public disadvantages: string[];

  constructor(name?: string, nameTranslation?: string, weaponType?: string, weaponGroupType?: string, range?: string, isUsingStrength?: boolean, damage?: number, qualities?: string[]) {
    super(name, nameTranslation)
    this.weaponType = <string>weaponType;
    this.weaponGroupType = <string>weaponGroupType;
    this.weaponRange = <string>range;
    this.damage = <number>damage;
    this.isUsingStrength = <boolean>isUsingStrength;
    this.qualities = <string[]>qualities;
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

export class WeaponsList extends ListModel {
  public static list = [
    new Weapon('HandWeapon', 'Broń ręczna', 'Broń biała', 'Podstawowa', 'Średnia', true, 4, []),
    new Weapon('Rapier', 'Rapier', 'Broń biała', 'Szermiercza', 'Długa',true, 4,  ['Szubka']),
    new Weapon('Crossbow', 'Kusza', 'Broń zasięgowa', 'Kusze', '60',false, 9, [])
  ]

  static get handWeapon() {
    return <Weapon>this.getListItemByName('HandWeapon');
  }

  static get rapier() {
    return <Weapon>this.getListItemByName('Rapier');
  }

  static get crossbow() {
    return <Weapon>this.getListItemByName('Crossbow');
  }
}
