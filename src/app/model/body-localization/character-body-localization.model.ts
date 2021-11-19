import {BodyLocalization} from "./body-localization.model";
import {Model} from "../model";

export class CharacterBodyLocalization {
  public bodyLocalization: BodyLocalization;
  public armorPoints: number;
  public injures: Model[];

  constructor(bodyLocalization?: BodyLocalization, armorPoints?: number, injures?: Model[]) {
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
    this.armorPoints = <number>armorPoints;
    this.injures = <Model[]>injures;
  }

  addInjure(injure: Model) {
    this.injures.push(injure);
  }

  removeInjure(injure: Model) {
    let index = this.injures.indexOf(injure);
    this.injures.splice(index, 1);
  }

  static fromJSON(object: Object): CharacterBodyLocalization {
    let characterBodyLocalization = Object.assign(new CharacterBodyLocalization(), object);
    characterBodyLocalization.bodyLocalization = BodyLocalization.fromJSON(characterBodyLocalization['bodyLocalization']);
    characterBodyLocalization.injures = Model.arrayFromJSON(characterBodyLocalization['injures']);
    return characterBodyLocalization;
  }
}
