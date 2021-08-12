import {Model} from "./model";
import {AttackCategory} from "./attack/attack-category.model";
import {AttacksCategoryList} from "./attack/attacks-category-list.model";

export class Weapon extends Model{
  public type: AttackCategory;
  public category: string
  public range: string;
  public damage: number;
  public isUsingStrength: boolean;
  public advantages: string[];
  public disadvantages: string[];

  constructor(name: string, nameTranslation: string, type: AttackCategory, category: string, range: string, damage: number, isUsingStrength: boolean, advantages: string[], disadvantages: string[]) {
    super(name, nameTranslation)
    this.type = type;
    this.category = category;
    this.range = range;
    this.damage = damage;
    this.isUsingStrength = isUsingStrength;
    this.advantages = advantages;
    this.disadvantages = disadvantages;
  }
}

export class WeaponsList {
  public weaponsList = [
    new Weapon('Hand Weapon', 'Broń ręczna', AttacksCategoryList.getAttacksCategoryByName('MeleeAttack'), 'Podstawowa', 'Średnia', 4, true, [], []),
    new Weapon('Crossbow', 'Kusza', AttacksCategoryList.getAttacksCategoryByName('RangedAttack'), 'Kusze', '60', 9, false, [], [])
  ]
}
