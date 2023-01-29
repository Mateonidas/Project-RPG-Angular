import {BodyLocalization} from "./body-localization.model"
import {CharacterInjury} from "../injury/character-injury.model"

export class CharacterBodyLocalization {
  public id: number
  public characterId: number
  public bodyLocalization: BodyLocalization
  public armorPoints: number
  public additionalArmorPoints: number
  public injuries: CharacterInjury[]

  constructor(bodyLocalization?: BodyLocalization, armorPoints?: number, additionalArmorPoints?: number, injuries?: CharacterInjury[], characterId?: number, id?: number) {
    this.id = <number>id
    this.bodyLocalization = <BodyLocalization>bodyLocalization
    this.armorPoints = <number>armorPoints
    this.additionalArmorPoints = <number>additionalArmorPoints
    this.injuries = <CharacterInjury[]>injuries
    this.characterId = <number>characterId
  }

  static fromJSON(object: Object): CharacterBodyLocalization {
    let characterBodyLocalization = Object.assign(new CharacterBodyLocalization(), object)
    characterBodyLocalization.bodyLocalization = BodyLocalization.fromJSON(characterBodyLocalization['bodyLocalization'])
    characterBodyLocalization.injuries = CharacterInjury.arrayFromJSON(characterBodyLocalization['injuries'])
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
