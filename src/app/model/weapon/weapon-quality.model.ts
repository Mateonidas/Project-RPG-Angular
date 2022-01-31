import {Model} from "../model";
import {ListModel} from "../list-model";
import {SkirmishCharacter} from "../skirmish/skirmish-character.model";
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
    for (let object of objectsArray) {
      let weaponTrait = WeaponQuality.fromJSON(object);
      weaponsTraits.push(weaponTrait);
    }
    return weaponsTraits;
  }
}

// export class WeaponTraitsList extends ListModel {
//   public static list = [
//     new WeaponQuality('Fast', 'Szybka'),
//   ]
//
//   static get fast() {
//     return <WeaponQuality>this.getListItemByName('Fast');
//   }
//
//   static checkIfExist(array: WeaponQuality[], advantage: WeaponQuality) {
//     return array.some(({}) => advantage);
//   }

  // static checkFast(owner: SkirmishCharacter, opponent: SkirmishCharacter) {
  //   if(this.checkIfExist(owner.usedWeapon.advantages, this.fast)) {
  //     if (owner.isAttacker) {
  //       if (opponent.isDodging) {
  //         opponent.roll.modifier -= 10;
  //       } else if (!this.checkIfExist(opponent.usedWeapon.advantages, this.fast)) {
  //         opponent.roll.modifier -= 10;
  //       }
  //     }
  //   }
  // }
// }
