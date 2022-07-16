import {Model} from "../model";

export class CharacterBodyLocalizationInjury {
  public id: number;
  public injury: Model;
  public value: number;


  constructor(id?: number, injury?: Model, value?: number) {
    this.id = <number>id;
    this.injury = <Model>injury;
    this.value = <number>value;
  }

  static fromJSON(object: Object): CharacterBodyLocalizationInjury {
    let characterInjury = Object.assign(new CharacterBodyLocalizationInjury(), object);
    characterInjury.injury = Model.fromJSON(characterInjury['injury']);
    return characterInjury;
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterBodyLocalizationInjury[] {
    let characterInjuries = [];
    for (let object of objectsArray) {
      let injury = CharacterBodyLocalizationInjury.fromJSON(object);
      characterInjuries.push(injury);
    }
    return characterInjuries;
  }
}
