import {Model} from "../model";

export class WeaponQualityValue {

  weaponQuality: Model;
  value: number;

  constructor(weaponQuality?: Model, value?: number) {
    this.weaponQuality = <Model>weaponQuality;
    this.value = <number>value;
  }

  static fromJSON(object: Object): WeaponQualityValue {
    let weaponQualityValue = Object.assign(new WeaponQualityValue(), object);
    weaponQualityValue.weaponQuality = Model.fromJSON(weaponQualityValue['weaponQuality']);
    return weaponQualityValue;
  }

  static arrayFromJSON(objectsArray: Object[]): WeaponQualityValue[] {
    let weaponsQuality = [];
    if (objectsArray != undefined) {
      for (let object of objectsArray) {
        let weaponTrait = WeaponQualityValue.fromJSON(object);
        weaponsQuality.push(weaponTrait);
      }
    }
    return weaponsQuality;
  }
}
