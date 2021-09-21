import {Model} from "../model";
import {Characteristic, Characteristics} from "../characteristic.model";

export class AttackCategory extends Model {
  public usedCharacteristic: Characteristic;

  constructor(name: string, nameTranslation: string, usedCharacteristic: Characteristic) {
    super(name, nameTranslation);
    this.usedCharacteristic = usedCharacteristic;
  }
}

export class AttacksCategoryList {
  public static attacksCategoryList = [
    new AttackCategory('RangedAttack', 'Atak dystansowy', Characteristics.ballisticSkill),
    new AttackCategory('MeleeAttack', 'Atak w zwarciu', Characteristics.weaponSkill),
  ]

  static getAttacksCategoryByName(name: string): AttackCategory {
    return <AttackCategory>this.attacksCategoryList.find(x => x.name == name);
  }

  static get rangedAttack() {
    return this.getAttacksCategoryByName('RangedAttack');
  }

  static get meleeAttack() {
    return this.getAttacksCategoryByName('MeleeAttack');
  }
}
