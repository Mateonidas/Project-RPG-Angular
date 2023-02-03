import {Injectable} from '@angular/core';
import textResource from '../../../../assets/text.json';
import {BodyLocalization} from "../../../model/body-localization/body-localization.model";
import {Characteristic} from "../../../model/characteristic/characteristic.model";

@Injectable({
  providedIn: 'root'
})
export class TextResourceService {

  constructor() {
  }

  public static getText() {
    return textResource;
  }

  public static getCharacteristicNameTranslation(name: string) {
    let characteristic: Model[] = textResource.characteristics;
    return <Characteristic>characteristic.find(characteristic => {
      if(characteristic.name == name) {
        return characteristic;
      } else {
        return null;
      }
    })
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

  public static getInjuryNameTranslation(name: string) {
    let injuries: Model[] = textResource.injury;
    return <Model>injuries.find(injury => {
      if(injury.name == name) {
        return injury;
      } else {
        return null;
      }
    })
  }

  public static getConditionTranslation(name: string) {
    let conditions: ModelWithDescription[] = textResource.condition;
    return <ModelWithDescription>conditions.find(condition => {
      if(condition.name == name) {
        return condition;
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

  public static getArmorPenaltyNameTranslation(name: string) {
    let armorPenalties: Model[] = textResource.armorPenalty;
    return <Model>armorPenalties.find(armorPenalty => {
      if(armorPenalty.name == name) {
        return armorPenalty;
      } else {
        return null;
      }
    })
  }

  public static getArmorQualityTranslation(name: string) {
    let armorQualities: ModelWithDescription[] = textResource.armorQuality;
    return <ModelWithDescription>armorQualities.find(armorQuality => {
      if(armorQuality.name == name) {
        return armorQuality;
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

  public static getWeaponGroupNameTranslation(name: string) {
    let weaponGroups: Model[] = textResource.weaponGroup;
    return <Model>weaponGroups.find(weaponGroup => {
      if(weaponGroup.name == name) {
        return weaponGroup;
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
    let weaponQualities: ModelWithDescription[] = textResource.weaponQualities;
    return <ModelWithDescription>weaponQualities.find(weaponQuality => {
      if(weaponQuality.name == name) {
        return weaponQuality;
      } else {
        return null;
      }
    })
  }

  public static getAvailabilityNameTranslation(name: string) {
    let availabilities: Model[] = textResource.availability;
    return <Model>availabilities.find(availability => {
      if(availability.name == name) {
        return availability;
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
    let talents: ModelWithDescription[] = textResource.talents;
    return <ModelWithDescription>talents.find(talent => {
      if(talent.name == name) {
        return talent;
      } else {
        return null;
      }
    })
  }

  public static getTraitNameTranslation(name: string) {
    let traits: ModelWithDescription[] = textResource.traits;
    return <ModelWithDescription>traits.find(talent => {
      if(talent.name == name) {
        return talent;
      } else {
        return null;
      }
    })
  }

  public static getSpellNameTranslation(name: string) {
    let spells: ModelWithDescription[] = textResource.spells;
    return <ModelWithDescription>spells.find(spell => {
      if(spell.name == name) {
        return spell;
      } else {
        return null;
      }
    })
  }

  public static getSpellGroupNameTranslation(name: string) {
    let spellGroups: Model[] = textResource.spellGroups;
    return <Model>spellGroups.find(spellGroup => {
      if(spellGroup.name == name) {
        return spellGroup;
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

export interface ModelWithDescription {
  name: string;
  nameTranslation: string;
  description: string;
}

