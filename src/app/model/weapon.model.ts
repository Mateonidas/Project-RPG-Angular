export class Weapon {
  public name: string;
  public type: string;
  public category: string
  public range: string;
  public damage: number;
  public isUsingStrength: boolean;
  public advantages: string[];
  public disadvantages: string[];


  constructor(name: string, type: string, category: string, range: string, damage: number, isUsingStrength: boolean, advantages: string[], disadvantages: string[]) {
    this.name = name;
    this.type = type;
    this.category = category;
    this.range = range;
    this.damage = damage;
    this.isUsingStrength = isUsingStrength;
    this.advantages = advantages;
    this.disadvantages = disadvantages;
  }
}
