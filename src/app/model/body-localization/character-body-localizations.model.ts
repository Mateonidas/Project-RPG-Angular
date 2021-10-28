import {CharacterBodyLocalization} from "./character-body-localization.model";
import {BodyLocalization, BodyLocalizationList} from "./body-localization.model";

export class CharacterBodyLocalizations {
  private _head = new CharacterBodyLocalization(BodyLocalizationList.head, 0, []);
  private _leftArm = new CharacterBodyLocalization(BodyLocalizationList.leftArm, 0, []);
  private _rightArm = new CharacterBodyLocalization(BodyLocalizationList.rightArm, 0, []);
  private _body = new CharacterBodyLocalization(BodyLocalizationList.body, 0, []);
  private _leftLeg = new CharacterBodyLocalization(BodyLocalizationList.leftLeg, 0, []);
  private _rightLeg = new CharacterBodyLocalization(BodyLocalizationList.rightLeg, 0, []);

  getBodyLocalization(localization: BodyLocalization | null) {
    switch(localization) {
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

  get head(): CharacterBodyLocalization {
    return this._head;
  }

  get leftArm(): CharacterBodyLocalization {
    return this._leftArm;
  }

  get rightArm(): CharacterBodyLocalization {
    return this._rightArm;
  }

  get body(): CharacterBodyLocalization {
    return this._body;
  }

  get leftLeg(): CharacterBodyLocalization {
    return this._leftLeg;
  }

  get rightLeg(): CharacterBodyLocalization {
    return this._rightLeg;
  }
}
