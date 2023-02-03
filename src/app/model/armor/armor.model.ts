import {Model} from "../model";
import {ArmorBodyLocalization} from "../body-localization/armor-body-localization.model";

export class Armor extends Model {
  public armorCategory: Model;
  public armorBodyLocalizations: ArmorBodyLocalization[]
  public armorPenalties: Model[];
  public armorQualities: Model[];
  public price: string;
  public encumbrance: string;
  public availability: Model;

  constructor(name?: string, nameTranslation?: string, category?: Model, penalties?: Model[], armorBodyLocalizations?: ArmorBodyLocalization[], qualities?: Model[], price?: string, encumbrance?: string, availability?: Model) {
    super(name, nameTranslation);
    this.armorCategory = <Model>category;
    this.armorPenalties = <Model[]>penalties;
    this.armorBodyLocalizations = <ArmorBodyLocalization[]>armorBodyLocalizations;
    this.armorQualities = <Model[]>qualities;
    this.price = <string>price;
    this.encumbrance = <string>encumbrance;
    this.availability = <Model>availability;
  }

  static fromJSON(object: Object): Armor {
    let armor = Object.assign(new Armor(), object);
    armor.armorCategory = Model.fromJSON(armor['armorCategory']);
    armor.armorPenalties = armor['armorPenalties'] != undefined ? Model.arrayFromJSON(armor['armorPenalties']) : [];
    armor.armorQualities = armor['armorQualities'] != undefined ?  Model.arrayFromJSON(armor['armorQualities']) : [];
    armor.armorBodyLocalizations = ArmorBodyLocalization.arrayFromJSON(armor['armorBodyLocalizations']);
    armor.availability = Model.fromJSON(armor['availability']);
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
