import {Model} from "./model";

export class Armor extends Model{
  public category: string;
  public penalty: string;
  public localization: string[];
  public armorPoints: number;
  public advantages: string[];
  public disadvantages: string[];


  constructor(name: string, nameTranslation: string, category: string, penalty: string, localization: string[], armorPoints: number, advantages: string[], disadvantages: string[]) {
    super(name, nameTranslation);
    this.category = category;
    this.penalty = penalty;
    this.localization = localization;
    this.armorPoints = armorPoints;
    this.advantages = advantages;
    this.disadvantages = disadvantages;
  }
}

export class ArmorsList {
  public armorList = [
    new Armor('Leather Jack', 'Skórzana kurta', 'Miękka Skóra', '-', ['ramiona', 'korpus'], 1, [], []),
    new Armor('Leather Leggings', 'Skórzane nogawice', 'Miękka Skóra', '-', ['nogi'], 1, [], [])
  ]
}
