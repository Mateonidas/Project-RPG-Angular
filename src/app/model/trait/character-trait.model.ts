import {Trait} from "./trait.model";

export class CharacterTrait {
  public trait: Trait;
  public value: String;


  constructor(trait?: Trait, value?: String) {
    this.trait = <Trait>trait;
    this.value = <String>value;
  }

  static fromJSON(object: Object): CharacterTrait {
    return Object.assign(new CharacterTrait(), object);
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterTrait[] {
    let traits = [];
    for (let object of objectsArray) {
      let trait = CharacterTrait.fromJSON(object);
      traits.push(trait);
    }
    return traits;
  }
}
