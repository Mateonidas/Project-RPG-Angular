import {Model} from "../model";

export class CharacterCondition {
  public id: number;
  public condition: Model;
  public value: number;

  constructor(id?: number, condition?: Model, value?: number) {
    this.id = <number>id;
    this.condition = <Model>condition;
    this.value = <number>value;
  }

  static fromJSON(object: Object): CharacterCondition {
    let characterInjury = Object.assign(new CharacterCondition(), object);
    characterInjury.condition = Model.fromJSON(characterInjury['condition']);
    return characterInjury;
  }

  static arrayFromJSON(objectsArray: Object[]): CharacterCondition[] {
    let characterInjuries = [];
    for (let object of objectsArray) {
      let injury = CharacterCondition.fromJSON(object);
      characterInjuries.push(injury);
    }
    return characterInjuries;
  }
}
