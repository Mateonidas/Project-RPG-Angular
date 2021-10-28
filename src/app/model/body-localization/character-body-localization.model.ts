import {BodyLocalization} from "./body-localization.model";
import {Model} from "../model";

export class CharacterBodyLocalization {
  private _bodyLocalization: BodyLocalization;
  private _armorPoints: number;
  private _injures: Model[];

  constructor(bodyLocalization: BodyLocalization, armorPoints: number, injures: Model[]) {
    this._bodyLocalization = bodyLocalization;
    this._armorPoints = armorPoints;
    this._injures = injures;
  }

  get bodyLocalization(): BodyLocalization {
    return this._bodyLocalization;
  }

  set bodyLocalization(value: BodyLocalization) {
    this._bodyLocalization = value;
  }

  get armorPoints(): number {
    return this._armorPoints;
  }

  set armorPoints(value: number) {
    this._armorPoints = value;
  }

  get injures(): Model[] {
    return this._injures;
  }

  set injures(value: Model[]) {
    this._injures = value;
  }

  setInjure(injure: Model) {
    this.injures.push(injure);``
  }

  removeInjure(injure: Model) {
    let index = this.injures.indexOf(injure);
    this.injures.splice(index, 1);
  }
}
