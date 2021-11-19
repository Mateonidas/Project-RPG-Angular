import {Model} from "../model";
import {Characteristic, Characteristics} from "../characteristic/characteristic.model";
import {ListModel} from "../list-model";

export class AttackCategory extends Model {
  public usedCharacteristic: Characteristic;

  constructor(name?: string, nameTranslation?: string, usedCharacteristic?: Characteristic) {
    super(name, nameTranslation);
    this.usedCharacteristic = <Characteristic>usedCharacteristic;
  }

  static fromJSON(object: Object): AttackCategory {
    let attackCategory = Object.assign(new AttackCategory(), object);
    attackCategory.usedCharacteristic = Characteristic.fromJSON(attackCategory['usedCharacteristic']);
    return attackCategory;
  }
}

export class AttacksCategoryList extends ListModel{
  public static list = [
    new AttackCategory('RangedAttack', 'Atak dystansowy', Characteristics.ballisticSkill),
    new AttackCategory('MeleeAttack', 'Atak w zwarciu', Characteristics.weaponSkill),
  ]

  static get rangedAttack() {
    return <AttackCategory>this.getListItemByName('RangedAttack');
  }

  static get meleeAttack() {
    return <AttackCategory>this.getListItemByName('MeleeAttack');
  }
}
