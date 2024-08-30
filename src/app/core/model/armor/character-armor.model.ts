import {Armor} from "./armor.model";
import {ArmorBodyLocalization} from "../body-localization/armor-body-localization.model";

export class CharacterArmor {
  public id: number;
  public armor: Armor;
  public armorBodyLocalizations: ArmorBodyLocalization[]
  public duration: number;
  public armorPoints?: number;

  constructor(id?: number, armor?: Armor, armorBodyLocalizations?: ArmorBodyLocalization[], duration?: number) {
    this.id = <number>id
    this.armor = <Armor>armor
    this.armorBodyLocalizations = <ArmorBodyLocalization[]>armorBodyLocalizations
    this.duration = <number>duration
  }

  static fromJSON(object: Object): CharacterArmor {
    let armor = Object.assign(new CharacterArmor(), object);
    armor.armorBodyLocalizations = ArmorBodyLocalization.arrayFromJSON(armor['armorBodyLocalizations']);
    return armor;
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterArmor[] {
    let objects = [];
    for (let object of objectsArray) {
      let armor = CharacterArmor.fromJSON(object);
      objects.push(armor);
    }
    return objects;
  }
}
