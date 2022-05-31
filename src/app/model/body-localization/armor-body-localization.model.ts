import {BodyLocalization} from "./body-localization.model";

export class ArmorBodyLocalization {
  public id: number;
  public bodyLocalization: BodyLocalization;
  public armorPoints: number;
  public brokenArmorPoints: number;


  constructor(id?: number, bodyLocalization?: BodyLocalization, armorPoints?: number, brokenArmorPoints?: number) {
    this.id = <number>id;
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
    this.armorPoints = <number>armorPoints;
    this.brokenArmorPoints = <number>brokenArmorPoints;
  }

  static fromJSON(object: Object): ArmorBodyLocalization {
    let armorBodyLocalization = Object.assign(new ArmorBodyLocalization(), object);
    armorBodyLocalization.bodyLocalization = BodyLocalization.fromJSON(armorBodyLocalization['bodyLocalization']);
    return armorBodyLocalization;
  }

  static arrayFromJSON(objectsArray: Object[]): ArmorBodyLocalization[] {
    let armorBodyLocalizations = [];
    for (let object of objectsArray) {
      let armorBodyLocalization = ArmorBodyLocalization.fromJSON(object);
      armorBodyLocalizations.push(armorBodyLocalization);
    }
    return armorBodyLocalizations;
  }
}
