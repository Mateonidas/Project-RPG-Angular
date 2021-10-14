import {Model} from "./model";
import {BodyLocalization, BodyLocalizationList} from "./body-localization.model";
import {ListModel} from "./list-model";

export class Armor extends Model{
  public category: string;
  public penalty: string;
  public localization: BodyLocalization[];
  public armorPoints: number;
  public advantages: string[];
  public disadvantages: string[];


  constructor(name: string, nameTranslation: string, category: string, penalty: string, localization: BodyLocalization[], armorPoints: number, advantages: string[], disadvantages: string[]) {
    super(name, nameTranslation);
    this.category = category;
    this.penalty = penalty;
    this.localization = localization;
    this.armorPoints = armorPoints;
    this.advantages = advantages;
    this.disadvantages = disadvantages;
  }
}

export class ArmorsList extends ListModel{
  public static list = [
    new Armor('Leather Jack', 'Skórzana kurta', 'Miękka Skóra', '-', [BodyLocalizationList.arms, BodyLocalizationList.body], 1, [], []),
    new Armor('Leather Leggings', 'Skórzane nogawice', 'Miękka Skóra', '-', [BodyLocalizationList.legs], 1, [], [])
  ]
}
