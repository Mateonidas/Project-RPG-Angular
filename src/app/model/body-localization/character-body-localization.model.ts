import {BodyLocalization} from "./body-localization.model"
import {ValueModel} from "../value-model";
import {Model} from "../model";

export class CharacterBodyLocalization {
  public id: number
  public characterId: number
  public bodyLocalization: BodyLocalization
  public armorPoints: number
  public additionalArmorPoints: number
  public injuries: ValueModel<Model>[]

  constructor(bodyLocalization?: BodyLocalization, armorPoints?: number, additionalArmorPoints?: number, injuries?: ValueModel<Model>[], characterId?: number, id?: number) {
    this.id = <number>id
    this.bodyLocalization = <BodyLocalization>bodyLocalization
    this.armorPoints = <number>armorPoints
    this.additionalArmorPoints = <number>additionalArmorPoints
    this.injuries = <ValueModel<Model>[]>injuries
    this.characterId = <number>characterId
  }

  static fromJSON(object: Object): CharacterBodyLocalization {
    let characterBodyLocalization = Object.assign(new CharacterBodyLocalization(), object)
    characterBodyLocalization.bodyLocalization = BodyLocalization.fromJSON(characterBodyLocalization['bodyLocalization'])
    characterBodyLocalization.injuries = ValueModel.arrayFromJSON<Model>(characterBodyLocalization['injuries'], Model)
    return characterBodyLocalization
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterBodyLocalization[] {
    let bodyLocalizations = []
    for (let object of objectsArray) {
      let bodyLocalization = CharacterBodyLocalization.fromJSON(object)
      bodyLocalizations.push(bodyLocalization)
    }
    return bodyLocalizations
  }
}
