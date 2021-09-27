import {AttackType} from "./attack-type.model";
import {AttacksCategoryList} from "./attack-category.model";

export class AttacksTypeList {
  public static attacksTypeList = [
    new AttackType('BasicAttack', 'Zwykły atak', AttacksCategoryList.rangedAttack),
    new AttackType('BasicAttack', 'Zwykły atak', AttacksCategoryList.meleeAttack),
  ]
}
