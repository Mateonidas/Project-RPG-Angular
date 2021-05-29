export class Armor {
  public name: string;
  public category: string;
  public penalty: string;
  public localization: string[];
  public armorPoints: number;
  public advantages: string[];
  public disadvantages: string[];


  constructor(name: string, category: string, penalty: string, localization: string[], armorPoints: number, advantages: string[], disadvantages: string[]) {
    this.name = name;
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
    new Armor('Skórzana kurta', 'Miękka Skóra', '-', ['ramiona', 'korpus'], 1, [], []),
    new Armor('Skórzane nogawice', 'Miękka Skóra', '-', ['nogi'], 1, [], [])
  ]
}
