import {Model} from "../model";
import {Characteristic, Characteristics} from "../characteristic/characteristic.model";
import {ListModel} from "../list-model";

export class WeaponType extends Model {
  public usedCharacteristic: Characteristic;

  constructor(name?: string, nameTranslation?: string, usedCharacteristic?: Characteristic) {
    super(name, nameTranslation);
    this.usedCharacteristic = <Characteristic>usedCharacteristic;
  }

  static fromJSON(object: Object): WeaponType {
    let attackCategory = Object.assign(new WeaponType(), object);
    attackCategory.usedCharacteristic = Characteristic.fromJSON(attackCategory['usedCharacteristic']);
    return attackCategory;
  }
}

export class AttacksCategoryList extends ListModel{
  public static list = [
    new WeaponType('RANGED', 'Atak dystansowy', Characteristics.ballisticSkill),
    new WeaponType('MELEE', 'Atak w zwarciu', Characteristics.weaponSkill),
  ]

  static get rangedAttack() {
    return <WeaponType>this.getListItemByName('RANGED');
  }

  static get meleeAttack() {
    return <WeaponType>this.getListItemByName('MELEE');
  }
}
