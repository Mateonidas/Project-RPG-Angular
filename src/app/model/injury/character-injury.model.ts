import {Model} from "../model";

export class CharacterInjury {
  public id: number;
  public injury: Model;
  public value: number;


  constructor(id?: number, injury?: Model, value?: number) {
    this.id = <number>id;
    this.injury = <Model>injury;
    this.value = <number>value;
  }

  static fromJSON(object: Object): CharacterInjury {
    let characterInjury = Object.assign(new CharacterInjury(), object);
    characterInjury.injury = Model.fromJSON(characterInjury['injury']);
    return characterInjury;
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterInjury[] {
    let characterInjuries = [];
    for (let object of objectsArray) {
      let injury = CharacterInjury.fromJSON(object);
      characterInjuries.push(injury);
    }
    return characterInjuries;
  }
}
