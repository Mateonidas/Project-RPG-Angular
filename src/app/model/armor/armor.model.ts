import {Model} from "../model";
import {ArmorBodyLocalization} from "../body-localization/armor-body-localization.model";

export class Armor extends Model {
  public armorCategory: Model;
  public armorBodyLocalizations: ArmorBodyLocalization[]
  public armorPoints: number;
  public armorPenalties: Model[];
  public armorQualities: Model[];

  constructor(name?: string, nameTranslation?: string, category?: Model, penalties?: Model[], armorBodyLocalizations?: ArmorBodyLocalization[], armorPoints?: number, qualities?: Model[]) {
    super(name, nameTranslation);
    this.armorCategory = <Model>category;
    this.armorPenalties = <Model[]>penalties;
    this.armorBodyLocalizations = <ArmorBodyLocalization[]>armorBodyLocalizations;
    this.armorPoints = <number>armorPoints;
    this.armorQualities = <Model[]>qualities;
  }

  static fromJSON(object: Object): Armor {
    let armor = Object.assign(new Armor(), object);
    armor.armorCategory = Model.fromJSON(armor['armorCategory']);
    armor.armorPenalties = armor['armorPenalties'] != undefined ? Model.arrayFromJSON(armor['armorPenalties']) : [];
    armor.armorQualities = armor['armorQualities'] != undefined ?  Model.arrayFromJSON(armor['armorQualities']) : [];
    armor.armorBodyLocalizations = ArmorBodyLocalization.arrayFromJSON(armor['armorBodyLocalizations']);
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
