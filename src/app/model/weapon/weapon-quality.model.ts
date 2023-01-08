import {Model} from "../model";
import {TextResourceService} from "../../shared/services/text-resource-service/text-resource.service";

export class WeaponQuality extends Model {

  value: number;

  constructor(name?: string, value?: number) {
    super(name, TextResourceService.getWeaponQualityNameTranslation(<string>name).nameTranslation);
    this.value = <number>value;
  }

  static fromJSON(object: Object): WeaponQuality {
    return Object.assign(new WeaponQuality(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): WeaponQuality[] {
    let weaponsTraits = [];
    if(objectsArray != undefined) {
      for (let object of objectsArray) {
        let weaponTrait = WeaponQuality.fromJSON(object);
        weaponsTraits.push(weaponTrait);
      }
    }
    return weaponsTraits;
  }
}
