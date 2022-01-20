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
    let bodyLocalizations: Model[] = textResource.bodyLocalizations;
    return <BodyLocalization>bodyLocalizations.find(bodyLocalization => {
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

  public static getWeaponReachNameTranslation(name: string) {
    let weaponReaches: Model[] = textResource.weaponReach;
    return <Model>weaponReaches.find(weaponReach => {
      if(weaponReach.name == name) {
        return weaponReach;
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

  public static getSkillNameTranslation(name: string) {
    let skills: Model[] = textResource.skills;
    return <Model>skills.find(skill => {
      if(skill.name == name) {
        return skill;
      } else {
        return null;
      }
    })
  }

  public static getTalentNameTranslation(name: string) {
    let talents: Model[] = textResource.talents;
    return <Model>talents.find(talent => {
      if(talent.name == name) {
        return talent;
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

