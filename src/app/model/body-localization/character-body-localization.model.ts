import {BodyLocalization} from "./body-localization.model";
import {Model} from "../model";
import {CriticalWound} from "../critical-wounds/critical-wounds.model";

export class CharacterBodyLocalization {
  public bodyLocalization: BodyLocalization;
  public armorPoints: number;
  public injures: Model[];
  public criticalWounds: CriticalWound[];

  constructor(bodyLocalization?: BodyLocalization, armorPoints?: number, injures?: Model[], criticalWounds?: CriticalWound[]) {
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
    this.armorPoints = <number>armorPoints;
    this.injures = <Model[]>injures;
    this.criticalWounds = <CriticalWound[]>criticalWounds;
  }

  addInjure(injure: Model) {
    this.injures.push(injure);
  }

  removeInjure(injure: Model) {
    let index = this.injures.indexOf(injure);
    this.injures.splice(index, 1);
  }

  addCriticalWound(criticalWound: CriticalWound) {
    this.criticalWounds.push(criticalWound);
  }

  removeCriticalWound(criticalWound: CriticalWound) {
    let index = this.criticalWounds.indexOf(criticalWound);
    this.criticalWounds.splice(index, 1);
  }

  static fromJSON(object: Object): CharacterBodyLocalization {
    let characterBodyLocalization = Object.assign(new CharacterBodyLocalization(), object);
    characterBodyLocalization.bodyLocalization = BodyLocalization.fromJSON(characterBodyLocalization['bodyLocalization']);
    characterBodyLocalization.injures = Model.arrayFromJSON(characterBodyLocalization['injures']);
    characterBodyLocalization.criticalWounds = CriticalWound.arrayFromJSON(characterBodyLocalization['criticalWounds']);
    return characterBodyLocalization;
  }
}
