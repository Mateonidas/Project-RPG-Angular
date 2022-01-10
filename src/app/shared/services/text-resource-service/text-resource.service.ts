import {Injectable} from '@angular/core';
import textResource from '../../../../assets/text.json';
import {BodyLocalization} from "../../../model/body-localization/body-localization.model";

@Injectable({
  providedIn: 'root'
})
export class TextResourceService {

  constructor() {
  }

  public static getText() {
    return textResource;
  }

  public static getBodyLocalizationNameTranslation(name: string) {
    let bodyLocalization: Model[] = textResource.bodyLocalization;
    return <BodyLocalization>bodyLocalization.find(bodyLocalization => {
      if(bodyLocalization.name == name) {
        return bodyLocalization;
      } else {
        return null;
      }
    })
  }

  public static getArmorCategoryNameTranslation(name: string) {
    let armorCategories: Model[] = textResource.armorCategory;
    return <Model>armorCategories.find(armorCategory => {
      if(armorCategory.name == name) {
        return armorCategory;
      } else {
        return null;
      }
    })
  }

  public static getWeaponTypeNameTranslation(name: string) {
    let weaponTypes: Model[] = textResource.weaponType;
    return <Model>weaponTypes.find(weaponType => {
      if(weaponType.name == name) {
        return weaponType;
      } else {
        return null;
      }
    })
  }

  public static getWeaponGroupTypeNameTranslation(name: string) {
    let weaponGroupTypes: Model[] = textResource.weaponGroupType;
    return <Model>weaponGroupTypes.find(weaponGroupType => {
      if(weaponGroupType.name == name) {
        return weaponGroupType;
      } else {
        return null;
      }
    })
  }

  public static getWeaponRangeNameTranslation(name: string) {
    let weaponRanges: Model[] = textResource.weaponRange;
    return <Model>weaponRanges.find(weaponRange => {
      if(weaponRange.name == name) {
        return weaponRange;
      } else {
        return null;
      }
    })
  }

  public static getWeaponQualityNameTranslation(name: string) {
    let weaponQualities: Model[] = textResource.weaponQualities;
    return <Model>weaponQualities.find(weaponQuality => {
      if(weaponQuality.name == name) {
        return weaponQuality;
      } else {
        return null;
      }
    })
  }

  public static getCriticalWoundText(name: string) {
    let criticalRoll: CriticalRoll = textResource.criticalRoll;
    return <CriticalWound>criticalRoll.criticalWounds.find(criticalWound => {
      if (criticalWound.name == name) {
        return criticalWound;
      } else {
        return null;
      }
    })
  }
}

export interface CriticalRoll {
  criticalWounds: (CriticalWound)[];
}

export interface CriticalWound {
  name: string;
  nameTranslation: string;
  note: string;
  description: string;
}

export interface Model {
  name: string;
  nameTranslation: string;
}

