import {Model} from "./model";

export class Weapon extends Model{
  public type: string;
  public category: string
  public range: string;
  public damage: number;
  public isUsingStrength: boolean;
  public advantages: string[];
  public disadvantages: string[];

  constructor(name: string, nameTranslation: string, type: string, category: string, range: string, damage: number, isUsingStrength: boolean, advantages: string[], disadvantages: string[]) {
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
    new Weapon('Hand Weapon', 'Broń ręczna', 'melee', 'Podstawowa', 'Średnia', 4, true, [], []),
    new Weapon('Crossbow', 'Kusza', 'range', 'Kusze', '60', 9, false, [], [])
  ]
}
