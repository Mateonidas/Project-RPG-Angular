import {AttackCategory} from "./attack-category.model";

export class AttacksCategoryList {
  public static attacksCategoryList = [
    new AttackCategory('RangedAttack', 'Atak dystansowy'),
    new AttackCategory('MeleeAttack', 'Atak w zwarciu'),
  ]

  static getAttacksCategoryByName(name: string): AttackCategory {
    return <AttackCategory>this.attacksCategoryList.find(x => x.name == name);
  }
}
