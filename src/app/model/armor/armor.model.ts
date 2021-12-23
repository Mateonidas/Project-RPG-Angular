import {Model} from "../model";
import {BodyLocalization, BodyLocalizationList} from "../body-localization/body-localization.model";
import {ListModel} from "../list-model";

export class Armor extends Model {
  public category: string;
  public penalties: string[];
  public localization: BodyLocalization[];
  public armorPoints: number;
  public qualities: string[];

  constructor(name?: string, nameTranslation?: string, category?: string, penalties?: string[], localization?: BodyLocalization[], armorPoints?: number, qualities?: string[]) {
    super(name, nameTranslation);
    this.category = <string>category;
    this.penalties = <string[]>penalties;
    this.localization = <BodyLocalization[]>localization;
    this.armorPoints = <number>armorPoints;
    this.qualities = <string[]>qualities;
  }

  static fromJSON(object: Object): Armor {
    let armor = Object.assign(new Armor(), object);
    armor.localization = BodyLocalization.arrayFromJSON(armor['localization']);
    return armor;
  }

  static arrayFromJSON(objectsArray: Object[]): Armor[] {
    let armors = [];
    for (let object of objectsArray) {
      let armor = Armor.fromJSON(object);
      armors.push(armor);
    }
    return armors;
  }
}

export class ArmorsList extends ListModel {
  public static list = [
    new Armor('LEATHER_JACK', 'Skórzana kurta', 'Miękka Skóra', [], [BodyLocalizationList.leftArm, BodyLocalizationList.rightArm, BodyLocalizationList.body], 1, []),
    new Armor('LEATHER_LEGGINGS', 'Skórzane nogawice', 'Miękka Skóra', [], [BodyLocalizationList.leftLeg, BodyLocalizationList.rightLeg], 1, [])
  ]

  static get leatherJack() {
    return <Armor>ArmorsList.getListItemByName('LEATHER_JACK');
  }

  static get leatherLeggings() {
    return <Armor>ArmorsList.getListItemByName('LEATHER_LEGGINGS');
  }
}
