import {BodyLocalization} from "./body-localization.model";
import {CharacterInjury} from "../injury/character-injury.model";

export class CharacterBodyLocalization {
  public bodyLocalization: BodyLocalization;
  public armorPoints: number;
  public brokenArmorPoints: number;
  public injuries: CharacterInjury[];

  constructor(bodyLocalization?: BodyLocalization, armorPoints?: number, brokenArmorPoints?: number, injuries?: CharacterInjury[]) {
    this.bodyLocalization = <BodyLocalization>bodyLocalization;
    this.armorPoints = <number>armorPoints;
    this.brokenArmorPoints = <number>brokenArmorPoints;
    this.injuries = <CharacterInjury[]>injuries;
  }

  static fromJSON(object: Object): CharacterBodyLocalization {
    let characterBodyLocalization = Object.assign(new CharacterBodyLocalization(), object);
    characterBodyLocalization.bodyLocalization = BodyLocalization.fromJSON(characterBodyLocalization['bodyLocalization']);
    characterBodyLocalization.injuries = CharacterInjury.arrayFromJSON(characterBodyLocalization['injuries']);
    return characterBodyLocalization;
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterBodyLocalization[] {
    let bodyLocalizations = [];
    for (let object of objectsArray) {
      let bodyLocalization = CharacterBodyLocalization.fromJSON(object);
      bodyLocalizations.push(bodyLocalization);
    }
    return bodyLocalizations;
  }
}
