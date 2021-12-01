import {BodyLocalization} from "./body-localization.model";

export class CharacterBodyLocalization {
  public bodyLocalization: BodyLocalization;
  public armorPoints: number;

  constructor(bodyLocalization?: BodyLocalization, armorPoints?: number) {
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
    this.armorPoints = <number>armorPoints;
  }

  static fromJSON(object: Object): CharacterBodyLocalization {
    let characterBodyLocalization = Object.assign(new CharacterBodyLocalization(), object);
    characterBodyLocalization.bodyLocalization = BodyLocalization.fromJSON(characterBodyLocalization['bodyLocalization']);
    return characterBodyLocalization;
  }
}
