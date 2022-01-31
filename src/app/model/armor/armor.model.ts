import {Model} from "../model";
import {BodyLocalization} from "../body-localization/body-localization.model";

export class Armor extends Model {
  public armorCategory: Model;
  public bodyLocalization: BodyLocalization[];
  public armorPoints: number;
  public penalties: Model[];
  public qualities: Model[];

  constructor(name?: string, nameTranslation?: string, category?: Model, penalties?: Model[], localization?: BodyLocalization[], armorPoints?: number, qualities?: Model[]) {
    super(name, nameTranslation);
    this.armorCategory = <Model>category;
    this.penalties = <Model[]>penalties;
    this.bodyLocalization = <BodyLocalization[]>localization;
    this.armorPoints = <number>armorPoints;
    this.qualities = <Model[]>qualities;
  }

  static fromJSON(object: Object): Armor {
    let armor = Object.assign(new Armor(), object);
    armor.armorCategory = Model.fromJSON(armor['armorCategory']);
    armor.penalties = Model.arrayFromJSON(armor['penalties']);
    armor.qualities = Model.arrayFromJSON(armor['qualities']);
    armor.bodyLocalization = BodyLocalization.arrayFromJSON(armor['bodyLocalization']);
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

// export class ArmorsList extends ListModel {
//   public static list = [
//     new Armor('LEATHER_JACK', 'Skórzana kurta', 'Miękka Skóra', [], [BodyLocalizationList.leftArm, BodyLocalizationList.rightArm, BodyLocalizationList.body], 1, []),
//     new Armor('LEATHER_LEGGINGS', 'Skórzane nogawice', 'Miękka Skóra', [], [BodyLocalizationList.leftLeg, BodyLocalizationList.rightLeg], 1, [])
//   ]
//
//   static get leatherJack() {
//     return <Armor>ArmorsList.getListItemByName('LEATHER_JACK');
//   }
//
//   static get leatherLeggings() {
//     return <Armor>ArmorsList.getListItemByName('LEATHER_LEGGINGS');
//   }
// }
