import {Trait} from "./trait.model";

export class CharacterTrait {
  public id: number
  public model: Trait
  public value: String


  constructor(id?: number, trait?: Trait, value?: String) {
    this.id = <number>id
    this.model = <Trait>trait
    this.value = <String>value
  }

  static fromJSON(object: Object): CharacterTrait {
    return Object.assign(new CharacterTrait(), object)
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterTrait[] {
    let traits = []
    for (let object of objectsArray) {
      let trait = CharacterTrait.fromJSON(object)
      traits.push(trait)
    }
    return traits
  }
}
