import {Condition} from "./condition.model";

export class CharacterCondition {
  public id: number;
  public condition: Condition;
  public value: number;
  public counter: number;

  constructor(id?: number, condition?: Condition, value?: number, counter?: number) {
    this.id = <number>id;
    this.condition = <Condition>condition;
    this.value = <number>value;
    this.counter = <number>counter;
  }

  static fromJSON(object: Object): CharacterCondition {
    let characterInjury = Object.assign(new CharacterCondition(), object);
    characterInjury.condition = Condition.fromJSON(characterInjury['condition']);
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
