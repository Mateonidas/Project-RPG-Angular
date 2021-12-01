import {CharacterBodyLocalization} from "./character-body-localization.model";
import {BodyLocalization, BodyLocalizationList} from "./body-localization.model";

export class CharacterBodyLocalizations {
  head = new CharacterBodyLocalization(BodyLocalizationList.head, 0);
  leftArm = new CharacterBodyLocalization(BodyLocalizationList.leftArm, 0);
  rightArm = new CharacterBodyLocalization(BodyLocalizationList.rightArm, 0);
  body = new CharacterBodyLocalization(BodyLocalizationList.body, 0);
  leftLeg = new CharacterBodyLocalization(BodyLocalizationList.leftLeg, 0);
  rightLeg = new CharacterBodyLocalization(BodyLocalizationList.rightLeg, 0);

  getBodyLocalization(localization: BodyLocalization | null) {
    switch (localization) {
      case BodyLocalizationList.head: {
        return this.head;
      }
      case BodyLocalizationList.leftArm: {
        return this.leftArm;
      }
      case BodyLocalizationList.rightArm: {
        return this.rightArm;
      }
      case BodyLocalizationList.body: {
        return this.body;
      }
      case BodyLocalizationList.leftLeg: {
        return this.leftLeg;
      }
      case BodyLocalizationList.rightLeg: {
        return this.rightLeg;
      }
      default: {
        return null;
      }
    }
  }

  getBodyLocalizationsInArray() {
    return [this.head, this.leftArm, this.rightArm, this.body, this.leftLeg, this.rightLeg];
  }

  static fromJSON(object: Object): CharacterBodyLocalizations {
    let characterBodyLocalizations = Object.assign(new CharacterBodyLocalizations(), object);
    characterBodyLocalizations.head = CharacterBodyLocalization.fromJSON(characterBodyLocalizations['head']);
    characterBodyLocalizations.leftArm = CharacterBodyLocalization.fromJSON(characterBodyLocalizations['leftArm']);
    characterBodyLocalizations.rightArm = CharacterBodyLocalization.fromJSON(characterBodyLocalizations['rightArm']);
    characterBodyLocalizations.body = CharacterBodyLocalization.fromJSON(characterBodyLocalizations['body']);
    characterBodyLocalizations.leftLeg = CharacterBodyLocalization.fromJSON(characterBodyLocalizations['leftLeg']);
    characterBodyLocalizations.rightLeg = CharacterBodyLocalization.fromJSON(characterBodyLocalizations['rightLeg']);
    return characterBodyLocalizations;
  }
}
