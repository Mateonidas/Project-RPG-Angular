import {Model} from "../model";
import {BodyLocalization, BodyLocalizationList} from "../body-localization/body-localization.model";
import {ListModel} from "../list-model";

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
    new Armor('leatherJack', 'Skórzana kurta', 'Miękka Skóra', '-', [BodyLocalizationList.leftArm, BodyLocalizationList.rightArm, BodyLocalizationList.body], 1, [], []),
    new Armor('leatherLeggings', 'Skórzane nogawice', 'Miękka Skóra', '-', [BodyLocalizationList.leftLeg, BodyLocalizationList.rightLeg], 1, [], [])
  ]

  static get leatherJack() {
    return <Armor>ArmorsList.getListItemByName('leatherJack');
  }

  static get leatherLeggings() {
    return <Armor>ArmorsList.getListItemByName('leatherLeggings');
  }
}
