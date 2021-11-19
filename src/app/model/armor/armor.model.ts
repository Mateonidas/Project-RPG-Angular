import {Model} from "../model";
import {BodyLocalization, BodyLocalizationList} from "../body-localization/body-localization.model";
import {ListModel} from "../list-model";
import {AttackCategory} from "../attack/attack-category.model";
import {WeaponGroup} from "../weapon/weapon-type.model";
import {WeaponTrait} from "../weapon/weaponTraits/weapon.advantages.model";

export class Armor extends Model{
  public category: string;
  public penalty: string;
  public localization: BodyLocalization[];
  public armorPoints: number;
  public advantages: string[];
  public disadvantages: string[];


  constructor(name?: string, nameTranslation?: string, category?: string, penalty?: string, localization?: BodyLocalization[], armorPoints?: number, advantages?: string[], disadvantages?: string[]) {
    super(name, nameTranslation);
    this.category = <string>category;
    this.penalty = <string>penalty;
    this.localization = <BodyLocalization[]>localization;
    this.armorPoints = <number>armorPoints;
    this.advantages = <string[]>advantages;
    this.disadvantages = <string[]>disadvantages;
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
