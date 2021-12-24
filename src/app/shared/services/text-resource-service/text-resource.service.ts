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
    let armorCategory: Model[] = textResource.armorCategory;
    return <Model>armorCategory.find(armorCategory => {
      if(armorCategory.name == name) {
        return armorCategory;
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

